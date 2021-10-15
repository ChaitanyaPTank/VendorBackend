import { AdminsSchema } from '../models/admins.js';
import { successResponse, errorResponse } from '../helpers/helpers.js';


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
      throw new Error('Mobile number is registered');
    }

    const admin = await AdminsSchema.create({
      firstName,
      lastName,
      mobile,
      password
    });

    console.log(admin);
    if (!admin) {
      throw new Error("Something went wrong");
    }

    return successResponse(req, res, admin)

  } catch (err) {
    console.log(err);
    return errorResponse(req, res, err);
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

    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    return successResponse(req, res, user);

  } catch (err) {
    console.log(err);
    return errorResponse(req, res, err.message);
  }
}