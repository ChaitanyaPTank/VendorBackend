import { errorResponse, successResponse } from "../helpers/helpers.js";
import { OrdersSchema } from "../models.js";
import appconfig from "../appconfig.js";
import mongoose from "mongoose";
const { MESSAGE } = appconfig;
const MSG = MESSAGE;


export const addOrder = async (req, res) => {
  try {
    const { name, items, mobile } = req.body;
    // console.log(req.body);
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
    // console.log(err);
    return errorResponse(req, res, {}, err.message);
  }
}


export const getOrders = async (req, res) => {
  try {
    const findQuery = {};
    if (!req.user.type === 'admin') {
      findQuery.addedBy = mongoose.Types.ObjectId(req.user._id);
    }

    const orders = await OrdersSchema.aggregate([
      {
        $match: findQuery
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "tbl_items",
          localField: "items.item",
          foreignField: "_id",
          as: "items.item"
        }
      },
      {
        $unwind: "$items.item",
      },
      {
        $addFields: {
          "items.item.quantity": "$items.quantity",
          "items.item.item": "$items.item._id",
        }
      },
      {
        $project: {
          name: 1,
          mobile: 1,
          addedBy: 1,
          createdAt: 1,
          item: "$items.item"
        }
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          mobile: { $first: "$mobile" },
          items: { $push: "$item" }
        }
      },
      {
        $sort: { name: 1 }
      }
    ]);


    // console.dir(JSON.parse(JSON.stringify(orders[0])), {
    //   depth: 3
    // });

    if (!orders) {
      throw new Error('Error while fetching orders.');
    }
    return successResponse(req, res, orders, 'Success.');
  } catch (err) {
    // console.log(err);
    return errorResponse(req, res, {}, err.message);
  }
}


export const updateOrder = async (req, res) => {
  try {
    const {
      name,
      mobile,
      items,
      id,
    } = req.body;
    const payload = {};
    if (name) payload.name = name;
    if (mobile) payload.mobile = mobile;
    if (items) payload.items = items;
    // console.log({ payload });
    const updated = await OrdersSchema.findByIdAndUpdate(id, payload, { new: true });
    // console.log({ updated });
    return successResponse(req, res, updated, 'Success.');
  } catch (err) {
    // console.log(err);
    return errorResponse(req, res, {}, err.message);
  }
}