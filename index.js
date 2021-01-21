const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const _ = require('lodash');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const {
  insertWeb,
  read,
  getImage,
  listbyOne,
  update,
  dropRow,
  login,
  register,
  loggedIn,
  insertImageUpdate,
  verifyJWT,
  imageAll,
  imageOne,
  getZip,
  insertZipUpdate,
} = require('./controller/getData');
const {
  upload,
  updateImage,
  deleteImage,
  deleteZip,
  updateZip,
} = require('./controller/uploadImage');

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: 'userId',
    secret: 'subscribe',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1800,
    },
  })
);

app.get('/api/list', read);
app.get('/api/image', imageAll);
app.get('/api/login', loggedIn);
app.post('/api/zip', getZip);
app.get('/api/isUserAuth', verifyJWT, (req, res) => {
  res.send('You are authenticated');
});

app.post('/api/imageOne', imageOne);
app.post('/api/data', listbyOne);
app.post(
  '/api/insert',
  upload.fields([
    {
      name: 'files',
      maxCount: 10,
    },
    {
      name: 'zip',
      maxCount: 5,
    },
  ]),
  insertWeb
);
app.post('/api/image', getImage);
app.post('/api/register', register);
app.post('/api/login', login);

app.put('/api/update', update);
app.post('/api/imageUpdate', updateImage, insertImageUpdate);
app.post('/api/zipUpdate', updateZip, insertZipUpdate);
app.delete('/api/delete', dropRow);
app.post('/api/deleteImage', deleteImage);
app.post('/api/deleteZip', deleteZip);

app.listen(8000, () => console.log('8000 is the port'));
