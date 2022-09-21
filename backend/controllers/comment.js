const Comment = require('../models/comment');
const fs = require('fs');

exports.createComment = (req, res, next) => {
    const commentObject = JSON.parse(req.body.comment);
    delete commentObject._id;
    delete commentObject._userId;
    const comment = new Comment({
        ...commentObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    comment.save()
    .then(() => res.status(201).json({ message: 'Message enregistré !'}))
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
          if (comment.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'});
          } else {
              Comment.updateOne({ _id: req.params.id}, { ...commentObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Message modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id})
      .then(comment => {
          if (comment.userId != req.auth.userId) {
              res.status(401).json({message: 'Non autorisé'});
          } else {
              const filename = comment.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Comment.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Message supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
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