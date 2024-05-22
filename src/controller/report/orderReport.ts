const logger = require('../../logs');
import { Request, Response } from 'express';
import {
  getOrderreport,
  getApiordersProduct,
  getOrderreportBydate,
  getOrderDayreportDay,
  getOrderDayreportMonth,
} from '../../service/report/orderReportService';

const getorderReport = (req: Request, res: Response) => {
  res.render('reports/orderReport', { data: req.user });
};

const getorderProducts = (req: Request, res: Response) => {
  res.render('reports/orderProduct', { data: req.user });
};
interface Idate {
  fromDate: string;
  toDate: string;
  day: string;
  month: string;
}

const getApiorderRreport = async (
  req: Request<{}, {}, {}, Idate>,
  res: Response
) => {
  try {
    let queryLength = Object.keys(req.query).length;
    let storage = req.user!.storageId;
    if (queryLength === 0) {
      const [rows] = await getOrderreport(storage);
      res.json(rows);
    } else if (queryLength == 1) {
      let query = Object.keys(req.query);
      if (query[0] == 'day') {
        const [rows] = await getOrderDayreportDay(req.query[query[0]], storage);
        res.json(rows);
      } else if (query[0] == 'month') {
        const [rows] = await getOrderDayreportMonth(
          req.query[query[0]],
          storage
        );
        res.json(rows);
      }
    } else {
      let fromDate = req.query.fromDate;
      let toDate = req.query.toDate;
      const [rows] = await getOrderreportBydate(fromDate, toDate, storage);
      res.json(rows);
    }
  } catch (err) {
    logger.logError(err);
  }
};

interface Orderrepo {
  id: string;
}

const getApiordersProductRreport = async (
  req: Request<{}, {}, {}, Orderrepo>,
  res: Response
) => {
  try {
    let id = req.query.id;
    const [rows] = await getApiordersProduct(id);
    res.json(rows);
  } catch (err) {
    logger.logError(err);
  }
};
export {
  getorderReport,
  getorderProducts,
  getApiorderRreport,
  getApiordersProductRreport,
};
