const User = require('../models/User');
const Photo = require('../models/Photo');
const mongoose = require('mongoose');

const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file.filename;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    });

    if (!newPhoto)
        return res.status(422).json({ errors: ['Houve um problema, por favor tente novamente mais tarde.'] });

    res.status(201).send(newPhoto);
}

const deletePhoto = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;

    try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        if (!photo)
            return res.status(404).json({ errors: ['Foto não encontrada.'] });

        if (!photo.userId.equals(reqUser._id))
            return res.status(422).json({ errors: ['Ocorreu um erro, por favor tente novamente mais tarde.'] });

        await Photo.findByIdAndDelete(photo._id);

        return res.status(200).json({
            _id: photo._id,
            message: 'Foto excluída com sucesso.'
        });
    } catch (error) {
        return res.status(400).send({ errors: ['Foto não encontrada.'] })
    }
}

const getAllPhotos = async (req, res) => {
    const photos = await Photo
        .find({})
        .sort([['createdAt', -1]])
        .exec();
    return res.status(200).json(photos);
}

const getUserPhotos = async (req, res) => {
    const { id } = req.params;
    const photos = await Photo
        .find({ userId: id })
        .sort([['createdAt', -1]])
        .exec();
    return res.status(200).json(photos);
}

const getPhotoById = async (req, res) => {
    const { id } = req.params;
    const photo = await Photo.findById(id);

    if (!photo)
        return res.status(404).json({ errors: ['Foto não encontrada.'] });

    return res.status(200).json(photo);
}

const updatePhoto = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const reqUser = req.user;

    const photo = await Photo.findById(id);

    if (!photo)
        return res.status(404).json({ errors: ['Foto não encontrada.'] });

    if (!photo.userId.equals(reqUser._id))
        return res.status(422).json({ errors: ['Ocorreu um erro, por favor tente novamente mais tarde.'] });

    if (title)
        photo.title = title;

    await photo.save();

    return res.status(200).json({ photo, message: 'Foto atualizada com sucesso!' })
}

const likePhoto = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;

    const photo = await Photo.findById(id);

    if (!photo)
        return res.status(404).json({ errors: ['Foto não encontrada.'] });

    if (photo.likes.includes(reqUser._id))
        return res.status(422).json({ errors: ['Você já curtiu essa foto.'] });

    photo.likes.push(reqUser._id);
    await photo.save();

    return res.status(200).json({ photoId: id, userId: reqUser._id, message: 'A foto foi curtida.' });
}

const commentPhoto = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const reqUser = req.user;

    const user = await User.findById(reqUser._id);
    const photo = await Photo.findById(id);

    if (!photo)
        return res.status(404).json({ errors: ['Foto não encontrada.'] });

    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id
    }

    photo.comments.push(userComment);
    await photo.save();

    return res.status(200).json({
        comment: userComment,
        message: 'O comentário foi adicionado com sucesso!'
    });
}

const searchPhotos = async (req, res) => {
    const { q } = req.query;
    const photos = await Photo.find({ title: new RegExp(q, 'i') }).exec();
    return res.status(200).json(photos);
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos
}