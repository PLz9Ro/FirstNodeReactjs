const User = require("../Model/User");

const userController = {
    // GET all users
    getAllUser: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error getting users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    deleteUser: async (req, res) => {
        const user = req.params.id;
        try {
            // const user = await User.findByIdAndDelete(req.params.id);
            const user = await User.findById(req.params.id);
            return res.status(200).json("Delete Success")

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET user by ID
    getUserById: async (req, res) => {
        const userId = req.params.id;

        try {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error('Error getting user by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = userController;