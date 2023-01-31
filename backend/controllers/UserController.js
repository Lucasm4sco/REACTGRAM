const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const deletePhotoByPatch = require('../utils/delete');

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: '7d'
    })
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email })

        if (user)
            return res.status(422).json({ errors: ['E-mail já utilizado, por favor utilize outro e-mail ou faça o login'] })

        // Generate password hash
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: passwordHash
        });

        if (!newUser)
            return res.status(422).json({ errors: ['Houve um erro, por favor tente mais tarde.'] });

        return res.status(201).json({
            _id: newUser._id,
            token: generateToken(newUser._id)
        })
    } catch (error) {
        return res.status(422).json({ errors: ['Houve um problema, por favor tente novamente mais tarde.'] });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user)
            return res.status(404).json({ errors: ['Usuário não encontrado'] });

        if (!(bcrypt.compareSync(password, user.password)))
            return res.status(422).json({ errors: ['Senha inválida'] });

        res.status(201).json({
            _id: user._id,
            profileImage: user.profileImage,
            token: generateToken(user._id)
        })
    } catch (error) {
        return res.status(422).json({ errors: ['Houve um problema, por favor tente novamente mais tarde.'] });
    }
}

const getCurrentUser = async (req, res) => {
    const user = req.user;

    res.status(200).json(user);
}

const update = async (req, res) => {
    const { name, password, bio } = req.body;
    const reqUser = req.user;
    const profileImage = req.file ? req.file.filename : null;
    
    try {
        const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select('-password');
        const oldProfileImage = user.profileImage;

        if (name)
            user.name = name;

        if (password) {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;
        }

        if (profileImage) 
            user.profileImage = profileImage;
        
        if (bio)
            user.bio = bio;

        await user.save();

        if(profileImage)
            deletePhotoByPatch(`/users/${oldProfileImage}`);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(422).json({ errors: ['Houve um problema, por favor tente novamente mais tarde.'] });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(mongoose.Types.ObjectId(id)).select('-password');

        if (!user)
            return res.status(404).json({ errors: ['Usuário não encontrado.'] });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ errors: ['Usuário não encontrado.'] });
    }
}

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById
}