const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');

const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

// mongoose.connect('mongodb+srv://LauraF:Skht7ef@cluster0.4ae2xnh.mongodb.net/PROJECT7_OPENCLASSROOMS?retryWrites=true&w=majority',
mongoose.connect('mongodb+srv://LauraF:Skht7ef@cluster0.4ae2xnh.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/comments', commentRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;