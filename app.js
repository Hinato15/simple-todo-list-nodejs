let express = require('express');
let session = require('cookie-session');
let bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({extended: false});

let app = express();

app.use(session({secret: 'todotopsecret'}))

let todosArray = [];


app.get('/todo', function (req, res) {
    res.render('todo.ejs')
})
.post('/todo/ajouter', urlencodedParser, function (req, res) {
    todosArray.push(req.body.newTodo);
    res.render('add.ejs', {todos: todosArray})
})
.get('/todo/supprimer/:id', function(req, res) {

})




app.listen(8080);