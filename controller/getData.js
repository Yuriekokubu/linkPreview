const { db } = require('./connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { result } = require('lodash');

exports.verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.send('Yo, we need a token,please give it to us next time');
  } else {
    jwt.verify(token, 'jwtSecret', (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: 'U failed to authenticate' });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

exports.loggedIn = (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

exports.register = (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const sqlRegister =
      'INSERT INTO tb_user (name,username,password) VALUES (?,?,?)';
    db.query(sqlRegister, [name, username, hash], (err, result) => {
      res.send({ message: 'success' });
    });
  });
};

exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(req.body);

  const sqlLogin = 'SELECT * FROM tb_user WHERE username = ?';

  db.query(sqlLogin, [username], (err, result) => {
    if (err) {
      res.send({ error: err });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          const id = result[0].id;
          const token = jwt.sign({ id }, 'jwtSecret', {
            expiresIn: 300,
          });
          req.session.user = result;

          res.json({ auth: true, token: token, result: result });
        } else {
          res.send({ message: 'WRONG username/password combination' });
        }
      });
    } else {
      res.send({ message: 'User doesnt exist' });
    }
  });
};

exports.imageOne = async (req, res) => {
  const webId = req.body.webId;
  const sqlImgOne = 'SELECT web_id,img_path FROM tb_img WHERE web_id = ?';
  await db.query(sqlImgOne, [webId], (err, result) => {
    res.json(result);
  });
};

exports.imageAll = async (req, res) => {
  const sqlImage =
    'SELECT tb_web.web_id,tb_img.img_path FROM tb_web LEFT JOIN tb_img ON tb_web.web_id = tb_img.web_id GROUP BY tb_web.web_id';
  await db.query(sqlImage, (err, result) => {
    res.json(result);
  });
};

exports.insertWeb = async (req, res, next) => {
  const webName = req.body.web_name;
  const webUrl = req.body.web_url;
  const webDetails = req.body.web_details;

  const sqlInsert =
    'INSERT INTO tb_web (web_name,web_url,web_details,user_id,timestamp) VALUES (?,?,?,?,?)';
  const dateNow = Date.now();
  await db.query(
    sqlInsert,
    [webName, webUrl, webDetails, 1, dateNow],
    (err, result) => {
      console.log(err);
      const sqlCheckLastIndex =
        'SELECT web_id FROM tb_web ORDER BY web_id DESC LIMIT 1';
      db.query(sqlCheckLastIndex, (err, result) => {
        const lastIndex = result[0]['web_id'];

        const insertWebImg = `INSERT INTO tb_img (img_path,web_id) VALUES (?,?)`;
        req.files.files.map((f) => {
          db.query(insertWebImg, [f.filename, lastIndex], (err, result) => {
            console.log(err);
            console.log(result);
          });
        });
        const sqlInsertZip =
          'INSERT INTO tb_zip (zip_path,web_id) VALUES (?,?)';
        if (req.files.zip) {
          req.files.zip.map((z) => {
            db.query(
              sqlInsertZip,
              [z.originalname, lastIndex],
              (err, result) => {
                console.log(result);
              }
            );
          });
        } else {
          db.query(sqlInsertZip, [null, lastIndex], (err, result) => {
            console.log(result);
          });
        }
      });
    }
  );

  res.json({
    message: 'insert success',
  });
};

exports.read = (req, res) => {
  const sqlRead =
    'SELECT tb_web.web_id,tb_web.web_name,tb_web.web_url,tb_web.web_details,tb_web.user_id,tb_web.timestamp,tb_img.img_id,tb_img.img_path,tb_zip.zip_id,tb_zip.zip_path FROM tb_web LEFT JOIN tb_img ON tb_web.web_id = tb_img.web_id LEFT JOIN tb_zip on tb_web.web_id = tb_zip.web_id GROUP BY tb_web.web_id';
  // 'SELECT * FROM tb_web LEFT JOIN tb_img on tb_web.web_id = tb_img.web_id';
  db.query(sqlRead, (err, result) => {
    res.json(result);
    console.log(result);
  });
};

exports.getImage = (req, res) => {
  const sqlRead = 'SELECT * FROM tb_img WHERE web_id = ?';
  // 'SELECT * FROM tb_web LEFT JOIN tb_img on tb_web.web_id = tb_img.web_id';
  db.query(sqlRead, [req.body.web_id], (err, result) => {
    res.json(result);
  });
};

exports.listbyOne = (req, res) => {
  const webId = req.body.web_id;
  const sqlListbyOne =
    'SELECT tb_web.web_id,tb_web.web_name,tb_web.web_url,tb_web.web_details,tb_web.user_id,tb_web.timestamp,tb_img.img_id,tb_img.img_path,tb_zip.zip_id,tb_zip.zip_path FROM tb_web LEFT JOIN tb_img ON tb_web.web_id = tb_img.web_id LEFT JOIN tb_zip ON tb_web.web_id = tb_zip.web_id WHERE tb_web.web_id = ?';
  db.query(sqlListbyOne, [webId], (err, result) => {
    res.status(200).json(result);
  });
};

exports.getZip = (req, res) => {
  const webId = req.body.web_id;
  const sqlgetZip = 'SELECT web_id,zip_path FROM tb_zip WHERE web_id = ?';
  db.query(sqlgetZip, [webId], (err, result) => {
    res.status(200).json(result);
  });
};

exports.update = (req, res, next) => {
  const webId = req.body.web_id;
  const webName = req.body.web_name;
  const webUrl = req.body.web_url;
  const webDetails = req.body.web_details;
  const webImage = req.body.files;
  const webZip = req.body.zips;

  const sqlUpdate =
    'UPDATE tb_web SET web_name = ? , web_url= ? , web_details= ?  WHERE web_id = ?';
  db.query(sqlUpdate, [webName, webUrl, webDetails, webId], (err, result) => {
    console.log(err);
  });

  const checkImgCount = 'SELECT COUNT(*) FROM tb_img WHERE web_id = ?';
  db.query(checkImgCount, [webId], (err, result) => {
    const count = result[0]['COUNT(*)'];
    const oldLength = webImage.length;
    if (oldLength !== count) {
      const dropALLImagePath = 'DELETE FROM tb_img WHERE web_id = ?';
      db.query(dropALLImagePath, [webId], (err, result) => {
        console.log(err);

        const sqlUpdateImage =
          'INSERT INTO tb_img (img_path,web_id) VALUES (?,?)';
        webImage.map((image) => {
          db.query(sqlUpdateImage, [image, webId], (err, result) => {
            console.log(result);
            console.log(err);
          });
        });
      });
    }
    console.log(result);
  });

  const checkZipCount = 'SELECT COUNT(*) FROM tb_zip WHERE web_id = ?';
  db.query(checkZipCount, [webId], (err, result) => {
    const count = result[0]['COUNT(*)'];
    const oldLength = webZip.length;
    if (oldLength !== count) {
      const dropAllZipPath = 'DELETE FROM tb_zip WHERE web_id = ?';
      db.query(dropAllZipPath, [webId], (err, result) => {
        console.log(err);

        const sqlUpdateZip =
          'INSERT INTO tb_zip (zip_path,web_id) VALUES (?,?)';
        webZip.map((zip) => {
          db.query(sqlUpdateZip, [zip, webId], (err, result) => {
            console.log(result);
            console.log(err);
          });
        });
      });
    }
  });

  res.status(200).json({ message: 'success' });
  next();
};

exports.dropRow = (req, res) => {
  const webId = req.body.deleteId;
  console.log(webId);
  const sqlDropRow = 'DELETE FROM tb_web WHERE web_id = ?';
  db.query(sqlDropRow, [webId], (err, result) => {
    res.setHeader('content-type', 'application/json');
    res.status(200).json({ message: 'success' });
    console.log(result);
  });
};

exports.insertImageUpdate = (req, res) => {
  const web_id = req.body.webId;
  const imageUpdate = req.files;
  imageUpdate.map((f) => {
    const sqlInsert = 'INSERT INTO tb_img (img_path,web_id) VALUES (?,?)';
    db.query(sqlInsert, [f.filename, web_id], (err, result) => {
      console.log(result);
    });
  });
  res.status(200).json({ message: 'success' });
};

exports.insertZipUpdate = (req, res) => {
  const web_id = req.body.webId;
  const zipUpdate = req.files;
  console.log(req.files);
  zipUpdate.map((z) => {
    const sqlInsertZip = 'INSERT INTO tb_zip (zip_path,web_id) VALUES (?,?)';
    db.query(sqlInsertZip, [z.filename, web_id], (err, result) => {
      console.log(result);
    });
  });
  res.status(200).json({ message: 'success' });
};
