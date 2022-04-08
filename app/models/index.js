const dbConfig = require('../config/db.config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
	dbConfig.DB,
	dbConfig.DB_USER,
	dbConfig.DB_PASSWORD,
	{
		host: dbConfig.DB_HOST,
		dialect: dbConfig.dialect,
		// operatorsAliases: false,

		pool: {
			max: dbConfig.pool.max,
			min: dbConfig.pool.min,
			acquire: dbConfig.pool.acquire,
			idle: dbConfig.pool.idle,
		},
	}
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('../models/user.model')(sequelize, Sequelize)
db.role = require('../models/role.model')(sequelize, Sequelize)
db.refreshToken = require('../models/refreshToken.model.js')(
	sequelize,
	Sequelize
)

db.role.belongsToMany(db.user, {
	through: 'user_roles',
	foreignKey: 'roleId',
	otherKey: 'userId',
})

db.user.belongsToMany(db.role, {
	through: 'user_roles',
	foreignKey: 'userId',
	otherKey: 'roleId',
})

db.refreshToken.belongsTo(db.user, {
	foreignKey: 'userId',
	targetKey: 'id',
})
db.user.hasOne(db.refreshToken, {
	foreignKey: 'userId',
	targetKey: 'id',
})

db.ROLES = ['user', 'admin', 'moderator']

module.exports = db
