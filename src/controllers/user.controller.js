import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const userRegister = async (req, res, next) => {
  try {
    const data = await UserService.userRegister(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res,next) => {
  console.log(req.body.email," gmail from controller");
    try {
      const data = await UserService.userLogin(req.body);
      
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'User login successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };

  export const forgetPassword = async (req,res,next) => {
      try {
        const data = await UserService.userForget(req.body);
        
        res.status(HttpStatus.ACCEPTED).json({
          code: HttpStatus.ACCEPTED,
          data: data,
          message: 'password forgot successfully'
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `${error}`
        });
      }
    };

    export const resetPassword = async (req,res) => {
      try {
        const data = await UserService.userReset(req.body);
        res.status(HttpStatus.ACCEPTED).json({
          code: HttpStatus.ACCEPTED,
          data: data,
          message:'user reseted password successfully ..!'
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `${error}`
        });
      }
    };
