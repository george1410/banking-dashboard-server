var express = require('express');
var router = express.Router();
const { AuthAPIClient, DataAPIClient } = require('truelayer-client');

const truelayerCallback = 'http://localhost:3001/auth/truelayer-callback';

const client = new AuthAPIClient({
  client_id: process.env.TRUELAYER_CLIENT_ID,
  client_secret: process.env.TRUELAYER_CLIENT_SECRET
});

const scopes = ["info", "accounts", "balance", "transactions", "offline_access", "cards"]

router.get('/', function(req, res, next) {
  const authURL = client.getAuthUrl(truelayerCallback, scopes, "georgemccarronnonce", null, null, true);
  res.redirect(authURL);
});

router.get('/truelayer-callback', async (req, res) => {
  const code = req.query.code;
  const tokens = await client.exchangeCodeForToken(truelayerCallback, code);
  const info = await DataAPIClient.getInfo(tokens.access_token);

  res.json({ tokens: tokens });
})

module.exports = router;
