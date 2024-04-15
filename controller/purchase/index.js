const {
  createPurchaseOrder,
  getAllSuppliers,
} = require("../../service/purchase");
const { getCombos } = require("../../service/helper");

async function fetchCombos(req, res) {
  try {
    res.json(await getCombos(req.params.name));
  } catch (error) {
    res.json({ error });
  }
}

async function fetchSuppliers(req, res) {
  try {
    res.json(await getAllSuppliers(req.params.name));
  } catch (error) {
    res.json({ error });
  }
}

async function showPurchases(req, res) {
  res.render("purchase");
}

async function createPurchase(req, res) {
  try {
    res.json(await createPurchaseOrder(req.body));
  } catch (error) {
    res.json({ error });
  }
}

module.exports = { showPurchases, createPurchase, fetchCombos, fetchSuppliers };
