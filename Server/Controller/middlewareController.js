const JWT = require("jsonwebtoken");
const middlewareController = {

    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            JWT.verify(accessToken, process.env.JWT_ACCESSKEY, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).json("you are not authenticated");
        }
    },

    verifyTokenAdmin:(req , res , next) => {
        middlewareController.verifyToken(req,res,()=>{
            if(req.user.id == req.params.id || req.user.admin){
                next();
            }
            else{
                res.status(403).json("you are not allowed to delete");
            }
        });
    }
}

module.exports= middlewareController;