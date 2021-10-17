import { AdminsSchema } from '../models.js';
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

    const [existingUser] = await AdminsSchema.find({ mobile });
    if (existingUser) {
      throw new Error(MSG.USER_ALREADY_REG);
    }

    const admin = await AdminsSchema.create({
      firstName,
      lastName,
      mobile,
      password
    });

    console.log(admin);
    if (!admin) {
      throw new Error(MSG.SOMETHING_WRONG);
    }

    return successResponse(req, res, admin);

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
    const [user] = await AdminsSchema.find({ mobile });
    console.log(user);
    if (!user) {
      throw new Error(MSG.NO_USER);
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error(MSG.INV_PASS);
    }
    const token = jwt.sign({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      type: 'admin',
    }, SECRET,
      { expiresIn: EXPIRE_TIME }
    );

    if (!token) {
      throw new Error(MSG.SOMETHING_WRONG);
    }
    const updated = await AdminsSchema.findByIdAndUpdate(
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
    await AdminsSchema.findByIdAndUpdate(
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