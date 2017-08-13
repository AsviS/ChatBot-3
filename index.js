const express = require('express');
const app = express();
const APIAI_TOKEN = 'ca33a6d9d69848d58e9fac26f735f748';
const apiai = require('apiai')(APIAI_TOKEN);

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

const server = app.listen(5000);
app.get('/', (req, res) => {
   res.sendFile('index.html');
});