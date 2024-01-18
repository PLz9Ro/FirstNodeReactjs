const middlewareController = require("../Controller/middlewareController");
const userController = require("../Controller/userController");

const router = require("express").Router();

router.get("/",middlewareController.verifyToken,userController.getAllUser);
router.delete("/:id",middlewareController.verifyTokenAdmin, userController.deleteUser);

module.exports = router;
 