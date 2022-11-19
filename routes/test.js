const express = require('express');
const router = express.Router();

router.get('/alive', async (request, response) => {
    return response.status(200).send({});
});

module.exports = router;