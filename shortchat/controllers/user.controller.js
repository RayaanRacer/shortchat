const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model.js");
const Views = require("../models/views.model.js");
const FormUsage = require("../models/formUsage.model.js");

const addView = asyncHandler(async (req, res) => {
  const { model, brand, ipAddress, date, time, device_id } = req.body;
  console.log(req.body);

  const isDeviceExists = await User.findOne({ where: { deviceId: device_id } });

  const newDate = new Date(date);
  //   console.log(newDate);

  const newTime = new Date(time);
  if (!isDeviceExists) {
    const savedUser = await User.create({
      deviceId: device_id,
      modelNumber: model,
      modelName: brand,
      date,
      time,
    });

    await Views.create({
      date,
      time,
      modelName: brand,
      modelNumber: model,
      deviceId: device_id,
      ipAddress: ipAddress,
      new: true,
    });

    return res.status(200).json({ success: true });
  }
  await Views.create({
    date,
    time,
    modelName: brand,
    modelNumber: model,
    deviceId: device_id,
    ipAddress: ipAddress,
    new: false,
  });
  return res.status(200).json({ success: true });
});

const storeFormUsage = asyncHandler(async (req, res) => {
  const { ipAddress, dateTime, whatsappNumber, message } = req.body;

  await FormUsage.create({
    ipAddress,
    cdate: dateTime,
    whatsappNumber,
    message,
  });
  return res
    .status(200)
    .json({ success: true, message: "Data saved successfully" });
});

module.exports = { addView, storeFormUsage };
