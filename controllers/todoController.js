var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://todo:todo@cluster0-jfrr8.mongodb.net/test?retryWrites=true');

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({ item: 'buy flowers' }).save(function(err) {
//     if (err) throw err;
//     console.log('item saved');
// })

// var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'kick some coding ass' }]
module.exports = function(app) {
    app.get('/todo', function(req, res) {
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data })
        })
    })
    app.post('/todo', urlencodedParser, function(req, res) {
        var itemOne = Todo(req.body).save(function(err, data) {
                if (err) throw err;
                res.json(data)
            })
            // data.push(req.body)
            // res.json(data)
    })
    app.delete('/todo/:id', urlencodedParser, function(req, res) {
        // data = data.filter(function(todo) {
        //     return todo.item.replace(/ /g, "-") !== req.params.item
        // })
        // res.json(data)
        Todo.find({ _id: req.params.id }).deleteOne(function(err, data) {
            if (err) throw err;
            res.json(data)
        })
    })
}