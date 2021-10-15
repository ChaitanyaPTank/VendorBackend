import AdminsSchema from '../models/admins.js';
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