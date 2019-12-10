const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({extended: false});

let app = express();

app.use(cookieSession({
    name: 'session',
    keys: ['todolistjs'],
    maxAge: 24 * 60 *60 * 1000
}))

.use(function(req, res, next) {
    if(typeof(req.session.todoList) == 'undefined') {
        req.session.todoList = [];
    }
    next();
})


app.get('/todo', function (req, res) {
    res.render('add.ejs', {todoList: req.session.todoList});
})
.post('/todo/ajouter', urlencodedParser, function (req, res) {
   if(req.body.newTodo != '') {
       req.session.todoList.push(req.body.newTodo);
   }
    res.redirect('/todo');
})
.get('/todo/supprimer/:id', function(req, res) {
    if(req.params.id !='') {
        req.session.todoList.splice(req.params.id, 1);
    }
   res.redirect('/todo');
})

.use(function(req, res) {
    res.redirect('/todo');
})

.listen(8080);