import { Request, Response } from 'express';
import { logger, logError } from '../../logs';
import {
  getStateQuery,
  getCityQuery,
} from '../../service/commonFunctions/commonFunctions';
import getCombos from '../../service/helper';
import path from 'path';
import fs from 'fs';

async function getState(req: Request, res: Response) {
  try {
    const stateArray = await getStateQuery();
    if (stateArray.length === 0) {
      return res.status(404).json({ message: 'Something Went Wrong' });
    } else {
      return res.status(200).json({ stateArray: stateArray });
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({ message: 'Something Went Wrong' });
  }
}

async function getCity(req: Request, res: Response) {
  try {
    const stateName = req.body;
    const cityArray = await getCityQuery(stateName.state);
    if (cityArray.length === 0) {
      return res.status(404).json({ message: 'Something  Went Wrong' });
    } else {
      return res.status(200).json({ cityArray: cityArray });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something Went Wrong' });
  }
}

async function getCombosDetails(req: Request, res: Response) {
  try {
    const name: string = req.body.key;
    const comboDetailsArray = await getCombos(name);
    if (comboDetailsArray.length > 0) {
      return res.status(200).json(comboDetailsArray);
    } else {
      return res.status(404).json({ message: 'Something Went Wrong' });
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({ message: 'Something Went Wrong' });
  }
}

//this function is use ful when user download pdf then pdf unlink
function unlinkProductPdf(pdfNameObject: { [key: string]: string }) {
  const pdfPath = path.join(
    __dirname,
    `../../public/uploads/${pdfNameObject.folderName}/${pdfNameObject.pdfName}`
  ); //path of pdf
  if (fs.existsSync(pdfPath)) {
    fs.unlinkSync(pdfPath);
  }
}

export { getState, getCity, getCombosDetails, unlinkProductPdf };
