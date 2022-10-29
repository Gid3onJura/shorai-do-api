const User = require('../models/User');

module.exports = {
    findAllUser: async function () {
        try {
            const user = await User.findAll({
                attributes: ['id', 'nickname', 'email', 'dojo', 'password']
            }).catch((error) => []);
            return user;
        }
        catch (error) {
            console.log(error);
            return {
                status: 500
            }
        }
    }

}
