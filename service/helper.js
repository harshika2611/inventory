const connection = require('../config/connection');
const logError = require('../logs.js').logError;

async function getCombos(name) {
	try {
		const [results] = await connection.execute(
			`
        SELECT
            s.id, o.id as opt_id, o.value
        FROM
            select_master AS s
                INNER JOIN
            option_master AS o ON s.id = o.select_id
        WHERE
            s.value LIKE ?
    `,
			[name]
		);
		return [results];
	} catch (error) {
		logError(error);
		return [];
	}
}

module.exports = { getCombos };
