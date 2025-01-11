const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrorHandler = require("../utils/AsyncErrorHandler");
const sendToken = require("../utils/JwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");


// Register a User
module.exports.registerUser = AsyncErrorHandler(async (req, res, next) => {
  let { name, email, password } = req.body;
  
    let newUser = new User({
        name,
        email,
        password,
    })
  const savedUser = await newUser.save();
  console.log(savedUser)

    sendToken(savedUser, 201, res);
});

// Login User
module.exports.loginUser = AsyncErrorHandler(async (req, res, next) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler(400, "Email & Password is Required"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler(401, "Invalid Email or Password"));
    }

    const isPasswordMatched = await user.comparePassowrd(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler(401, "Invalid Email or Password"));
    }

    sendToken(user, 200, res);
}); 

// Logout User
module.exports.logoutUser = AsyncErrorHandler((req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    })
});

// Forgot Password
module.exports.forgotPassword = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler(404, "User Not Found"));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
   

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Xial-Ecommerce App Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(500, error.message));
  }
});

// Reset Password
module.exports.resetPassword = AsyncErrorHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler(400, "Token is invalid or has Expired"));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(400, "Password does not Match"));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});


