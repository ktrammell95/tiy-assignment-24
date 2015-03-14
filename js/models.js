// ======================  TRACKS ====================== //

var Track = Backbone.Model.extend({

  play: function() {
    if(!this.stream) {
      this._loadStream();
      return;
    }
    this.stream.play();
    this.trigger("stream:play");
  },

  pause: function() {
    this.stream.pause();
    this.trigger("stream:pause");
  },

  _loadStream: function(autoPlay) {
    this.trigger("stream:loading");
    SC.stream("/tracks/" + this.id, function(sound){
      this.stream = sound;
      this.trigger("stream:loaded");
      this.play();
    }.bind(this));
  }

  // favorited: function() {
  //   this.trigger("favorited");
  // }

});

var TrackCollection = Backbone.Collection.extend({

  model: Track,

  loadGenre: function(genre) {
    SC.get('/tracks', { genres: genre }, function(tracks) {
      this.reset(tracks);
    }.bind(this));
  },

  search: function(query) {
    SC.get('/tracks', { q: query }, function(tracks) {
      this.reset(tracks);
    }.bind(this));
  }
//method search favorite collection to see if there is a favorite 
  //with matching track id
//then if get one back favorited method will return true
//in trackview, use the favorited method if true filled in, else false
});

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

