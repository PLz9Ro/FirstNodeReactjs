const bcrypt = require("bcrypt");
const User = require("../Model/User");
const JWT = require("jsonwebtoken");

let refreshTokens=[

];
const authController = {
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt).catch((error) => {
                console.error('Error hashing password:', error);
                throw new Error('Hashing password failed');
            });

            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: hashed,
            });

            //save to DB
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    generateAccessToken: (user) => {
        return JWT.sign({
            id: user.id,
            admin: user.admin,
        },
            process.env.JWT_ACCESSKEY, { expiresIn: "1h" }
        );
    },
    generateRefreshToken: (user) => {
        return JWT.sign({
            id: user.id,
            admin: user.admin,
        },
            process.env.JWT_REFRESH_TOKEN, { expiresIn: "365d" }
        );
    },
    LoginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            
            if (!user) {
                res.status(404).json("Wrong Username!");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                res.status(404).json("Wrong Password");
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false, //deploy thanh true
                    path: "/",
                    sameSite: "strict"
                })
                const { password, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
            }

        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    requestRefreshToken: async (req, res) => {
        //Take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated");

        JWT.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token)=> token !== refreshToken);
            //Create new accesstoken, refresh token
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            res.cookie("refreshToken", newAccessToken, newRefreshToken, {
                httpOnly: true,
                secure: false, //deploy thanh true
                path: "/",
                sameSite: "strict"
            })
            res.status(200).json({ accessToken: newAccessToken });
        })
    },

}
module.exports = authController;