import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect('mongodb://' + process.env.IP + ':27017/qnaboard');

const app = express();

/* use session */
app.use(session({
  secret: 'sdfsfs#E$4234xcvxcv',
  resave: false,
  saveUninitialized: true
}));

/* middleware */
app.use(bodyParser.json());

/* static files */
app.use('/', express.static(__dirname + './../public'));

/* use API */
import api from './routes';
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

/* server open */
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Express is listening on port', process.env.PORT);
});

/* development setting */
if(process.env.NODE_ENV == 'development') {
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(config.devServer.port);
    console.log('Server is running on development mode', config.devServer.port);
}