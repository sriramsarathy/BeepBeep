'use strict';

const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

// [START hello_world]
// Say hello!
app.get('/', (req, res) => {
  res.status(200).send('Hello, BeepBeep !');
});
// [END hello_world]

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

app.use('/login', function(req, res) {   // Allows access to login page
    res.send('displaying login page');   // before access token check
});

app.use(function(req, res, next) {       // Catches access to all other pages
    if(!req.session.accessToken) {       // requiring a valid access token
        res.redirect('/login');
    } else {
        next();
    }
});

module.exports = app;
