const { checkLogin } = require('../../middleware/auth');
const {
	insertStoreQuery,
	getStoreQuery,
	updateStoreQuery,
	deleteStoreQuery

} = require('../../service/stores/store');

async function insertStore(req, res) {
	try {
		const storeDetails = req.body;
		await insertStoreQuery(storeDetails);
		res.redirect("/store");
	} catch (error) {
		return res.status(500).json({ message: 'Unable to insert' });
	}
}

async function getStore(req, res) {
	try {
		const storeDetails = await getStoreQuery();
		res.render('stores/store', { storeDetails });

	} catch (error) {
		return res.status(404).json({ message: "Can't get stores" });
	}
}

async function updateStore(req, res) {
	try {
		const name = req.params.name;
		await updateStoreQuery([name], req.body);
		return res.status(200).json({ message: 'Store Updated' });
	} catch (error) {
		return res.status(500).json({ message: 'Unable to update' });
	}
}

async function deleteStore(req, res) {
	try {
		const name = req.params.name;
		await deleteStoreQuery([name]);
		return res.status(200).json({ message: 'Store Deleted' });
	} catch (error) {
		return res.status(500).json({ message: 'Unable to delete' });
	}
}

module.exports = { insertStore, getStore, updateStore, deleteStore };
