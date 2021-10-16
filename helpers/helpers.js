import jwt from 'jsonwebtoken';
import appconfig from '../appconfig.js';
const { SECRET } = appconfig;


export const errorResponse = async (
  req, res,
  data = {},
  message = 'Something went wrong!',
  code = 500,
) => {
  return res.status(code).send({ data, message });
};


export const successResponse = async (
  req, res,
  data = {},
  message = 'Success.',
  code = 200,
) => {
  const { password, ...rest } = JSON.parse(JSON.stringify(data));
  return res.status(code).send({ data: rest, message });
};


export const Authentication = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers['authorization'];
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded;
      next();
      return;
    }
    throw new Error('Token is not provided.');
  } catch (err) {
    return errorResponse(req, res, {}, err.message, 500);
  }
}