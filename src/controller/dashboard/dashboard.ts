import { Request, Response } from 'express';
import { logger, logError } from '../../logs';
import getProductStock from '../../service/dashboard/dashboard';

async function dashboard(req: Request, res: Response) {
  res.render('dashboard/dashboard', { data: req.user });
}
const getApiproductStock = async (req: Request, res: Response) => {
  try {
    let storage = req.user!.storageId;
    const [rows] = await getProductStock(storage);
    res.json(rows);
  } catch (err) {
    logError(err);
  }
};
export { dashboard, getApiproductStock };
