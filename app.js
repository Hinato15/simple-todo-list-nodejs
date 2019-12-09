let express = require('express');
let cookieSession = require('cookie-session');
let bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({extended: false});

let app = express();

app.use(cookieSession({secret: 'todotopsecret'}))

let todosArray = [];


app.get('/todo', function (req, res) {
    res.render('todo.ejs')
})
.post('/todo/ajouter', urlencodedParser, function (req, res) {
    todosArray.push(req.body.newTodo);
    res.render('add.ejs', {todos: todosArray})
})
.post('/todo/supprimer/:id', function(req, res) {
    // supprime le todo correspondant
    todosArray.splice(req.params.id,1);
    // faire le render
    res.render('add.ejs', {todos: todosArray})
})




app.listen(8080);