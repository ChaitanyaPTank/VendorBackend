import { config } from 'dotenv';
config();


const messages = {
  /** I */
  INV_PASS: "Invalid password.",
  ITEM_EXIST: "Item already exists.",
  ITEM_SUCC: "Item added successfully.",
  ITEM_DEL_SUCC: "Item deleted successfully.",
  ITEM_NOT_FOUND: "Item not found.",

  /** L */
  LOGIN_SUCC: "Login successful.",
  LOGOUT_SUCC: "Logout successful.",

  /** N */
  NO_USER: "User not found",

  /** S */
  SOMETHING_WRONG: "Something went wrong.",
  SOMETHING_WRONG: "Something went wrong.",
  SUCC: "Success.",

  /** T */
  NO_TOKEN: "Token is not provided.",

  /** U */
  USER_ALREADY_REG: "User is already registered.",
}


// CONFIG Variables
export default {
  PORT: process.env.PORT || 3000,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  SECRET: process.env.SECRET,
  EXPIRE_TIME: 60 * 60 * 24,
  MESSAGE: messages,
}