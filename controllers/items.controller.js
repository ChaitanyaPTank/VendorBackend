import { errorResponse, successResponse } from "../helpers/helpers.js";
import { ItemsSchema } from "../models.js";
import appconfig from "../appconfig.js";
const { MESSAGE } = appconfig;
const MSG = MESSAGE;


export const addItem = async (req, res) => {
  try {
    const {
      name,
      price,
      weight,
    } = req.body;
    const [dupliate] = await ItemsSchema.find({ name });
    if (dupliate) {
      throw new Error(MSG.ITEM_EXIST);
    }
    const item = await ItemsSchema.create({
      name,
      price,
      weight,
    });

    if (!item) {
      throw new Error(MSG.SOMETHING_WRONG);
    }
    return successResponse(req, res, item, MSG.ITEM_SUCC);
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, {}, err.message, 500);
  }
}


export const editItem = async (req, res) => {
  try {
    const {
      name,
      price,
      weight,
    } = req.body;
    const item = await ItemsSchema.findById(req.body.id);
    if (!item) {
      throw new Error(MSG.ITEM_NOT_FOUND);
    }
    console.log(item);
    const payload = {};
    if (name) payload.name = name;
    if (price) payload.price = price;
    if (weight) payload.weight = weight;

    const updated = await ItemsSchema.findByIdAndUpdate(req.body.id, payload, { new: true });
    if (!updated) {
      throw new Error(MSG.SOMETHING_WRONG);
    }

    return successResponse(req, res, updated, MSG.SUCC);
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, {}, err.message, 500);
  }
}


export const getAll = async (req, res) => {
  try {
    const items = await ItemsSchema.find();
    if (items == false) {
      throw new Error(MSG.ITEM_NOT_FOUND);
    }
    return successResponse(req, res, items, MSG.SUCC);
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, {}, err.message);
  }
}


export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ItemsSchema.findByIdAndDelete(id);
    if (!deleted) {
      throw new Error(MSG.ITEM_DEL_SUCC);
    }
    return successResponse(req, res, {}, MSG.ITEM_DEL_SUCC);
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, {}, err.message);
  }
}