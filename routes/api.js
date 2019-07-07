var express = require('express');
var router = express.Router();
const { DataAPIClient } = require('truelayer-client');
const getAccessToken = require('../middleware/truelayerToken');

router.get('/accounts', getAccessToken, (req, res) => {
  DataAPIClient.getAccounts(req.accessToken)
    .then(accounts => {
      res.json(accounts);
    });
});

router.get('/balance', getAccessToken, (req, res) => {
  console.log('getting balance');
  DataAPIClient.getBalance(req.accessToken, 'a58a44d9a78d88019a74c09d5995f24e')
    .then(balance => {
      res.json(balance);
    });
});

module.exports = router;
