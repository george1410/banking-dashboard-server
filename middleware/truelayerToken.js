const fs = require('fs');
const { AuthAPIClient, DataAPIClient } = require('truelayer-client');
const authClient = new AuthAPIClient({
  client_id: process.env.TRUELAYER_CLIENT_ID,
  client_secret: process.env.TRUELAYER_CLIENT_SECRET
});

module.exports = (req, res, next) => {
  console.log('heeee');
  file = fs.readFileSync('tokens.json');
  tokens = JSON.parse(file);

  if (!(DataAPIClient.validateToken(tokens.access_token))) {
    console.log('refreshing');
    authClient.refreshAccessToken(tokens.refresh_token)
      .then(newTokens => {
        fs.writeFileSync('tokens.json', JSON.stringify(newTokens));
        req.accessToken = newTokens.access_token;
        next();
      });
  } else {
    console.log('NOT refreshing');
    req.accessToken = tokens.access_token;
    next();
  }
}