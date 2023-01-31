const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = req.baseUrl.includes('users') ? 'users' : 'photos';

        cb(null, `uploads/${folder}/`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        const invalidFormat = !file.originalname.match(/\.(png|jpg|jpeg)$/);
        if (invalidFormat) {
            cb(null, false);
            return cb(
                new Error('Por favor, envie apenas os formatos png, jpg ou jpeg!')
            );
        }
        cb(undefined, true)
    }
})

const imageUploadValidation = (req, res, next) => {
    try {
        const upload = imageUpload.single('image');
        upload(req, res, function (err) {
            if (err)
                return res.status(422).json({ errors: [err.message] })

            next();
        })
    } catch (error) {
        res.status(500).json({ errors: ['Ocorreu um erro inesperado'] })
    }
}

const imageUploadProfileValidation = (req, res, next) => {
    try {
        const upload = imageUpload.single('profileImage');
        upload(req, res, function (err) {
            if (err)
                return res.status(422).json({ errors: [err.message] })

            next();
        })
    } catch (error) {
        res.status(500).json({ errors: ['Ocorreu um erro inesperado'] })
    }
}

module.exports = { imageUploadValidation, imageUploadProfileValidation }