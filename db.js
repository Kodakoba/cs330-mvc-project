const path = require('path');
const { PrismaClient } = require('prisma');

module.exports = new PrismaClient({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'userInfo.sqlite')
});

