//method search favorite collection to see if there is a favorite 
  //with matching track id
//then if get one back favorited method will return true
//in trackview, use the favorited method if true filled in, else false

// ======================  Favorites ====================== //
// var Favorites = Backbone.Model.extend({

// });

//favorite model 
//will have track id
//function on each track on instance

var FavoriteCollection = Backbone.Firebase.Collection.extend({

  url: "https://kt-musicapp.firebaseio.com/favorites",
  model: Track,

});;


// ======================  SONG VIEW ====================== //

// var SongView = Backbone.View.extend({

//   className: "song-view",

//   template: JST["song_view"],

//   initialize: function() {
//     this.listenTo(this.collection, "reset", function(){
//       this.render();
//     });
//   },

//   render: function() {
//     this.$el.html( this.template() );
//     $div = this.$("div");
//     this.collection.each(function(model){
//       var view = new TrackView({model: model});
//       $div.append(view.render().el);
//     });
//     return this;
//   }

// });

// ======================  FAVORITES VIEW ====================== //


// var FavoritesView = Backbone.View.extend({

//  events: {
//     "click a" :"onLinkClick"
//   },

//   tagName: "ul",

//   className: "favorites",

//   template: JST["genre"],

//   initialize: function() {
//     this.render();
//   },

//   render: function() {
//     this.$el.html( this.template() );
//     return this;
//   },

//   onLinkClick: function(e) {
//     e.preventDefault();
//     var genre = $(e.currentTarget).data("genre");
//     this.trigger("link:click", genre);
//   }
  

// });


var SearchView = Backbone.View.extend({

  template: JST["search"],

  render: function(){
    this.$el.html( this.template());
    return this;
  }
});