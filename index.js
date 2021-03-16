const mongoose = require('mongoose');

//Map global promise - to get  rid of warnings
//warnings pop-up becasue mongoose.promise has deprecated
mongoose.Promise = global.Promise;

//Connect to db
const db = mongoose.connect('mongodb+srv://root:root123@cluster0.ir7fw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})


//Import model
const Customer = require('./models/customer')

//Add customer
const addCustomer = (customer) => {
    Customer.create(customer).then((err,client) => {
        console.info('New customer added');
        mongoose.connection.close()
    });
}

//Find customer
const findCustomer = (name) => {
    //Make case insensitive
    const search = new RegExp(name, 'i');

    Customer.find({$or : [{firstname  : search}, {lastname : search}]})
    .then((customer,err) => {
        console.info(customer);
        console.info(`${customer.length} matches`);
        mongoose.connection.close()
    });


}

//Update Customer
const updateCustomer = (_id, customer) => {
    Customer.update({_id}, customer)
        .then(customer => {
                console.info('Customer updated');
                mongoose.connection.close();
            }
        )
}

//Remove Customer
const removeCustomer = (_id) => {
    Customer.remove({_id})
        .then(customer => {
                console.info('Customer removed');
                mongoose.connection.close();
            }
        )
}

//List Customers
const listCustomers = () => {
    Customer.find()
        .then(customers => {
            console.info(customers);
            console.info(`${customers.length} records found`);
            mongoose.connection.close();
        })
}

//Export methods
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}