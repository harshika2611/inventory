import { Request, Response } from 'express';
import { logger, logError } from '../../logs';
import {
  insertCustomerQuery,
  getCustomersQuery,
  checkCustomerExistQuery,
  updateCustomerQuery,
  deleteCustomerQuery,
  reactivateCustomerQuery,
} from '../../service/manageCustomers/manageCustomers';

import { getCityStateId } from '../../service/commonFunctions/commonFunctions';

async function insertCustomer(req: Request, res: Response) {
  try {
    /**if this will send from frontend js then form data
     * either post request then key value pair key is name in form */
    const customerDetails: customerDetail = req.body;

    await insertCustomerQuery(customerDetails);
    return res.status(200).json({ message: 'Customer Inserted' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to insert' });
  }
}

async function getCustomersPage(req: Request, res: Response) {
  return res.render('manageCustomers/manageCustomers', { data: req.user });
}

async function getAllCustomers(req: Request, res: Response) {
  try {
    const customerStatus = req.params.status;
    const customersDetails = await getCustomersQuery(customerStatus);
    return res.status(200).json(customersDetails);
  } catch (error) {
    //here render error page
    logError(error);
    return res.status(404).json({ message: "Can't get customers" });
  }
}

async function getParticularCustomer(
  req: Request<{}, {}, {}, customer>,
  res: Response
) {
  try {
    const queryString = req.query;
    // info(queryString.customerId);
    if (!queryString.customerId) {
      return res.redirect('/manageCustomers');
    }
    const customerDetail = await checkCustomerExistQuery(
      queryString.customerId
    );
    if (customerDetail.length !== 0) {
      return res.status(200).json(customerDetail);
    } else {
      return res.status(404).json({ message: 'Something Went Wrong' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something Went Wrong' });
  }
}
export interface customerDetail {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  address: string;
  zipcode: string;
  state: string;
  city: string;
  customerId: string;
}
async function updateCustomer(req: Request, res: Response) {
  try {
    const customerDetails: customerDetail = req.body;

    const cityStateIdArray = await getCityStateId(
      customerDetails.state,
      customerDetails.city
    );

    //----city, state id store
    let cityId = cityStateIdArray[0].city_id;
    let stateId = cityStateIdArray[0].state_id;
    customerDetails.city = cityId.toString();
    customerDetails.state = stateId.toString();

    const updateCustomerStatus = await updateCustomerQuery(customerDetails);

    if (updateCustomerStatus) {
      return res.status(200).json({ message: 'Customer Updated' });
    } else {
      return res.status(404).json({ message: 'Something went wrong' }); //customer not exist
    }
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update' });
  }
}
export interface customer {
  customerId?: string;
}
async function deleteCustomer(
  req: Request<{}, {}, {}, customer>,
  res: Response
) {
  try {
    const customerId = req.query.customerId;

    if (!customerId) {
      return res.redirect('/manageCustomers');
    }
    const responseObject = await deleteCustomerQuery(customerId);
    if (responseObject.affectedRows > 0) {
      return res.status(200).json({ message: 'Customer Deleted' });
    } else {
      return res.status(404).json({ message: 'Something Went Wrong' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete' });
  }
}

async function reactivateCustomer(
  req: Request<{}, {}, {}, customer>,
  res: Response
) {
  try {
    const customerId = req.query.customerId;

    if (!customerId) {
      return res.redirect('/manageCustomers');
    }
    const responseObject = await reactivateCustomerQuery(customerId);
    if (responseObject.affectedRows > 0) {
      return res.status(200).json({ message: 'Customer Reactivate' });
    } else {
      return res.status(404).json({ message: 'Something Went Wrong' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Unable to reactivate' });
  }
}

export {
  insertCustomer,
  updateCustomer,
  getCustomersPage,
  getAllCustomers,
  getParticularCustomer,
  deleteCustomer,
  reactivateCustomer,
};
