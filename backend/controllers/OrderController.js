const Order = require("../models/OrderModel");
const User = require("../models/UserModel");
const { sendOrderStatusEmail } = require("../services/emailService");

exports.placeOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // Clear user's cart
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Send order confirmation email with default status
    await sendOrderStatusEmail(newOrder, "Food Processing");

    res.json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error placing the order:", error.message);
    res.status(500).json({
      success: false,
      message: "Error placing the order",
    });
  }
};

exports.verifyOrder = async (req, res) => {
  const { success, orderId } = req.body;
  if (!success || !orderId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing parameters." });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res        
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    if (order.status === "completed" || order.status === "verified") {
      return res
        .status(400)
        .json({ success: false, message: "Order already verified." });
    }

    return res.json({
      success: true,
      message: "Order verification successful.",
    });
  } catch (error) {
    console.error("Error verifying the order:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error verifying the order." });
  }
};

exports.userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// Listing Orders for admin panel
exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// updating the status
exports.updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    // Send status update email
    await sendOrderStatusEmail(order, status);

    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log("Error : ", error);
    res.json({ success: false, message: "Error" });
  }
};
