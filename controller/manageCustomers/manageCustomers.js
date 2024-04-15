const {
	insertCustomerQuery,
	getCustomersQuery,
	updateCustomerQuery,
	deleteCustomerQuery,
} = require('../../service/manageCustomers/manageCustomers.js');

async function insertCustomer(req, res) {
	try {
		/**if this will send from frontend js then form data
		 * either post request then key value pair key is name in form */
		const customerDetails = req.body;
		await insertCustomerQuery(customerDetails);
		return res.status(200).json({ message: 'Customer Inserted' });
	} catch (error) {
		return res.status(500).json({ message: 'Unable to insert' });
	}
}

async function getCustomers(req, res) {
	try {
		const customersDetails = await getCustomersQuery();
		return res.render('manageCustomers/manageCustomers', {
			customersDetails: customersDetails
		});
		// return res.status(200).json({ data: customersDetails });
	} catch (error) {
		return res.status(404).json({ message: "Can't get customers" });
	}
}

async function updateCustomer(req, res) {
	try {
		const customerDetails = req.body;
		const updateCustomerStatus = await updateCustomerQuery(
			customerId,
			customerDetails
		);

		if (updateCustomerStatus) {
			return res.status(200).json({ message: 'Customer Updated' });
		} else {
			return res.status(404).json({ message: 'Something went wrong' }); //customer not exist
		}
	} catch (error) {
		return res.status(500).json({ message: 'Unable to update' });
	}
}

async function deleteCustomer(req, res) {
	try {
		const customerId = req.params.id;
		await deleteCustomerQuery(customerId);
		return res.status(200).json({ message: 'Customer Deleted' });
	} catch (error) {
		return res.status(500).json({ message: 'Unable to delete' });
	}
}

async function filterCustomer(req, res) {
	try {
	} catch (error) { }
}
module.exports = {
	insertCustomer,
	updateCustomer,
	getCustomers,
	deleteCustomer,
	filterCustomer,
};
