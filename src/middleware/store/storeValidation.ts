import { NextFunction, Request, Response } from 'express';

const logger = require('../../logs.js');

function storeValidation(req: Request, res: Response, next: NextFunction) {
  const storeDetails = req.body;

  let storeFormErrorObject: { [key: string]: string } = {};

  for (let key in storeDetails) {
    switch (key) {
      case 'storageName':
        if (!storeDetails[key]) {
          storeFormErrorObject[key] = '* require';
        } else if (
          storeDetails[key].trim().length === 0 &&
          storeDetails[key] !== ''
        ) {
          storeFormErrorObject[key] = '* Please Enter storageName';
        } else {
          delete storeFormErrorObject[key];
        }
        break;

      case 'storeType':
        if (storeDetails[key] === 'warehouse') {
          storeFormErrorObject[key] = '* require';
        } else {
          delete storeFormErrorObject[key];
        }
        break;

      case 'state':
        if (storeDetails[key] === 'Select State') {
          storeFormErrorObject[key] = '* require';
        } else {
          delete storeFormErrorObject[key];
        }
        break;

      case 'city':
        if (storeDetails[key] === 'Select City') {
          storeFormErrorObject[key] = '* require';
        } else {
          delete storeFormErrorObject[key];
        }
        break;
    }
  }

  if (Object.keys(storeFormErrorObject).length === 0) {
    next();
  } else {
    return res.status(400).json(storeFormErrorObject);
  }
}

export default storeValidation;
