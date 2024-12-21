import express from "express";
import ApiError from "./../utils/ApiError.js";
import { User } from "../models/user.model.js";

const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
      throw new ApiError(401, "All fields are required");
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { name }],
    });
    if (existingUser) {
      throw new ApiError(402, "User already existed");
    }
    const user = await User.create({ name, email, age });
    res.status(201).send({
      success: true,
      message: "New User created",
      user,
    });
  } catch (error) {
    console.log("User creation failed", error);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = User.findById(userId);

    if (!user) {
      res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    const { name, email, age } = req.body;

    if (!name && !email && !age) {
      return res
        .status(400)
        .json({ error: "At least one field is required to update" });
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: { name, email, age } },
      { new: true }
    );
    if (updateUser) {
      res.status(201).send({
        success: true,
        message: "User Update Sucessfully",
        updateUser,
      });
    }
  } catch (error) {
    console.log("User updation failed", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = User.findById(userId);

    if (!user) {
      res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(201).send({
      success: true,
      message: "User deleted successfully",
      deleteUser,
    });
  } catch (error) {
    console.log("User deleted successfully", error);
  }
};

const getAllUser =async(req, res)=> {
   try {
    
    const user = await User.find()
    res.status(201).send({
      message: "User succefully getting",
      user
    })
   } catch (error) {
    console.log("Get user not working", error);
   }
}

const getAllUserById =async(req, res)=> {
  try {
    const userId = req.params.id;
   const user = await User.findById(userId)
   res.status(201).send({
     message: "User succefully getting",
     user
   })
  } catch (error) {
   console.log("Get user not working", error);
  }
}

export { createUser, updateUser, deleteUser, getAllUser, getAllUserById };
