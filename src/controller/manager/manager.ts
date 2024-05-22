import { Request, Response } from 'express';
import { logger, logError } from '../../logs';
import {
  cityComboService,
  deleteManagerService,
  getPerticularManagerService,
  storeComboServices,
  insertManagerDetail,
  checkManagerService,
  listManagersService,
  updateManagerService,
  insertManagerService,
} from '../../service/manager/manager';
import { Manager, UpdateManager } from '../../types/manager/maanger';

const getCityCombo = async (req: Request, res: Response) => {
  try {
    const result = await cityComboService();
    if (result.length === 0) {
      return res.status(404).json({ message: 'Something Went Wrong' });
    } else {
      return res.status(200).json({ result: result });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};

const getStoreCombo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await storeComboServices(id);
    if (result.length === 0) {
      return res.status(404).json({ message: 'data not found' });
    } else {
      return res.status(200).json({ result: result });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};

const getManager = async (req: Request, res: Response) => {
  res.render('manager/manager', { data: req.user });
};

// declare global {
//   namespace Express {
//     interface User {
//       id: number;
//       roleId: number;
//       storageId: number | null;
//       dp: File | null;
//     }
//   }
// }
const manageManager = async (req: Request, res: Response) => {
  try {
    const manager: Manager = req.body;
    const result1 = await checkManagerService(manager);
    if (result1.length) {
      return res.status(409).send('already exist');
    } else {
      try {
        const otp = Math.floor(Math.random() * 1000000000000 + 1);

        const result2 = await insertManagerService(otp, manager);
        const managerDetails = await insertManagerDetail(result2, manager);
        return res.status(200).send('manager add');
      } catch (error) {
        logError(error);
        return res.status(500).json({ message: 'can`t fetch user controller' });
      }
    }
  } catch (error) {
    logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};

interface abc {
  status?: string;
  order?: string;
  field?: string;
}

const listManagers = async (req: Request<{}, {}, {}, abc>, res: Response) => {
  try {
    let status = req.query.status || 'Active';
    let order = req.query.order || 'asc';
    let field = req.query.field || 'id';
    const result = await listManagersService(status, order, field);
    return res.status(200).json(result);
  } catch (error) {
    logError(error);
    return res.status(500).json({ message: 'can`t fetch user controller' });
  }
};

const updateManager = async (req: Request, res: Response) => {
  try {
    // const checkManger = await checkUpdateManagerService(req.body);
    // if (checkManger.length) {
    //   return res.status(409).send('already exist');
    // } else {
    try {
      // const changeEmail = await changeEmailService(req.body);
      const updateManager: UpdateManager = req.body;
      const otp = Math.floor(Math.random() * 1000000000000 + 1);
      const result1 = await updateManagerService(otp, updateManager);
      return res.status(200).send('manager add');
    } catch (error) {
      logError(error);
      return res.status(500).json({ message: 'can`t fetch user controller' });
    }
    // }
  } catch (error) {
    logError(error);
    return res.status(500).json({ message: 'can`t fetch user controller' });
  }
};

const getPerticularManager = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const manager = await getPerticularManagerService(id);
    if (manager.length !== 0) {
      return res.status(200).json(manager);
    } else {
      return res.status(404).json({ message: 'Manager not found' });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};

const deleteManager = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await deleteManagerService(id);
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Manager is deleted' });
    } else {
      return res.status(404).json({ message: 'error' });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({ message: 'can`t fetch user controller' });
  }
};

export {
  getCityCombo,
  deleteManager,
  getStoreCombo,
  manageManager,
  getManager,
  listManagers,
  updateManager,
  getPerticularManager,
};
