const express = require('express');
const mongoose = require('mongoose');

const app = express();

const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const { requireAuth, checkUser } = require('./middleware/authMiddleware');



// middleware
app.use(express.static('public'));

// parse any json request 
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://hossam:test1234@nodetuts.ofwfvgm.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get('/', requireAuth, (req, res) => res.render('home'));
app.get('/books', requireAuth, (req, res) => res.render('books'));


// auth routers
app.use(authRouter);