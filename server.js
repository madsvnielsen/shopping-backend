const express = require('express');

const app = express();


app.listen(3000, () => console.log('Example app is listening on port 3000.'));
app.get('/', (req, res) => {
  res.send('Successful response.');
});


app.get('/test', (req, res) => {
    res.send("<h1>Hej</h1>")
})
