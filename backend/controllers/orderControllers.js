const orderModel = require("../models/orderModels");
const userModel = require("../models/userModels");
const { Stripe } = require("stripe");
const Razorpay = require("razorpay");

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.razorKeySecret,
});
//global variables
const delivery_charges = 10;

//placing order using cod
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userInfo = req.user;
    const orderData = new orderModel({
      userId: userInfo._id,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    });
    const newOrder = await orderData.save();
    await userModel.findByIdAndUpdate(userInfo._id, { cart: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

//placing order using stripe method
const placeStripeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    console.log(
      "items,address,amount from fronted for Stripe Payment are",
      items,
      address,
      amount
    );
    const userInfo = req.user;
    const { origin } = req.headers;
    const orderData = new orderModel({
      userId: userInfo._id,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    });
    const newOrder = await orderData.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: delivery_charges * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    // await userModel.findByIdAndUpdate(userInfo._id, { cart: {} });
    res.json({
      success: true,
      message: "Order Placed",
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error", error: error });
  }
};

//verifyStripe
const verifyStripe = async (req, res) => {
  const { orderId, success } = req.body;
  const userInfo = req.user;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userInfo._id, { cart: {} });
      res.json({ success: true, payment: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "internal server error" });
  }
};

//placing order using razorPay method
const placeRazorPayOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userInfo = req.user;
    console.log(
      "items amount,address and userid is",
      items,
      amount,
      address,
      userInfo
    );
    const orderData = new orderModel({
      userId: userInfo._id,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    });
    const newOrder = await orderData.save();
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: newOrder._id.toString(),
    };
    await razorpayInstance.orders.create(options, (error, order) => {
      console.log("order in backend is", order);
      if (error) {
        console.log(error);
        return res.json({ message: error, success: false });
      }
      res.json({ success: true, order });
    });

    // const order= await razorPayInstance.orders.create(options)
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error", error: error });
  }
};

const verifyRazorPay = async (req, res) => {
  try {
    const body = req.body;
    console.log("body is", body.response.razorpay_order_id);
    const userInfo = req.user;
    const orderInfo = await razorpayInstance.orders.fetch(
      body.response.razorpay_order_id
    );
    console.log("orderInfo", orderInfo);
    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userInfo, { cart: {} });
      res.json({ success: true, message: "Payment successfull" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error", error: error });
  }
};

//All orders for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      message: "All orders fetched successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error", success: false, error });
  }
};

//user order data for frontend
const userOrders = async (req, res) => {
  try {
    const userInfo = req.user;
    // const body= req.body

    const orders = await orderModel.find({ userId: userInfo._id });

    res.json({
      message: "successfully fetched user orders",
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

//update order status which can be done by Admin only
const updateOrderStatus = async (req, res) => {
  try {
    const { status, orderId } = req.body;
    console.log("update status by admin id and status are", orderId, status);
    const updatedOrder = await orderModel.findByIdAndUpdate(
      { _id: orderId },
      { status: status },
      { new: true }
    );

    res.json({
      message: "Successfully updated status",
      success: true,
      updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error", success: true });
  }
};

module.exports = {
  placeOrder,
  placeStripeOrder,
  placeRazorPayOrder,
  allOrders,
  userOrders,
  updateOrderStatus,
  verifyStripe,
  verifyRazorPay,
};
