import {
  checkExpireService,
  userService,
  checkUserService,
  userLoginService,
  logsService,
  logUnsuccessService,
  expireService,
  getDp,
} from '../../service/login/login';

import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { logger, logError } from '../../logs';
import { Request, Response } from 'express';
import { User, expireUser } from '../../types/login/login';
const { SECRET_KEY } = process.env;

const checkLogin = (req: Request, res: Response) => {
  try {
    let flag = false;
    const token: string = req.cookies?.token;
    if (token) {
      const data = jwt.verify(token, SECRET_KEY as Secret);
      flag = true;
      res.json(flag);
      return;
    } else {
      flag = false;
      res.json(flag);
      return;
    }
  } catch (error) {
    logError(error);
  }
};

const getLogin = async (req: Request, res: Response) => {
  res.render('login/login');
};

const userLogin = async (req: Request, res: Response) => {
  const data: User = req.body;
  const user = await userLoginService(data);
  if (user.length > 0 && user[0].status == 6) {
    const result = await bcrypt.compare(req.body.password, user[0].password);
    const expireDatePass = new Date(user[0].expiry);
    const newDatePass = new Date();
    if (user[0].role_id == 4) {
      if (result) {
        if (
          (Math.abs(
            (newDatePass.valueOf() - expireDatePass.valueOf()) /
              1000 /
              3600 /
              24
          ) as number) < 10
        ) {
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
            SECRET_KEY as string,
            {
              expiresIn: '2h',
            }
          );
          const id = user[0].id;
          const logs = await logsService(id);
          return res.cookie('token', token).status(200).send('login success');
        } else {
          return res.status(403).send('password was expired');
        }
      } else {
        const id = user[0].id;
        const log = await logUnsuccessService(id);
        return res.status(401).send('invalid email or password');
      }
    }
    if (user[0].role_id == 5 && user[0].is_delete == 0) {
      if (result) {
        if (
          (Math.abs(
            (newDatePass.valueOf() - expireDatePass.valueOf()) /
              1000 /
              3600 /
              24
          ) as number) < 10
        ) {
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
            SECRET_KEY as Secret,
            {
              expiresIn: '2h',
            }
          );
          return res.cookie('token', token).status(200).send('login success');
        } else {
          return res.status(403).send('password was expired');
        }
      }
    } else {
      return res.status(402).send('no logner available');
    }
  } else {
    return res.status(401).send('invalid email or password');
  }
};

const getUserName = async (req: Request, res: Response) => {
  res.render('login/user');
};
const checkUser = async (req: Request, res: Response) => {
  try {
    const userEmail: User = JSON.parse(JSON.stringify(req.body));
    const result4 = await checkUserService(userEmail);
    if (result4.length > 0) {
      if (result4[0].email == req.body.email) {
        let otp = Math.floor(Math.random() * 1000000000000 + 1);
        const user = await userService(otp, req.body);
        res.render('login/user', { otp: otp, id: result4[0].id });
      }
    } else if (result4.length === 0) {
      const error = 'user not valid';
      res.render('login/user', { error: error });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};
const getLink = async (req: Request, res: Response) => {
  try {
    const { link, id } = req.params;
    const expiredata: expireUser = { link, id };
    if (id && link) {
      const user = await expireService(expiredata);
      const timer = user[0][0]?.updated_at;
      if (timer) {
        const expeireTimer = new Date(
          new Date(timer).getTime() + 5 * 3600000
        ).toTimeString();
        const newtime = new Date().toTimeString();
        if (newtime < expeireTimer) {
          return res.render('login/forgot');
        } else {
          let otp = Math.floor(Math.random() * 1000000000000 + 1);
          const data: expireUser = { otp, id };
          const change = await checkExpireService(data);
          return res.send('expired');
        }
      }
    }
  } catch (error) {
    logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};
const userLogout = async (req: Request, res: Response) => {
  try {
    const token: string = req.cookies?.token;
    return res.clearCookie('token').status(200).redirect(`/`);
  } catch (error) {
    logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    let token: string = req.cookies?.token;
    const data: string | JwtPayload = jwt.verify(token, SECRET_KEY as Secret);

    if (typeof data !== 'string') {
      const user = await getDp(data.id);
      token = jwt.sign(
        {
          id: data.id,
          roleId: data.roleId,
          storageId: data.storageId,
          dp: user[0].dp,
        },
        SECRET_KEY as Secret,
        {
          expiresIn: '2h',
        }
      );
    }

    return res.cookie('token', token).status(200).redirect('/');
  } catch (error) {
    res.status(500);
    logError(error);
  }
};

export {
  checkLogin,
  userLogout,
  checkUser,
  getUserName,
  userLogin,
  getLogin,
  logsService,
  logUnsuccessService,
  getLink,
  refreshToken,
};
