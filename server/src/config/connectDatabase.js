const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize('magicpost', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('succesfully');

    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDatabase