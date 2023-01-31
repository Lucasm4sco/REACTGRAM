const router = require('express').Router();

const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhotos } = require('../controllers/PhotoController');

const { photoInsertValidation, updatePhotoValidation, commentValidation } = require('../middlewares/photoValidation');
const authGuard = require('../middlewares/authGuard');
const validate = require('../middlewares/handleValidation');
const { imageUploadValidation } = require('../middlewares/imageUpload');

router.get('/', authGuard, getAllPhotos);
router.get('/search', authGuard, searchPhotos);
router.get('/:id', authGuard, getPhotoById);
router.get('/user/:id', authGuard, getUserPhotos);


router.post('/', authGuard, imageUploadValidation, photoInsertValidation(), validate, insertPhoto);

router.put('/:id', authGuard, updatePhotoValidation(), validate, updatePhoto);
router.put('/like/:id', authGuard, likePhoto);
router.put('/comment/:id', authGuard, commentValidation(), validate, commentPhoto);

router.delete('/:id', authGuard, deletePhoto);

module.exports = router;