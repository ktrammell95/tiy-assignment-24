//Models are the heart of any JavaScript application, 
// containing the interactive data as well as a large 
// part of the logic surrounding it: conversions, validations, 
// computed properties, and access control. 
// You extend Backbone.Model with your domain-specific methods, 
// and Model provides a basic set of functionality for managing changes.

// ======================  MODEL ====================== //

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

});

// Collections are ordered sets of models. 
// You can bind "change" events to be notified 
// when any model in the collection has been modified, l
// isten for "add" and "remove"events, fetch the collection 
//from the server, and use a full suite of Underscore.js methods.

// ======================  COLLECTIONS ====================== //

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

});

// ======================  FIREBASE ====================== //

// var Fire = Backbone.Model.extend({

// });

// var FavFireCollection = Backbone.Firebase.Collection.extend({

//   url: "https://kt-musicapp.firebaseio.com/favorites/artists",
//   model: Fire

// });

