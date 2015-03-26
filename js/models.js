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
  },

  favorite: function() {
    this.collection.favorites.add({
      "id": this.get('id'), 
      "title": this.get('title'), 
      "artwork_url":this.get('artwork_url'),
      "streamable":this.get('streamable'),
      "stream_url":this.get('stream_url'),
    });
  },

  unfavorite: function() {
    this.collection.favorites.remove({id: this.get('id')});
  }
});

// Collections are ordered sets of models. 
// You can bind "change" events to be notified 
// when any model in the collection has been modified, l
// isten for "add" and "remove"events, fetch the collection 
// from the server, and use a full suite of Underscore.js methods.

// ======================  COLLECTIONS ====================== //

var TrackCollection = Backbone.Collection.extend({

  model: Track,

  initialize: function() {//FavoriteCollection down below
    this.favorites = new FavoriteCollection();
  },

  loadGenre: function(genre) {
    SC.get('/tracks', { genres: genre }, function(tracks) {
      console.log(tracks);
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

var FavoriteCollection = Backbone.Firebase.Collection.extend({

  model: Track,
  url: "https://kt-musicapp.firebaseio.com/favorites",

});

