const User = require("../Models/userModel.js");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  let { username, email, password } = req.body;

  let usernameCheck = await User.findOne({ username });
  if (usernameCheck) {
    return res.json({ msg: "username is already used", status: false });
  }

  let emailCheck = await User.findOne({ email });
  if (emailCheck) {
    return res.json({ msg: "email is already used", status: false });
  }

  let hashPassword = await bcrypt.hash(password, 10);
  let newUser = await User.create({ username, email, password: hashPassword });
  newUser = newUser.toObject();
  delete newUser.password;
  res.json({ ...newUser, status: true });
};

exports.login = async (req, res, next) => {
  let { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user)
      res.json({ msg: "Incorrect username or password", status: false });
    else {
      user = user.toObject();
      isPasswordCorrect = bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        res.json({ msg: "Incorrect username or password", status: false });
      } else {
        delete user.password;
        res.json({ ...user, status: true });
      }
    }
  } catch (error) {
    res.json({ msg: "Internal server Error", status: false });
  }
};

exports.setAvatar = async (req, res, next) => {
  let { id } = req.params;
  try {
    let user = await User.findByIdAndUpdate(
      id,
      { isAvatarSet: true, ...req.body },
      { new: true }
    );

    if (!user) {
      res.json({ msg: "user not present", status: false });
    } else {
      user = user.toObject();
      delete user.password;
      res.json({ ...user, status: true });
    }
  } catch (e) {
    res.json({ msg: e.message, status: false });
  }
};

exports.getAllContacts = async (req, res, next) => {
  let { id } = req.params;
  try {
    let users = await User.find({ _id: { $ne: id } }).select([
      "username",
      "email",
      "avatarImage",
      "_id",
    ]);
    res.json({ users, status: true });
  } catch (error) {
    console.log(error.message);
    res.json({ msg: "Internal server error", status: false });
  }
};
