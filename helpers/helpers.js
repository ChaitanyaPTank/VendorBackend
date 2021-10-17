import jwt from 'jsonwebtoken';
import appconfig from '../appconfig.js';
const { SECRET, MESSAGE } = appconfig;
const MSG = MESSAGE;


export const errorResponse = async (
  req, res,
  data = {},
  message = MSG.SOMETHING_WRONG,
  code = 500,
) => {
  return res.status(code).send({ data, message });
};


export const successResponse = async (
  req, res,
  data = {},
  message = MSG.SUCC,
  code = 200,
) => {
  return res.status(code).send({ data, message });
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
    throw new Error(MSG.NO_TOKEN);
  } catch (err) {
    return errorResponse(req, res, {}, err.message, 401);
  }
}