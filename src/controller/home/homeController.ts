import { Request, Response } from 'express';

const getHome = async (req: Request, res: Response) => {
  res.render('home');
};
export default getHome;
