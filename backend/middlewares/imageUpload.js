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
        const invalidFormat = !file.originalname.match(/\.(png|jpg)$/);
        if (invalidFormat) {
            return cb(
                new Error('Por favor, envie apenas os formatos png ou jpg!')
                );
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }