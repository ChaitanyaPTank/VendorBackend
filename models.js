import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


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


const Karyakar = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  accessToken: { type: String }
}, {
  timestamps: true,
  collection: 'tbl_karyakars'
});


Karyakar.pre('save', async function (next) {
  const user = this;
  try {
    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (err) {
    return next(err);
  }
});


Karyakar.pre('findOneAndModify', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});


Karyakar.methods.comparePassword = async function (password, callback) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    return err;
  }
}


const Item = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  price: { type: Number, required: true },
}, {
  timestamps: true,
  collection: 'tbl_items'
});


const Order = new Schema({
  addedBy: { type: Schema.Types.ObjectId, ref: 'tbl_users', require: true },
  name: { type: String, require: true },
  mobile: { type: String, require: true },
  items: [{
    item: { type: Schema.Types.ObjectId, ref: 'tbl_items', require: true },
    quantity: { type: Number, require: true }
  }]
}, {
  timestamps: true,
  collection: 'tbl_orders'
})


export const AdminsSchema = mongoose.model(Admin.options.collection, Admin);
export const KaryakarsSchema = mongoose.model(Karyakar.options.collection, Karyakar);
export const ItemsSchema = mongoose.model(Item.options.collection, Item);
export const OrdersSchema = mongoose.model(Order.options.collection, Order);