const userModel = require("../models/userModels");
const getUserCart = async (req, res) => {
  try {
    const userInfo = req.user;
    if (!userInfo) {
      return res.json({ message: "No user info", success: false });
    }

    const user = await userModel.findById(userInfo._id);
    let cartData = await user.cart;
    console.log("cartData is", cartData);
    return res.json({
      message: "fetched cart data",
      success: true,
      cart: cartData,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userInfo = req.user;
    console.log("userInfo in add to cart is", userInfo);
    const user = await userModel.findById(userInfo._id);
    console.log("user in addto cart backend is", user)
    let cartData =await user.cart;
    console.log("cartData in backend is", cartData)
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(
      userInfo._id,
      { cart: cartData },
      { new: true }
    );
    return res.json({
      message: "Added to Cart",
      success: true,
      cart: cartData,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

// Need to checkout this remove function once again
const removeFromCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userInfo = req.user;
    const user = await userModel.find(userInfo._id);
    console.log("user is", user);
    const cartData = user[0].cart;
    console.log("cartData in remove from cart is", cartData);
  
    // await userModel.updateOne(
    //   { _id: userInfo._id },
    //   { $unset: { [`cart.${itemId}`]: "" } }
    // );

    await userModel.findByIdAndUpdate(
      { _id: userInfo._id },
      { $unset: { [`cart.${itemId}.${size}`]: "" } },
      { new: true }
    );
    res.json({ message: "Cart item removed", success: true, cart: user.cart });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userInfo = req.user;

    const user = await userModel.findById({ _id: userInfo._id });
    const cartData =await  user.cart;
    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(
      userInfo._id,
      { cart: cartData },
      { new: true }
    );
    return res.json({ message: "Cart updated", success: true, cart: cartData });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

module.exports = { getUserCart, addToCart, removeFromCart, updateCart };
