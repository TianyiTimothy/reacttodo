var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');

// mongoose.connect('mongodb://hfpp2012:hfpp2012@ds151068.mlab.com:51068/todos');
// mongoose.connect('mongodb+srv://root:root@cluster0.xbngn.mongodb.net/<dbname>?retryWrites=true&w=majority');
mongoose.connect('mongodb://root:root@cluster0-shard-00-00.xbngn.mongodb.net:27017,cluster0-shard-00-01.xbngn.mongodb.net:27017,cluster0-shard-00-02.xbngn.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-evj9l3-shard-0&authSource=admin&retryWrites=true&w=majority');

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'buy flowers'}).save(function(err) {
//   if (err) throw err;
//   console.log('item saved');
// });
//
// var data = [ {item: 'get milk'}, {item: "walk dog"}, {item: 'kick some coding ass'} ];;

module.exports = function(app) {
  app.get('/todo', function(req, res) {
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    var itemOne = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res) {
    // data = data.filter(function(todo) {
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
    Todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
}
