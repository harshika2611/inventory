import { logger, logError } from '../../logs';
import { Request, Response } from 'express';
import {
  getProductreport,
  getCategotyreport,
} from '../../service/report/selesReportService';

const getsalesReport = (req: Request, res: Response) => {
  res.render('reports/salesReport', { data: req.user });
};
const getReportallProducts = (req: Request, res: Response) => {
  res.render('reports/allProducts', { data: req.user });
};
const getApiproductreport = async (req: Request, res: Response) => {
  try {
    let storage = req.user!.storageId;
    const [rows] = await getProductreport(storage);
    res.json(rows);
  } catch (err) {
    logError(err);
  }
};

const getApicategoryreport = async (req: Request, res: Response) => {
  try {
    let storage = req.user!.storageId;
    const [rows] = await getCategotyreport(storage);
    res.json(rows);
  } catch (err) {
    logError(err);
  }
};
export {
  getsalesReport,
  getReportallProducts,
  getApiproductreport,
  getApicategoryreport,
};
