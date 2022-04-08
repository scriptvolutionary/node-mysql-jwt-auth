module.exports = {
	DB_HOST: 'localhost',
	DB_USER: 'root',
	DB_PASSWORD: '',
	DB: 'taskedd_db',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
}
