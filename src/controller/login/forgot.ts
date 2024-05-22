import { Request, Response } from 'express';
import { logger, logError } from '../../logs';
import forgotPassService from '../../service/login/forgot';
import { checkUserService } from '../../service/login/login';
import { forgotPass } from '../../types/login/login';

const getForgot = async (req: Request, res: Response) => {
  res.render('login/forgot');
};

const forgotPass = async (req: Request, res: Response) => {
  try {
    const link = req?.params?.link;
    const userId = req?.params?.id;
    const { new_pass } = req.body;
    const result4 = await checkUserService({ ...req.body, link, userId });
    const email = result4[0].email;
    if (result4.length > 0) {
      const data: forgotPass = { new_pass, email };
      const result = await forgotPassService(data);
    }
    if (result4.length === 0) {
      const error = 'user not valid';
      return res.status(404).send('User not valid');
    } else {
      return res.status(200).send('You are successfully registerd');
    }
  } catch (error) {
    logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};

export { getForgot, forgotPass };
