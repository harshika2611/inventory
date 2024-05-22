import { Request, Response } from 'express';
import { logger, logError } from '../../logs';
import getpurchaseProductreport from '../../service/report/purchaseReportService';

const getpurchaseReport = (req: Request, res: Response) => {
  res.render('reports/purchaseReport', { data: req.user });
};
const getApiproductPurchasereport = async (req: Request, res: Response) => {
  try {
    let storage = req.user!.storageId;
    const [rows] = await getpurchaseProductreport(storage);
    res.json(rows);
  } catch (err) {
    logError(err);
  }
};
export { getpurchaseReport, getApiproductPurchasereport };
