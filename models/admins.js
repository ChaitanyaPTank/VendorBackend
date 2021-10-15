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



export default mongoose.model(Admin.options.collection, Admin);