import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Admin = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  accessToken: { type: String }
}, {
  timestamps: true,
  collection: "tbl_admin"
});

const User = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  accessToken: { type: String }
}, {
  timestamps: true,
  collection: "tbl_user"
});

const Item = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  price: { type: Number, required: true },
}, {
  timestamps: true,
  collection: "tbl_items"
});

export const AdminsSchema = mongoose.model(Admin.options.collection, Admin);
export const UsersSchema = mongoose.model(User.options.collection, User);
export const ItemsSchema = mongoose.model(Item.options.collection, Item);