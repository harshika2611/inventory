const {
	createPurchaseOrder,
	getAllSuppliers,
} = require('../../service/purchase');
const { getCombos } = require('../../service/helper');

async function fetchCombos(req, res) {
	try {
		res.send(await getCombos(req.params.name));
	} catch (error) {
		res.send({ error });
	}
}

async function fetchSuppliers(req, res) {
	try {
		res.send(await getAllSuppliers(req.params.name));
	} catch (error) {
		res.send({ error });
	}
}

async function showPurchases(req, res) {
	res.render('purchase');
}

async function createPurchase(req, res) {
	try {
		res.send(await createPurchaseOrder(req.body));
	} catch (error) {
		res.send({ error });
	}
}

module.exports = { showPurchases, createPurchase, fetchCombos, fetchSuppliers };
