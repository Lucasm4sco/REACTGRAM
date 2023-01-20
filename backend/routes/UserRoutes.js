const router = require('express').Router();

const { register, login, getCurrentUser, update, getUserById } = require('../controllers/UserController');

const authGuard = require('../middlewares/authGuard');
const validate = require('../middlewares/handleValidation');
const { userCreateValidation, loginValidation, userUpdateValidation } = require('../middlewares/userValidations');
const { imageUpload } = require('../middlewares/imageUpload');

router.post('/register', userCreateValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);

router.get('/profile', authGuard, getCurrentUser);
router.get('/:id',  getUserById);

router.put('/', authGuard, userUpdateValidation(), validate, imageUpload.single('profileImage'), update)

module.exports = router;