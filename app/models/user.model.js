module.exports = (sequelize, Sequelize) => {
	const user = sequelize.define('users', {
		username: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		},
	})

	return user
}
