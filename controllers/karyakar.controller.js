import { KaryakarsSchema } from '../models.js';
import { successResponse, errorResponse } from '../helpers/helpers.js';
import appconfig from '../appconfig.js';
import jwt from 'jsonwebtoken';


const { SECRET, EXPIRE_TIME, MESSAGE } = appconfig;
const MSG = MESSAGE;


export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobile,
      password
    } = req.body;
    const [existingUser] = await KaryakarsSchema.find({ mobile });
    if (existingUser) {
      throw new Error(MSG.USER_ALREADY_REG);
    }
    const user = await KaryakarsSchema.create({
      firstName,
      lastName,
      mobile,
      password
    });
    console.log(user);
    if (!user) {
      throw new Error(MSG.SOMETHING_WRONG);
    }
    return successResponse(req, res, user, 'Registration successful.');
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, {}, err.message, 500);
  }
};


export const login = async (req, res) => {
  try {
    const {
      mobile,
      password,
    } = req.body;
    const [user] = await KaryakarsSchema.find({ mobile });
    console.log(user);
    if (!user) {
      return errorResponse(req, res, {}, MSG.NO_USER, 404);
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error(MSG.INV_PASS);
    }
    const token = makeToken(user);

    if (!token) {
      throw new Error(MSG.SOMETHING_WRONG);
    }
    const updated = await KaryakarsSchema.findByIdAndUpdate(
      user._id,
      { $set: { accessToken: token } },
      { new: true }
    );
    if (!updated) {
      throw new Error(MSG.SOMETHING_WRONG);
    }

    const data = JSON.parse(JSON.stringify(updated));
    delete data.password;
    return successResponse(req, res, data, MSG.LOGIN_SUCC);
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, {}, err.message, 500);
  }
}


export const logout = async (req, res) => {
  try {
    await KaryakarsSchema.findByIdAndUpdate(
      req.user._id,
      { $set: { accessToken: '' } },
      { new: true }
    );
    return successResponse(req, res, {}, MSG.LOGOUT_SUCC);
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, {}, err.message, 500);
  }
}


export const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    const [user] = await KaryakarsSchema.find({ accessToken: token });
    if (!user) {
      return errorResponse(req, res, {}, 'Unauthorized user', 401);
    }
    const newToken = makeToken(user);
    const updatedUser = await KaryakarsSchema.findByIdAndUpdate(
      user._id,
      { accessToken: newToken },
      { new: true }
    );
    console.log(updatedUser);
    if (!updatedUser) {
      return errorResponse(req, res, {}, 'Error while refreshing the token.');
    }
    return successResponse(req, res, { token: updatedUser.accessToken }, MSG.REF_TOKEN_SUCC);
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, {}, err.message);
  }
}


/**
 * UTILITY FUNCTIONS
 */
function makeToken(payload) {
  const token = jwt.sign(
    {
      _id: payload._id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      mobile: payload.mobile,
    },
    SECRET,
    { expiresIn: EXPIRE_TIME }
  );
  console.log(jwt.decode(token));
  return token;
}