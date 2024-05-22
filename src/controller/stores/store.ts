import { checkLogin } from '../login/login';
import { logger, logError } from '../../logs';
import {
  insertStoreQuery,
  getStoreQuery,
  updateStoreQuery,
  deleteStoreQuery,
  checkStoreExistQuery,
  storeProductQuery,
  deleteStoreProductQuery,
} from '../../service/stores/store';
import { Request, Response } from 'express';
export interface Istore {
  storageName: string;
  storeType: string;
  state: string;
  city: string;
  storeId: number;
}

async function insertStore(req: Request, res: Response) {
  try {
    const storeDetails: Istore = req.body;

    // console.log(storeDetails);
    await insertStoreQuery(storeDetails);
    return res.json({ status: 200 });
  } catch (error) {
    // return res.status(500).json({ message: 'Unable to insert' });
  }
}

async function getStorePage(req: Request, res: Response) {
  res.render('stores/store', { data: req.user });
}

async function getStore(req: Request, res: Response) {
  try {
    const storeDetails = await getStoreQuery();

    return res.status(200).json(storeDetails);
  } catch (error) {
    return res.status(404).json({ message: "Can't get stores" });
  }
}
interface storeI {
  storeId?: string;
}

async function getParticularStore(
  req: Request<{}, {}, {}, storeI>,
  res: Response
) {
  try {
    const queryString = req.query;
    // logger.info(queryString.customerId);
    const storeDetail = await checkStoreExistQuery(queryString.storeId);
    if (storeDetail.length !== 0) {
      return res.status(200).json(storeDetail);
    } else {
      return res.status(404).json({ message: 'Store Not Found' });
    }
  } catch (error) {
    // console.log(error)
    res.status(500).json({ message: 'Something Went Wrong' });
  }
}

async function updateStore(req: Request, res: Response) {
  try {
    const storeDetails: Istore = req.body;
    const updateStoreStatus = await updateStoreQuery(
      storeDetails,
      storeDetails.storeId
    );

    if (updateStoreStatus) {
      return res.status(200).json({ message: 'Store Updated' });
    } else {
      return res.status(404).json({ message: 'Something went wrong' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update' });
  }
}
interface storeId1 {
  storeId?: string;
}

async function deleteStore(req: Request<{}, {}, {}, storeId1>, res: Response) {
  try {
    const storeId = req.query.storeId;
    await deleteStoreQuery(storeId);
    // window.location.reload('/store');
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete' });
  }
}
interface storedelp {
  storeId?: string;
  productId?: string;
}
async function deleteStoreProduct(
  req: Request<{}, {}, {}, storedelp>,
  res: Response
) {
  try {
    const storeId = req.query.storeId;
    const productId = req.query.productId;
    await deleteStoreProductQuery(storeId, productId);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete' });
  }
}

async function filterStore(req: Request, res: Response) {
  try {
  } catch (error) {}
}
interface store {
  id?: string;
}
async function storeProducts(req: Request<{}, {}, {}, store>, res: Response) {
  const storeId = req.query.id;
  const storeDetails = await storeProductQuery(storeId);
  return res.json(storeDetails);
}

async function detailsStore(req: Request, res: Response) {
  const data = req.user;
  res.render('stores/warehouseDetails', { data });
}

export {
  detailsStore,
  insertStore,
  getStore,
  getStorePage,
  updateStore,
  deleteStore,
  getParticularStore,
  filterStore,
  storeProducts,
  deleteStoreProduct,
};
