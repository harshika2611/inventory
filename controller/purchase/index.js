const {
	createPurchaseOrder,
	getAllSuppliers,
	getAllProducts,
	getAllWarehouses,
	addProductInPurchaseOrder,
	fetchPurchaseOrder,
	updatePurchaseOrder,
	updateProductInPurchaseOrder,
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

async function fetchOrderDetails(req, res) {
	try {
		const finalResponse = {};
		const response = await fetchPurchaseOrder({ id: req.params.id });

		if (response.length > 0) {
			finalResponse.purchaseId = response[0].id;
			finalResponse.purchaseName = response[0].name;
			finalResponse.date = response[0].date;
			finalResponse.supplierId = response[0].supplier_id;
			finalResponse.amount = response[0].amount;
			finalResponse.paymentStatus = response[0].payment_status;
			finalResponse.products = [];

			response.forEach((obj) => {
				finalResponse.products.push({
					purchaseProductId: obj.product_purchase_id,
					productId: obj.product_id,
					unitPrice: obj.unit_price,
					quantity: obj.quantity,
				});
			});
		}

		res.json(finalResponse);
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

async function updatePurchase(req, res) {
	try {
		res.json(await updatePurchaseOrder(req.body));
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

async function updateProductPurchase(req, res) {
	try {
		res.json(await updateProductInPurchaseOrder(req.body));
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
	fetchOrderDetails,
	updatePurchase,
	updateProductPurchase,
};
