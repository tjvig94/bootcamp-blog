const seedUsers = require('./userseed');
const seedPosts = require('./postseed');
const seedComments = require('./commentseed');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();
    process.exit(0);
};

seedAll();
