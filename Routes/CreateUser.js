const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment"); 
const jwtSecret = "MynameisRamukumar";
const Razorpay = require("razorpay");
router.post("/generateOrderId", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      payment_capture: 1,
    };

    const razorpay = new Razorpay({
      key_id: "",
      key_secret: "",
    });

    const order = await razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      orderId: order.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Failed to generate order ID",
    });
  }
});


router.post("/myAppoinments", async (req, res) => {
 const { patientUserName } = req.body;
 const now = new Date();

 try {
   const appointments = await Appointment.find({
     patientUserName: patientUserName,
     date: { $gte: now },
   }).exec();

   if (appointments.length > 0) {
     res.json({ success: true, appointments: appointments });
   } else {
     res.json({
       success: false,
       message: "No appointments found for this patient.",
     });
   }
 } catch (error) {
   res.json({ success: false, message: error.message });
 }
});
router.post("/doctorAppointments", async (req, res) => {
  const {doctorUserName} = req.body;
  const now = new Date();

  try {
    const appointments = await Appointment.find({
      doctorUserName: doctorUserName,
      date: { $gte: now },
    }).exec();

    if (appointments.length > 0) {
      res.json({ success: true, appointments: appointments });
    } else {
      res.json({
        success: false,
        message: "No appointments found.",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
router.post("/getDoctor", async (req, res) => {
<<<<<<< HEAD
  const { cityName } = req.body;
=======
  const { cityName } = req.body; 
>>>>>>> 9eee60d (razorpay update)

  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB connection not established");
    }
    if (!cityName) {
      return res.status(400).json({
        success: false,
        error: "cityName is required",
      });
    }
<<<<<<< HEAD

=======
>>>>>>> 9eee60d (razorpay update)
    const doctors = await Doctor.find({
      cityName: { $regex: new RegExp(`^${cityName}$`, "i") },
    });

    res.status(200).json({ success: true, doctors });
  } catch (err) {
    console.error("Error finding doctors by city:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
router.post(
  "/bookAppointment",
  [
    body("patientUserName").notEmpty().withMessage("Patient username is required"),
    body("doctorUserName").notEmpty().withMessage("Doctor username is required"),
    body("date").isISO8601().withMessage("Invalid date format"),
    body("reason").notEmpty().withMessage("Reason is required"),
    body("message").notEmpty().withMessage("Message is required"),
    body("patientContactNumber").notEmpty().withMessage("Patient contact number is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { patientUserName, doctorUserName, date, reason, message, patientContactNumber } = req.body;

    try {
      if (mongoose.connection.readyState !== 1) {
        throw new Error("MongoDB connection not established");
      }
<<<<<<< HEAD

=======
>>>>>>> 9eee60d (razorpay update)
      await Appointment.create({
        patientUserName,
        doctorUserName,
        date: new Date(date),
        reason,
        message,
        patientContactNumber,
      });

      res.status(200).json({ success: true, message: "Appointment booked successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);
router.post(
  "/register",
  [
    body("userName").notEmpty().withMessage("Name is required"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("email").isEmail().withMessage("Invalid email format"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { userName, password, email } = req.body;

    try {
      if (mongoose.connection.readyState !== 1) {
        throw new Error("MongoDB connection not established");
      }
<<<<<<< HEAD

=======
>>>>>>> 9eee60d (razorpay update)
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          error: "Email is already registered",
        });
      }

<<<<<<< HEAD

=======
>>>>>>> 9eee60d (razorpay update)
      const existingName = await User.findOne({ userName });
      if (existingName) {
        return res.status(400).json({
          success: false,
          error: "Username is already taken",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        userName,
        password: hashedPassword,
        email,
      });

      res
        .status(200)
        .json({ success: true, message: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

router.post(
  "/registerDoctor",
  [
    body("userName").notEmpty().withMessage("UserName is required"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("specialization").notEmpty().withMessage("Specialization is required"),
    body("degrees").notEmpty().withMessage("Degrees are required"),
    body("experience").notEmpty().withMessage("Experience is required"),
    body("fees").notEmpty().withMessage("Fees are required"),
    body("timings").notEmpty().withMessage("Timings are required"),
    body("cityName").notEmpty(),
    body("address").notEmpty().withMessage("Address is required"),
    body("contactNumber").notEmpty().withMessage("Contact number is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      userName,
      email,
      password,
      fullName,
      specialization,
      degrees,
      experience,
      fees,
      timings,
      address,
      cityName,
      contactNumber,
    } = req.body;

    try {
      if (mongoose.connection.readyState !== 1) {
        throw new Error("MongoDB connection not established");
      }

      // Check if email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          error: "Email is alreay taken",
        });
      }

      const existingName = await User.findOne({ userName });
      if (existingName) {
        return res.status(400).json({
          success: false,
          error: "Username is already taken",
        });
      }
      const existingEmail1 = await Doctor.findOne({ email });
      if (existingEmail1) {
        return res.status(400).json({
          success: false,
          error: "Email is alreay taken",
        });
      }

      const existingName2 = await Doctor.findOne({ userName });
      if (existingName2) {
        return res.status(400).json({
          success: false,
          error: "Username is already taken",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await Doctor.create({
        userName,
        email,
        password: hashedPassword,
        fullName,
        specialization,
        degrees,
        experience,
        fees,
        timings,
        cityName,
        address,
        contactNumber,
      });

      res
        .status(200)
        .json({ success: true, message: "Doctor registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

router.post("/donordata", (req, res) => {
  try {
    console.log(global.donar_data);
    res.status(200).send(global.donar_data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
router.post("/flightsdata", (req, res) => {
  try {
    console.log(global.flights_data);
    res.status(200).send(global.flights_data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
router.post("/create", async (req, res) => {
  try {
    res.status(201).send("User created");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/create", async (req, res) => {
  try {
    res.status(201).send("User created");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found"});
    }
    res.json({ email: user.email, name: user.userName, photo: user.photo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
router.get("/doctorProfile", authenticateToken, async (req, res) => {
  try {
    const user = await Doctor.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.json({ email:user.email,userName:user.userName,fullName:user.fullName,specialization:user.specialization,degrees:user.degrees,experience:user.experience,fees:user.fees,timings:user.timings,cityName:user.cityName,address:user.address,contactNumber:user.contactNumber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user.user;
    next();
  });
}

router.route("/update/:email").patch(async (req, res) => {
  try {
    const { email } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ msg: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true } 
    );

    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }

    const msg = {
      msg: "Password updated successfully",
      email: req.params.email,
    };
    return res.json(msg);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
router.route("/delete/:email").delete(async (req, res) => {
  try {
    const { email } = req.params;

    const result = await User.findOneAndDelete({ email });

    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }

    const msg = {
      msg: "Account deleted successfully",
      email: req.params.email,
    };
    return res.json(msg);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
router.post(
  "/loginuser",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid email or password" });
      }
      const data={
        user:{
          id:user.id,
        }
      }
    //  const authToken=jwt.sign(data,jwtSecret)
    //  console.log(authToken)
    //  return res.status(200).json({ success: true, message: "Logged in successfully",authToken:authToken});
     const authToken = jwt.sign(data, jwtSecret);
      console.log("User found:", user);
     res.status(200).json({
       success: true,
       message: "Logged in successfully",
       authToken: authToken,
       email: user.email,
       name: user.name,
      
     });
     
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);
router.post(
  "/loginDoctor",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid email or password" });
      }
      const data = {
        user: {
          id: doctor.id,
        },
      };
      //  const authToken=jwt.sign(data,jwtSecret)
      //  console.log(authToken)
      //  return res.status(200).json({ success: true, message: "Logged in successfully",authToken:authToken});
      const authToken = jwt.sign(data, jwtSecret);
      console.log("User found:", doctor);
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        authToken: authToken,
        email: doctor.email,
        name: doctor.name,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

module.exports = router;
