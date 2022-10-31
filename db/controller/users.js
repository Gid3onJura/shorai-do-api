const User = require('../models/User');

module.exports = {
    findAllUser: async function () {
        try {
            const users = await User.findAll({
                attributes: ['id', 'nickname', 'email', 'dojo', 'password']
            }).catch((error) => []);
            return users;
        }
        catch (error) {
            console.log(error);
            return []
        }
    },
    nicknameExists: async function (nickname) {
        try {
            const user = await User.findOne({ where: { nickname: nickname } });
            if (user) {
                return true;
            } else {
                return false;
            }
        }
        catch (error) {
            console.log(error);
            return true;
        }
    },
    createUser: async function (data) {
        try {
            const newUser = await User.create(data);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }

    }
}
