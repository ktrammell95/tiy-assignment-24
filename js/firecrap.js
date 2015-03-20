var FavoriteArtists = Backbone.Firebase.Collection.extend({url: "https://kt-musicapp.firebaseio.com/favorites/artists"});
var favorites = new FavoriteArtists();
favorites.push({name: "Madonna"});


var ArtistsExample = Backbone.Firebase.Collection.extend({
  url: "https://kt-musicapp.firebaseio.com/example/artists"});
var example = new ArtistsExample();
example.push({name: "Bon Jovi"});


//====== Listening to changes =========//

// A view for an individual todo item
var TodoView = Backbone.View.extend({
  tagName:  "li",
  template: _.template("<%= title %>"),
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

//====== Reading Data =========//

// The view for the entire application
var AppView = Backbone.View.extend({
  el: $('#todoapp'),
  initialize: function() {
    this.list = this.$("#todo-list"); // the list to append to

    // by listening to when the collection changes we
    // can add new items in realtime
    this.listenTo(this.collection, 'add', this.addOne);
  },
  addOne: function(todo) {
    var view = new TodoView({model: todo});
    this.list.append(view.render().el);
  }
});

//====== Writing Data =========//

<div id="todoapp">
  <ul id="todo-list"></ul>
  <input type="text" id="new-todo" placeholder="New Todo" />
  <button id="add-todo">Add</button>
</div>


// The view for the entire application
var AppView = Backbone.View.extend({
  el: $('#todoapp'),
  events: {
    "click #add-todo" : "createTodo",
  },
  initialize: function() {
    this.list = this.$("#todo-list"); // the list to append to
    this.input = this.$("#new-todo"); // the textbox for new todos

    // by listening to when the collection changes we
    // can add new items in realtime
    this.listenTo(this.collection, 'add', this.addOne);
  },
  addOne: function(todo) {
    var view = new TodoView({model: todo});
    this.list.append(view.render().el);
  },
  createTodo: function(e) {
    if (!this.input.val()) { return; }

    // create a new location in firebase and save the model data
    // this will trigger the listenTo method above and a new todo view
    // will be created as well
    this.collection.create({title: this.input.val()});

    this.input.val('');
  }
});

// Create a function to kick off our BackboneFire app
function init() {
  // The data we are syncing from Firebase
  var collection = new TodoCollection();
  var app = new AppView({ collection: collection });
}

// When the document is ready, call the init function
$(function() {
  init();
});


//====== Other Crap =========//


// var EventsView = Backbone.View.extend({

//   events: {
//     "click button" : "alert"
//   },

//   alert: function(e) {
//     e.preventDefault();
//     alert("you clicked a button and events are working");
//   },

//   render: function() {
//     this.$el.html("<button>Click me</button>");
//     return this;
//   }

// });

//$('#messageInput').keypress(function (e) {
//         if (e.keyCode == 13) {
//           var name = $('#nameInput').val();
//           var text = $('#messageInput').val();
// myDataRef.set({name: name, text: text});
//           $('#messageInput').val('');
//         }

// var myDataRef = new Firebase('https://pg30mjoagif.firebaseio-demo.com/');
      // $('#messageInput').keypress(function (e) {
      //   if (e.keyCode == 13) {
      //     var name = $('#nameInput').val();
      //     var text = $('#messageInput').val();
      //     myDataRef.push({name: name, text: text});
      //     $('#messageInput').val('');
      //   }
      // });

      // var myDataRef = new Firebase('https://pg30mjoagif.firebaseio-demo.com/');
      // $('#messageInput').keypress(function (e) {
      //   if (e.keyCode == 13) {
      //     var name = $('#nameInput').val();
      //     var text = $('#messageInput').val();
      //     myDataRef.push({name: name, text: text});
      //     $('#messageInput').val('');
      //   }
      // });
      // myDataRef.on('child_added', function(snapshot) {
      //   //We'll fill this in later.
      // });


// var myDataRef = new Firebase('https://pg30mjoagif.firebaseio-demo.com/');
//       $('#messageInput').keypress(function (e) {
//         if (e.keyCode == 13) {
//           var name = $('#nameInput').val();
//           var text = $('#messageInput').val();
//           myDataRef.push({name: name, text: text});
//           $('#messageInput').val('');
//         }
//       });
//       myDataRef.on('child_added', function(snapshot) {
//         var message = snapshot.val();
//         displayChatMessage(message.name, message.text);
//       });
//       function displayChatMessage(name, text) {
//         $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
//         $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
//       };
