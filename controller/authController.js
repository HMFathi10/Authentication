const User = require('../models/User');
const jwt = require("jsonwebtoken");

const { handleError } = require('../ErrorHandle/handleErrors');


const maxAge = 60 * 60 * 24;
const createToken = (id) => {
    return jwt.sign({ id }, 'net test', {
        expiresIn: maxAge * 3
    });
}

const authLoginGet = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.render('login');
};

const authLoginPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 3 * 1000 });
        res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = handleError(error);
        res.status(400).json(errors);
    }
};

const authSignUpGet = (req, res) => {
    res.render('signup');
};


const authSignUpPost = async (req, res) => {
    const { email, password } = req.body;
    console.log(req);
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 3 * 1000 });
        res.status(201).json({ user: user._id });
    } catch (error) {
        const errors = handleError(error);
        res.status(400).json(errors);
    }
};

const authLogOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};


module.exports = { authLoginGet, authLoginPost, authSignUpGet, authSignUpPost, authLogOut };