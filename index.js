const config = require('config');
const morgan = require('morgan');
const Joi = require('joi');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const courses = require('./routs/courses');
const home = require('./routs/home');
const authenticat = require('./authenticat');
const express = require('express');
const app = express();


// intializes req.body object
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use(authenticat);
app.use('/api/courses', courses);

//configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));


if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

const port = process.env.PORT || 3000;



app.listen(3000, () => {console.log(`Listening on port ${port}`)
});