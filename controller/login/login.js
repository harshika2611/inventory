const {
  userService,
  checkUserService,
  userLoginService,
  logsService,
  logUnsuccessService,
  expireService,
} = require('../../service/login/login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../../logs');
const { SECRET_KEY } = process.env;

const checkLogin = (req, res) => {
  try {
    let flag = false;
    const token = req.cookies?.token;
    if (token) {
      const data = jwt.verify(token, SECRET_KEY);
      flag = true;
      res.json(flag);
    } else {
      flag = false;
      res.json(flag);
    }
  } catch (error) {
    logger.logError(error);
  }
};

const getLogin = async (req, res) => {
  res.render('login/login');
};

const userLogin = async (req, res) => {
  const user = await userLoginService(req.body);
  console.log(user, 'aaa');
  if (user.length > 0 && user[0].status == 6) {
    const result = await bcrypt.compare(req.body.password, user[0].password);
    const expireDatePass = new Date(user[0].expiry);
    const newDatePass = new Date();
    if (user[0].role_id == 4) {
      if (result) {
        if (Math.abs((newDatePass - expireDatePass) / 1000 / 3600 / 24) < 10) {
          const userId = user[0].id;
          const roleId = user[0].role_id;
          const storageId = user[0].storage_id;
          const token = jwt.sign(
            {
              id: userId,
              roleId: roleId,
              storageId: storageId,
              dp: user[0].dp,
            },
            SECRET_KEY,
            {
              expiresIn: '2h',
            }
          );
          const id = user[0].id;
          const logs = await logsService(id);
          return res.cookie('token', token).status(200).send('login success');
        } else {
          res.status(403).send('password was expired');
        }
      } else {
        const id = user[0].id;
        const log = await logUnsuccessService(id);
        res.status(401).send('invalid email or password');
      }
    }
    if (user[0].role_id == 5 && user[0].is_delete == 0) {
      if (result) {
        if (Math.abs((newDatePass - expireDatePass) / 1000 / 3600 / 24) < 10) {
          const userId = user[0].id;
          const roleId = user[0].role_id;
          const storageId = user[0].storage_id;
          const token = jwt.sign(
            {
              id: userId,
              roleId: roleId,
              storageId: storageId,
              dp: user[0].dp,
            },
            SECRET_KEY,
            {
              expiresIn: '2h',
            }
          );
          return res.cookie('token', token).status(200).send('login success');
        } else {
          res.status(403).send('password was expired');
        }
      } else {
        const id = user[0].id;
        const log = await logUnsuccessService(id);
        const error = 'invalid email or password';
        res.status(401).send('invalid email or password');
      }
    } else {
      res.status(402).send('no logner available');
    }
  }
};

const getUserName = async (req, res) => {
  res.render('login/user');
};
const checkUser = async (req, res) => {
  try {
    const result4 = await checkUserService(req.body);
    if (result4.length > 0) {
      if (result4[0].email == req.body.email) {
        const otp = Math.floor(Math.random() * 1000000000000 + 1);
        const user = await userService(otp, req.body);
        res.render('login/user', { otp: otp, id: result4[0].id });
        // res.status(200).redirect('login/user').send({ otp, id: result4[0].id });
      }
    } else if (result4.length === 0) {
      const error = 'user not valid';
      res.render('login/user', { error: error });
    }
  } catch (error) {
    logger.logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};
const getLink = async (req, res) => {
  try {
    const link = req.params.link;
    const id = req.params.id;
    const user = await expireService(link);
    const timer = user[0][0].updated_at;
    const expeireTimer = new Date(
      new Date(timer).getTime() + 2 * 3600000
    ).toTimeString();
    const newtime = new Date().toTimeString();
    if (newtime < expeireTimer) {
      res.redirect('/forgot');
    } else {
      res.send('expired');
    }
  } catch (error) {
    logger.logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};
const userLogout = async (req, res) => {
  try {
    const token = req.cookies?.token;
    return res.clearCookie('token').status(200).redirect(`/`);
  } catch (error) {
    logger.logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};
module.exports = {
  checkLogin,
  userLogout,
  checkUser,
  getUserName,
  userLogin,
  getLogin,
  logsService,
  logUnsuccessService,
  getLink,
};
