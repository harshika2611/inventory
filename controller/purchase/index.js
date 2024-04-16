const {
	createPurchaseOrder,
	getAllSuppliers,
	getAllProducts,
	getAllWarehouses,
	addProductInPurchaseOrder,
} = require('../../service/purchase');
const { getCombos } = require('../../service/helper');

async function fetchCombos(req, res) {
	try {
		res.json(await getCombos(req.params.name));
	} catch (error) {
		res.json({ error });
	}
}

async function fetchSuppliers(_, res) {
	try {
		res.json(await getAllSuppliers());
	} catch (error) {
		res.json({ error });
	}
}

async function fetchProducts(_, res) {
	try {
		res.json(await getAllProducts());
	} catch (error) {
		res.json({ error });
	}
}

async function fetchWarehouses(_, res) {
	try {
		res.json(await getAllWarehouses());
	} catch (error) {
		res.json({ error });
	}
}

async function showPurchases(req, res) {
	res.render('purchase');
}

async function createPurchase(req, res) {
	try {
		res.json(await createPurchaseOrder(req.body));
	} catch (error) {
		res.json({ error });
	}
}

async function createProductPurchase(req, res) {
	try {
		res.json(await addProductInPurchaseOrder(req.body));
	} catch (error) {
		res.json({ error });
	}
}

module.exports = {
	showPurchases,
	createPurchase,
	fetchCombos,
	fetchSuppliers,
	fetchProducts,
	fetchWarehouses,
	createProductPurchase,
};
