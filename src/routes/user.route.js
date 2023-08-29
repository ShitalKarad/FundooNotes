import express from 'express';
import * as userController from '../controllers/user.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { newUserValidator } from '../validators/user.validator';
const router = express.Router();


router.post('', newUserValidator, userController.userRegister);

router.post('/login', userController.userLogin);

router.post('/forget', userController.forgetPassword);

router.post('/reset', userAuth, userController.resetPassword);

export default router;
