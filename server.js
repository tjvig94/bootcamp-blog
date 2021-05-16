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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

sequelize.sync({ force: false, alter: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
}).catch(err => console.log(err));
