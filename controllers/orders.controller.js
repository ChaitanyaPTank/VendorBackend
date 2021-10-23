import { errorResponse, successResponse } from "../helpers/helpers.js";
import { OrdersSchema } from "../models.js";
import appconfig from "../appconfig.js";
import mongoose from "mongoose";
const { MESSAGE } = appconfig;
const MSG = MESSAGE;


export const addOrder = async (req, res) => {
  try {
    const { name, items, mobile } = req.body;
    console.log(req.body);
    const [existingOrder] = await OrdersSchema.find({ addedBy: req.user._id, name });
    if (existingOrder) {
      throw new Error('Duplicate order found.');
    }
    const payload = {
      name,
      mobile,
      items: items,
      addedBy: req.user._id
    }
    const newOrder = await OrdersSchema.create(payload);
    if (!newOrder) {
      throw new Error('Error while creating new order. Please try again later.');
    }
    return successResponse(req, res, newOrder, MSG.ORDER_SUCC);
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, {}, err.message);
  }
}


export const getOrders = async (req, res) => {
  try {
    const findQuery = {};
    if (!req.user.type === 'admin') {
      findQuery.addedBy = mongoose.Types.ObjectId(req.user._id);
    }
    // const orders = await OrdersSchema.aggregate([
    //   {
    //     $match: findQuery
    //   },
    // {
    //   $unwind: "$items"
    // },
    // {
    //   $lookup: {
    //     from: 'tbl_items',
    //     localField: 'items.item',
    //     foreignField: '_id',
    //     as: 'item'
    //   }
    // },
    // {
    //   $unwind: "$item"
    // },
    // {
    //   $addFields: {
    //     "item.quantity": "$items.quantity",
    //   }
    // },
    // ]);

    const orders = await OrdersSchema.find(findQuery)
      .populate('items.item', '-__v');

    if (!orders) {
      throw new Error('Error while fetching orders.');
    }
    return successResponse(req, res, orders, 'Success.');
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, {}, err.message);
  }
}