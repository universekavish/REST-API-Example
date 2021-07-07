const express = require('express'); //import express
const { required } = require('joi');
const Joi = require('joi');
const joi = require('joi'); //import joi
const app = express(); //create express application on the app variable
app.use(express.json()); // used the json file

//Give data to the server
const customers = [
    {title: 'Kavish', id: 1},
    {title: 'Mayank', id: 2},
    {title: 'Vibhor', id: 3},
    {title: 'Shivam', id: 4},
    {title: 'Sameer', id: 5}
]

// Read Request Handlers
// Display the Messages then the URL consist of '/'
app.get('/', (req,res) => {
    res.send('Welcome to Kavishs REST API');
});
//Display the list of customers when URL consists of api customers
app.get('/api/customers', (req,res) => {
    res.send(customers);
});
//Display the information of specific customers when you mention the id
app.get('/api/customers/:id', (req,res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    // if there is no valid customer id , then display an error with the following message
    if (!customer) res.status(404).send('<h2 style="font-family: Malgum Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    res.send(customer);
});

// CREATE Request Handler
// CREATE New Customer Information
app.post('/api/customers', (req,res) => {

    const { error } = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    // Increment the customer id
    const customer = {
        id: customers.length + 1,
        title: req.body.title
    };
    customers.push(customer);
    res.send(customer);
});

// UPDATE Request Handler
// UPDATE Existing Customer Information 
app.put('api/customers/:id', (req,res) => {
    const customer = customers.find(c=> c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('<h2 style="font-family: Malgum Gothic; color: darkred;">Not Found!</h2>');

    const { error } = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0],message);
        return;
    }
    customer.title = req.body.title;
    res.send(customer);
});

// DELETE Request Handler
// DELETE Customer Details
app.delete('/api/cusomers/:id', (req,res) => {
    const cusomer = customers.find(c=>c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('<h2 style="font-family: Malgum Gothic; color: darkred;">Not Found!</h2>');

    const index = customers.indexOf(customer);
    customers.splice(index,1);

    res.send(customer);
})

// Validate Information
function validateCustomer(customer) {
    const schema = {
        title: Joi.string().min(3)/required()
    };
    return Joi.validate(customer, schema);
}

// PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));