// Backbone views are almost more convention than they are code — 
// they don't determine anything about your HTML or CSS for you, 
// and can be used with any JavaScript templating library. 
// The general idea is to organize your interface into logical views, 
// backed by models, each of which can be updated independently when the model changes, 
// without having to redraw the page. Instead of digging into a JSON object,
// looking up an element in the DOM, and updating the HTML by hand, 
// you can bind your view's render function to the model's "change" event — 
// and now everywhere that model data is displayed in the UI, 
// it is always immediately up to date.

// ======================  TRACKS ====================== //

var TrackView = Backbone.View.extend({

  tagName: "tr",

  template: JST["track"],

    events: {
    "click .play i" : "onButtonClick",
    "click .favorite a" : "onFavButtonClick",
  },

  playClass         : "fa-play-circle",
  loadingClass      : "fa-spinner",
  pauseClass        : "fa-pause",
  spinClass         : "fa-spin",
  addFavorite       : "fa-heart-o",
  currentFavorite   : "fa-heart",

  initialize: function() {

    this.listenTo(this.model, "stream:loading", this.loading);
    this.listenTo(this.model, "stream:play",    this.playing);
    this.listenTo(this.model, "stream:pause",   this.paused);
    this.listenTo(this.model, "stream:pause",   this.paused);
  },

  removeClasses: function() {
    $i = this.$(".play i");
    $a = this.$(".favorite a");
    $i.removeClass(this.playClass);
    $i.removeClass(this.loadingClass);
    $i.removeClass(this.pauseClass);
    $i.removeClass(this.spinClass);
    $a.removeClass(this.addFavorite);
    $a.removeClass(this.currentFavorite);
  },

  loading: function() {
    this.removeClasses();
    this.$(".play i").addClass(this.spinClass).addClass(this.loadingClass);
  },

  playing: function() {
    this.removeClasses();
    this.interval = setInterval(this.updatePosition.bind(this), 1000);
    this.$(".play i").addClass(this.pauseClass);
  },

  paused: function() {
    this.removeClasses();
    this.$(".play i").addClass(this.playClass);
  },

  favorite: function() {
    this.removeClasses();
    this.$(".favorite a").addClass(this.currentFavorite);
  },

  removefavorite: function() {
    this.removeClasses();
    this.$(".favorite a").addClass(this.addFavorite);
  },

  finished: function() {
    this.removeClasses();
    this.$(".play i").addClass(this.playClass);
  },

  updatePosition: function() {
    var duration = this.model.stream.duration;
    var position = this.model.stream.position;
    if(position && position === duration) {
      var dur = this.formatDuration(duration);
      this.$(".duration span").text(dur);
      this.finished();
      clearInterval(this.interval);
    } else {
      var pos = this.formatDuration(position);
      this.$(".duration span").text(pos);
    }
  },

  onButtonClick: function(e) {
    e.preventDefault();

    $btn = $(e.currentTarget);

    if( $btn.hasClass(this.playClass) ) {
      this.model.play();
    }
    else if ( $btn.hasClass(this.pauseClass) ) {
      this.model.pause();
    }
  },

  onFavButtonClick: function(e) {
    e.preventDefault();
    $btn = $(e.currentTarget);
    // $btn.data('track-id');
    console.log(e.currentTarget)
    if( $btn.hasClass(this.addFavorite) ) {
      this.removeClasses(this.addFavorite);
      this.$(".favorite a").addClass(this.currentFavorite); //should change heart to solid heart
    }
    else if ( $btn.hasClass(this.currentFavorite) ) {
      this.removeClasses(this.currentFavorite);
      this.$(".favorite a").addClass(this.addFavorite);//if already favorite click should remove solid heart
    }
  },

  // favorite: function() {
  //   this.removeClasses();
  //   this.$(".favorite a").addClass(this.currentFavorite);
  // },

  // removefavorite: function() {
  //   this.removeClasses();
  //   this.$(".favorite a").addClass(this.addFavorite);
  // },



  formatDuration: function(duration) {
      duration = duration / 1000 / 60;
      var minutes = Math.floor(duration);
      var seconds = Math.round((duration - minutes) * 60);
      if (seconds < 10) {
        seconds = "0" + seconds.toString();
      }
      duration = minutes.toString() + ":" + seconds.toString();
      return duration;
  },

  render: function() {
    var data = this.model.toJSON();
    data.duration = this.formatDuration(data.duration);
    this.$el.html(
      this.template( data )
    );
    return this;
  }

});

var TrackCollectionView = Backbone.View.extend({

  tagName: "table",

  className: "track-list",

  template: JST["track_collection"],

  initialize: function() {
    this.listenTo(this.collection, "reset", function(){
      this.render();
    });
  },

  render: function() {
    this.$el.html( this.template() );
    $tbody = this.$("tbody");
    this.collection.each(function(model){
      var view = new TrackView({model: model});
      $tbody.append(view.render().el);
    });
    return this;
  }

});

// ======================  NAVIGATION ====================== //

var NavView = Backbone.View.extend({

  tagName: "nav",

  template: JST["nav"],

  events: {
    "click a" : "onLinkClick"
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },

  onLinkClick: function(e) {
    e.preventDefault();
    var name = $(e.currentTarget).data("name");
    var href = $(e.currentTarget).attr("href");
    this.trigger("link:click", {
      name: name,
      href: href
    });
  }

});

// ======================  GENRES ====================== //

var GenreView = Backbone.View.extend({

  events: {
    "click a" :"onLinkClick"
  },

  tagName: "ul",

  className: "genres",

  template: JST["genre"],

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },

  onLinkClick: function(e) {
    e.preventDefault();
    var genre = $(e.currentTarget).data("genre");
    this.trigger("link:click", genre);
  }

});
// ======================  FAVORITE LIST ====================== //

var FavListView = Backbone.View.extend({

  // events: {
  //   "click a" :"onLinkClick"
  // },

  tagName: "ul",

  className: "favorites",

  template: JST["fav_list"],

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },

  // onLinkClick: function(e) {
  //   e.preventDefault();
  //   var genre = $(e.currentTarget).data("genre");
  //   this.trigger("link:click", genre);
  // }

});

// ======================  FAVORITES BY ARTWORK ====================== //

var FavView = Backbone.View.extend({

  // events: {
  //   "click a" :"onLinkClick"
  // },

  className: "fav-view",

  template: JST["fav"],

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },

  // onLinkClick: function(e) {
  //   e.preventDefault();
  //   var genre = $(e.currentTarget).data("genre");
  //   this.trigger("link:click", genre);
  // }

});

