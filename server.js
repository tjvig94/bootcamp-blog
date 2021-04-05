const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: false, alter: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
}).catch(err => console.log(err));