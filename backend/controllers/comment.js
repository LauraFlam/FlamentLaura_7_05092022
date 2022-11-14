const Comment = require('../models/comment');
const User = require('../models/user');
const fs = require('fs');

exports.createComment = (req, res, next) => {

    console.log(req.body.comment)
    const commentObject = req.body.comment;
    console.log(commentObject);
    delete commentObject._id;
    delete commentObject._userId;
    let imgUrl ="";
    console.log("file ",req.file)
    if(undefined != req.file){
         imgUrl =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }

    const comment = new Comment({
        ...commentObject,
        userId: req.auth.userId,
        imageUrl: imgUrl
    });
    comment.save()
    .then(() => res.status(201).json({ message: 'Post créé !'}))
    .catch(error => res.status(400).json({ error }));
};



exports.modifyComment = (req, res, next) => {
  const commentObject = req.file ? {
      ...JSON.parse(req.body.comment),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete commentObject._userId;

  Comment.findOne({_id: req.params.id})
      .then((comment) => {
        console.log(req.body);
        console.log(req.user);
        console.log(req.auth.userId);
          if (comment.userId == req.auth.userId || User.findOne({isAdmin: 1})) {
            Comment.updateOne({ _id: req.params.id}, { ...commentObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Message modifié!'}))
            .catch(error => res.status(401).json({ error }));
          } else {
            res.status(401).json({ message : 'Non autorisé'});
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id})
      .then(comment => {
          if (comment.userId == req.auth.userId || User.findOne({isAdmin: 1})) {
            const filename = comment.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Comment.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Message supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            });
          } else {
            res.status(401).json({message: 'Non autorisé'});
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

exports.likeDislikeComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
        .then(comment => {


            switch (req.body.like) {
                // Si l'utilisateur ajoute un dislike
                case -1:
                    Comment.updateOne({ _id: req.params.id }, {
                        $inc: { dislikes: 1 },
                        $push: { usersDisliked: req.body.userId },
                        _id: req.params.id
                    })
                        .then(() => res.status(201).json({ message: 'Dislike ajouté !' }))
                        .catch(error => res.status(400).json({ error }))
                    break;

                case 0:
                    // Si le poste est déjà liké
                    if (comment.usersLiked.find(user => user === req.body.userId)) {
                        Comment.updateOne({ _id: req.params.id }, {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.body.userId },
                            _id: req.params.id
                        })
                            .then(() => res.status(201).json({ message: ' Like mis à jour !' }))
                            .catch(error => res.status(400).json({ error }))
                    }

                    
                    if (comment.usersDisliked.find(user => user === req.body.userId)) {
                        Comment.updateOne({ _id: req.params.id }, {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: req.body.userId },
                            _id: req.params.id
                        })
                            .then(() => res.status(201).json({ message: ' Dislike mis à jour !' }))
                            .catch(error => res.status(400).json({ error }));
                    }
                    break;

                // Si l'utilisateur ajoute un like
                case 1:
                    Comment.updateOne({ _id: req.params.id }, {
                        $inc: { likes: 1 },
                        $push: { usersLiked: req.body.userId },
                        _id: req.params.id
                    })
                        .then(() => res.status(201).json({ message: 'Like ajouté !' }))
                        .catch(error => res.status(400).json({ error }));
                    break;
                default:
                    return res.status(500).json({ error });
            }
        })
        .catch(error => res.status(500).json({ error }))
    console.log(req.body);
};

exports.getOneComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
      .then(comment => res.status(200).json(comment))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    Comment.find()
      .then(comments => res.status(200).json(comments))
      .catch(error => res.status(400).json({ error }));
};