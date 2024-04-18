const logger = require("../../logs.js");
const {
  checkUpdateManagerService,
  getPerticularManagerService,
  storeComboServices,
  insertManagerDetail,
  checkManagerService,
  listManagersService,
  updateManagerService,
  insertManagerService,
} = require("../../service/manager/manager");

const getStoreCombo = async (req, res) => {
  try {
    const result = await storeComboServices();
    if (result.length === 0) {
      return res.status(404).json({ message: "Something Went Wrong" });
    } else {
      return res.status(200).json({ result: result });
    }
  } catch (error) {
    logger.logError(error);
    res.status(500).json({ message: "can`t fetch user controller" });
  }
};

const getManager = async (req, res) => {
  res.render("manager/manager");
};

const manageManager = async (req, res) => {
  try {
    const result1 = await checkManagerService(req.body);
    console.log(result1, "gottt");
    if (result1.length > 0) {
      const msg = "already added manager";
      res.status(409).send("already exist");
    } else {
      try {
        const otp = Math.floor(Math.random() * 1000000000000 + 1);
        const result2 = await insertManagerService(otp, req.body);
        const managerDetails = await insertManagerDetail(result2, req.body);
        res.status(200).send("maanger add");
      } catch (error) {
        logger.logError(error);
        res.status(500).json({ message: "can`t fetch user controller" });
      }
    }

    // const manager = await insertManagerService();
  } catch (error) {
    logger.logError(error);
    res.status(500).json({ message: "can`t fetch user controller" });
  }
};

const listManagers = async (req, res) => {
  try {
    const result = await listManagersService();
    for (let iterator of result) {
      const created_at = iterator.Created;
      const updated_at = iterator.Updated;

      if (created_at === updated_at) {
        iterator.Updated = "-";
      }
    }
    return res.status(200).json(result);
  } catch (error) {
    logger.logError(error);
    res.status(500).json({ message: "can`t fetch user controller" });
  }
};

const updateManager = async (req, res) => {
  try {
    console.log(req.body, "updatedd");
    const checkManger = await checkUpdateManagerService(req.body);
    console.log(checkManger, checkManger.length, "ansss");
    if (checkManger.length) {
      const msg = "already added manager";
      return res.status(409).send("already exist");
    } else {
      try {
        const otp = Math.floor(Math.random() * 1000000000000 + 1);
        const result1 = await updateManagerService(otp, req.body);
        res.status(200).send("maanger add");
      } catch (error) {
        logger.logError(error);
        res.status(500).json({ message: "can`t fetch user controller" });
      }
    }
  } catch (error) {
    logger.logError(error);
    res.status(500).json({ message: "can`t fetch user controller" });
  }
};

const insertManager = async (req, res) => {
  try {
  } catch (error) {
    logger.logError(error);
    res.status(500).json({ message: "can`t fetch user controller" });
  }
};
const getPerticularManager = async (req, res) => {
  try {
    const id = req.params.id;
    const manager = await getPerticularManagerService(id);
    if (manager.length !== 0) {
      return res.status(200).json(manager);
    } else {
      return res.status(404).json({ message: "Manager not found" });
    }
  } catch (error) {
    logger.logError(error);
    res.status(500).json({ message: "can`t fetch user controller" });
  }
};

const deleteManager = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.params, "delete");
  } catch (error) {
    logger.logError(error);
    res.status(500).json({ message: "can`t fetch user controller" });
  }
};

module.exports = {
  deleteManager,
  getStoreCombo,
  manageManager,
  getManager,
  listManagers,
  updateManager,
  insertManager,
  getPerticularManager,
};
