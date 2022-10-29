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
            return {
                status: 500
            }
        }
    },
    createUser: async function (data) {
        try {
            const newUser = await User.create(data);
        }
        catch (error) {
            console.log(error);
            return {
                status: 500
            }
        }

    }
}
