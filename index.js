const Joi = require('joi');
const logger = require('./logger');
const authenticat = require('./authenticat');
const express = require('express');
const app = express();

// intializes req.body object
app.use(express.json());

app.use(logger);

app.use(authenticat);

const port = process.env.PORT || 3000;

const courses = [
    { id: 1, name: "Math"},
    { id: 2, name: "chem"},
    { id: 3, name: "Phy"}
];

app.get('/', (req, res) => {
    res.send('Hello world!')
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req,res) => {
    const { error } = validateCourse(req.body);
if(error){
    return res.status(400).send(result.error.details[0].message);
}
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req,res)=> {
//lookup, if not existing, return 404
const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course) return res.status(404).send("The request object is not found!")

//validate, if bad request return 400

const { error } = validateCourse(req.body);
if(error) return res.status(400).send(result.error.details[0].message);
//else update it.
course.name = req.body.name;
res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The request object is not found!");
    //validate, if bad request return 400
    const index = courses.indexOf(course);
    courses.splice(index, 1);


    //else update it.
    res.send(course);
});












app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The request object is not found!")
    res.send(course);
});














app.listen(3000, () => {console.log(`Listening on port ${port}`)
});