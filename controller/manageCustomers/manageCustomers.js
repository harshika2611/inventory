const logger = require('../../logs.js');
const {
	insertCustomerQuery,
	getCustomersQuery,
	checkCustomerExistQuery,
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
		// logger.info(customersDetails[1]);

		for (let element of customersDetails) {
			const created_at = element.Created;
			const updated_at = element.Updated;

			if (created_at === updated_at) {
				element.Updated = "-"
			}
			// let createdDate = new Date(created_at).getDate();
			// let createdMonth = new Date(created_at).getMonth() + 1;
			// let createdYear = new Date(created_at).getFullYear();
			// let createdHour = new Date(created_at).getHours();
			// let createdMinute = new Date(created_at).getMinutes();
			// let createdSecond = new Date(created_at).getSeconds();
			// let createFullDate = `${createdDate}-${createdMonth}-${createdYear} ${createdHour}:${createdMinute}:${createdSecond}`
			// element.Createdate = createFullDate;
		}

		return res.render('manageCustomers/manageCustomers', {
			customersDetails: customersDetails
		});
		// return res.status(200).json({ data: customersDetails });
	} catch (error) {
		//here render error page
		logger.logError(error);
		return res.status(404).json({ message: "Can't get customers" });
	}
}

async function getParticularCustomer(req, res) {
	try {
		const queryString = req.query;
		// logger.info(queryString.customerId);
		const customerDetail = await checkCustomerExistQuery(queryString.customerId);
		logger.info(customerDetail);
		if (customerDetail.length !== 0) {
			return res.status(200).json(customerDetail);
		} else {
			return res.status(404).json({ message: "Customer Not Found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Something Went Wrong" });
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
	getParticularCustomer,
	deleteCustomer,
	filterCustomer,
};
