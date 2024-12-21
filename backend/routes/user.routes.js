import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getAllUserById
} from "../controller/usercontroller.js";

const router = express.Router();

router.route("/create").post(createUser);
router.route("/getAll").get(getAllUser);
router.route("/update/:id").put(updateUser);
router.route("/getAllUser/:id").get(getAllUserById);
router.route("/delete/:id").delete(deleteUser);

export default router;
