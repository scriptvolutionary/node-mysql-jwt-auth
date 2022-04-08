const db = require('../models')
const User = db.user
const Op = db.Sequelize.Op

const getPagination = (page, size) => {
	const limit = size ? +size : 3
	const offset = page ? page * limit : 0

	return { limit, offset }
}

const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: user } = data
	const currentPage = page ? +page : 0
	const totalPages = Math.ceil(totalItems / limit)

	return { totalItems, user, totalPages, currentPage }
}

// find all users from db
exports.findAll = (req, res) => {
	const { page, size, username, _order } = req.query
	let condition = username ? { username: { [Op.like]: `%${username}%` } } : null

	const { limit, offset } = getPagination(page, size)

	User.findAndCountAll({
		limit,
		offset,
		where: condition,
		order: [
			['username', _order || 'ASC'],
			['createdAt', 'DESC'],
		],
	})
		.then(data => {
			const response = getPagingData(data, page, limit)
			res.send(response)
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving users.',
			})
		})
}

exports.allAccess = (req, res) => {
	res.status(200).send('Public Content.')
}

exports.userBoard = (req, res) => {
	res.status(200).send('User Content.')
}

exports.adminBoard = (req, res) => {
	res.status(200).send('Admin Content.')
}

exports.moderatorBoard = (req, res) => {
	res.status(200).send('Moderator Content.')
}
