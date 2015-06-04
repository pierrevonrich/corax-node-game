var express = require('express');
var app = express();
app.use('/',express.static('root'));
app.use('/test',express.static('test'));
app.use('/game',express.static('game'));
app.listen(8080);