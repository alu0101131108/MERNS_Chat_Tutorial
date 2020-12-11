const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.register = async (req, res) => {
    // Assign variable names to req.body elements.
    const {
        name,
        email,
        password
    } = req.body;

    // Check if: 1) Password is long enough. 2) Email is valid or supported address. 3) There isnt already a user with the same email.
    if (password.length < 6) throw "Password must be atleast 6 characters long.";

    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/; //Checks if email ends with these @'s.
    if (!emailRegex.test(email)) throw "Email is not supported from your domain.";

    const userExists = await User.findOne({
        email,
    });
    if (userExists) throw "User with same email already exists.";

    // Create user
    const user = new User({
        name,
        email,
        password: sha256(password + process.env.SALT),
    });
    await user.save();

    // Defining a success response.
    res.json({
        message: "User [" + name + "] registered successfully!",
    });
};

exports.login = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT),
    });
    if (!user) throw "Email and Password did not match.";

    const token = await jwt.sign({
            id: user.id
        },
        process.env.SECRET
    );
    res.json({
        message: "User logged in succesfully",
        token,
    });
};