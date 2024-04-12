const {
	insertStoreQuery,
	getStoreQuery,
	updateStoreQuery,
	deleteStoreQuery

} = require('../../service/stores/store');

async function insertStore(req, res) {
	try {
		/**if this will send from frontend js then form data
		 * either post request then key value pair key is name in form */

		const storeDetails = req.body;
		// console.log(storeDetails);
		await insertStoreQuery(storeDetails);
		// return res.status(200).json({ message: 'Store Inserted' });
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
		const storeDetails = req.body;
		const updateStoreStatus = await updateStoreQuery(
			'name',
			storeDetails
		);

		if (updateStoreStatus) {
			return res.status(200).json({ message: 'Store Updated' });
		} else {
			return res.status(404).json({ message: 'Something went wrong' });
		}
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
