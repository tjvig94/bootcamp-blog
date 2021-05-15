const { User } = require('../models');

const userData = [
    {
        name: "Tim",
        email: "tjvig94@gmail.com",
        password: "password"
    },
    {
        name: "Tracey",
        email: "traceyvigneau@gmail.com",
        password: "password"
    },
    {
        name: "Sam",
        email: "samisdumb@gmail.com",
        password: "password"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
