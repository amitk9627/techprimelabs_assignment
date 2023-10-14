const jwt = require('jsonwebtoken');
const Users = require('../model/users.js');
const secretKey = process.env.secretKey;

const userRegister = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(404).json({
            status: false,
            message: "user Data not found"
        })
    }
    const Alreadyexist = await Users.findOne({ email: email });
    if (Alreadyexist) {
        return res.status(404).json({
            status: false,
            message: "User already exist"
        })
    }
    const user = {
        email, password
    }
    const newUser = new Users(user);
    const result = await newUser.save();
    res.json({
        status: "register",
        result

    })
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(404).json({
            status: false
        })
    }
    const user = await Users.findOne({ email: email });
    if (user.password !== password) {
        return res.status(401).json({
            status: false,
            message: "Password is incorrect"
        })
    }
    const payload = {
        userId: user._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }
    const token = jwt.sign(payload, secretKey);
    await Users.findByIdAndUpdate(user._id, { token: token })
    res.json({
        status: true,
        message: "User Login successfully",
        token
    })

}

const userLogout = async (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = await jwt.decode(token, secretKey)
     await Users.findByIdAndUpdate(decodedToken.userId, { token: "" });
    res.json({
        status: true,
        message: "user logout successfully",
        
    })
}

module.exports = { userRegister, userLogin ,userLogout}