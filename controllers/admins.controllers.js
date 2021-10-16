import { AdminsSchema } from '../models/admins.js';
import { successResponse, errorResponse } from '../helpers/helpers.js';
import appconfig from '../appconfig.js';
import jwt from 'jsonwebtoken';


const { SECRET, EXPIRE_TIME } = appconfig;


export const register = async (req, res) => {
  try {
    console.log(req.body);
    const {
      firstName,
      lastName,
      mobile,
      password
    } = req.body;

    const [existingUser] = await AdminsSchema.find({ mobile });
    if (existingUser) {
      throw new Error('Mobile number is already registered.');
    }

    const admin = await AdminsSchema.create({
      firstName,
      lastName,
      mobile,
      password
    });

    console.log(admin);
    if (!admin) {
      throw new Error("Something went wrong.");
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
      throw new Error('User not found');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid password');
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
      throw new Error('Something went wrong.');
    }
    const updated = await AdminsSchema.findByIdAndUpdate(
      user._id,
      { $set: { accessToken: token } },
      { new: true }
    );
    if (!updated) {
      throw new Error('Something went wrong.');
    }

    return successResponse(req, res, updated, 'Login successful.');

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
    return successResponse(req, res, {}, 'Logout successful.');
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, {}, err.message, 500);
  }
}