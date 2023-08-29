
import { response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config()

export const userRegister = (body) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(body.password, salt);
  body.password = hash;
  const data = User.create(body, (createError, data));
  if (createError) {
    return callback(createError)
  }
  callback(null, data);
};



export const userLogin = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (data) {
    if (bcrypt.compareSync(body.password, data.password)) {
      return data;
    } else {
      throw new Error('Invalid Password.');
    }

  } else {
    throw new Error('Invalid emailId.');
  }

};


export const userForget = async (body) => {
  const data = await User.findOne({ email: body.email });

  if (data == null) {
    throw new Error('EmailID id found plz enter correct email ');
  }
  else {
    var token = jwt.sign({ email: data.email, _id: data._id },
      process.env.SECRET_KEY);
    return token;
  }
}

export const userReset = async (body ) => {
  
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(body.password, salt);
  body.password = hash;

  const data = await User.findByIdAndUpdate( body.id, {new: true});
  
  if (!data) {
    throw new Error('Enter valid Id ...! Your Id is invalid ');
  } else {
    return data;
  }
};

