import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';


const Schema = mongoose.Schema;


const Admin = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  accessToken: { type: String }
}, {
  timestamps: true,
  collection: 'tbl_admin'
});


Admin.pre('save', async function (next) {
  const user = this;
  try {
    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (err) {
    return next(err);
  }
});


Admin.pre('findOneAndModify', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});


Admin.methods.comparePassword = async function (password, callback) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    return err;
  }
}


const User = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  accessToken: { type: String }
}, {
  timestamps: true,
  collection: 'tbl_user'
});


const Item = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  price: { type: Number, required: true },
}, {
  timestamps: true,
  collection: 'tbl_items'
});


export const AdminsSchema = mongoose.model(Admin.options.collection, Admin);
export const UsersSchema = mongoose.model(User.options.collection, User);
export const ItemsSchema = mongoose.model(Item.options.collection, Item);