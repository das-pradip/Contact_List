const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('assets'));


// middleware1
// app.use(function(req, res, next){
//   req.myName = "RAVI"
//    console.log('middleware 1 called');
//    next();
// });

// middleware2
// app.use(function(req, res, next){
// console.log('My name from MW2 ', req.myName);
//    console.log('middleware 2 called');
//    next();
// });


var contactList = [
    {
        name: "Pradip",
        phone: 6204143493
    },
    {
        name: "Arpan",
        phone: "8808284242"
    },
    {
        name: "Elon Musk",
        phone: "8998948882"
    }
]


app.get('/', function (req, res) {
    // console.log(__dirname);
    //  res.send('<h1>Cool, it is running! or is it?</h1>');


    // console.log('from the get route controller', req.myName);
     

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home', {
            title: "Contacts List",
            contact_list: contacts
        });
    });
   

});


app.get('/practice', function (req, res) {
    // console.log(__dirname);
    //  res.send('<h1>Cool, it is running! or is it?</h1>');

    return res.render('practice', {
        title: "Let us play eith ejs"
    });
});


app.post('/create-contact', function (req, res) {
    // console.log(req);
    //   return res.redirect('/practice');
    // console.log(req.body);
    // console.log( req.body.name);
    // console.log(req.body.phone);

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });


    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
        console.log('error in creating a contact!');
            return;
        }

        console.log('*******', newContact);
        return res.redirect('back');
    });

    // return res.redirect('back');

});


// for deleting a contact
app.get('/delete-contact', function(req, res){
    //get the id from query in the ul
    let id = req.query.id;

    //
    // console.log(req.params);
    // let phone = req.params.phone;


    // get the query from the url
    // console.log(req.query);
    // let phone = req.query.phone;


    // find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err){
       if(err){
           console.log('error in deleting an object from database')
           return;
       }

       return res.redirect('back');

    });
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
     
    // if (contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // } 
})

app.listen(port, function (err) {
    if (err) {
        console.log('Error is running the server', err);
    }

    console.log('Yup!My Express Server is running on port:', port);
});

