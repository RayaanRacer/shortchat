import expressAsyncHandler from "express-async-handler";
import db from "../db";

const adminLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // const user = await db.User.findOne({email});
});
