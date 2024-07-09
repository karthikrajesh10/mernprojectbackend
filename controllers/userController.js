import User from "../models/User.js";

//create new User
export const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "User saved",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "User did not saved" });
  }
};

//update User
export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User Updated",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating User:", error);
    res.status(500).json({
      success: false,
      message: "User not Updated",
    });
  }
};

//Delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User Deleted",
    });
  } catch (error) {
    console.error("Error updating User:", error);
    res.status(500).json({
      success: false,
      message: "User not Deleted",
    });
  }
};

//get single User
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

//getAll Users
export const getAllUser = async (req, res) => {

  try {
    const users = await User.find({})

    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found Users",
    });
  }
};