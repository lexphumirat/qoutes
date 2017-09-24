const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;
const app = express();


mongoose.connect('mongodb://localhost/user_qoute');
var UserSchema = new mongoose.Schema({
    name: String,
    qoute: String
})
mongoose.model('User', UserSchema);
var User = mongoose.model('User')

app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;

app.get('/', function(request, response) {
    response.render('index');
});

app.post('/qoutes', function(request, response){
    console.log('POST DATA', request.body);
    var user = new User({name: request.body.name, qoute: request.body.qoute});
    user.save(function(err){
        if(err){
            console.log('something went wrong');
        } else {
            console.log('successfully added a user');
            response.redirect('/');
        }
    })
})

// app.get('/qoute', function(request, response){
//     const showall = User.find({}, function(err, users){
//         if(err){
//             console.log('can\'t find all');
//         } else {
//             console.log('found it');
//             console.log(showall);
//             response.render('qoutes.ejs', { data: showall });
//         }
//     })
//
//
// })


// app.get('/qoute' , function(request, response){
//     User.find({}).then(function(users){
//         if(err){}
//     })
// })

app.get('/qoute', function(request, response){
    User.find({}).then(function(users){
        console.log(users);
        response.render('qoutes.ejs', { data: users});
    }).catch(function(err){
        console.log('there was an error');
    })
})


app.listen(port, () => console.log('listen on port 8000 ${ port }'));

// app.listen(8000, function(){
//     console.log('Listening on port 8000');
// })
