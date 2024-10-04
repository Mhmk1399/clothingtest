// lib/jwt.js
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const signToken = (payload: any) => {
  if (typeof secret === 'string') {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  }
  throw new Error('JWT secret is not properly configured');
};

export const verifyToken = (token: string) => {
  if (typeof secret === 'string') {
    return jwt.verify(token, secret);
  }
  throw new Error('JWT secret is not properly configured');
};
