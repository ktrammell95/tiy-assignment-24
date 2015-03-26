// ======================  FAVORITE LIST ITEM ====================== //

var FavListItemView = Backbone.View.extend({

  tagName: "li",

  className: "favlist-item",

  template: JST["fav_list_item"],

  initialize: function(){
    this.listenTo(this.model, "change", function(){
      this.render();
    });
  },

  render: function(){
   this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});

// ======================  FAVORITE LIST ====================== //

var FavListView = Backbone.View.extend({

  events: {
    "click li a" :"onLinkClick"
  },

  // tagName: "ul",

  className: "favorites-list",

  template: JST["fav_list"],

  initialize: function(){
    this.listenTo(this.collection, "reset add sync", function(){
      this.render();
    });
  },

  render: function(){
  //   this.$el.html( this.template() );
  //   return this;
  // },
    this.$el.html( this.template() );
    $ul = this.$("ul");
    this.collection.each(function(model){
      var view = new FavListItemView({model: model});
      $ul.append(view.render().el);
    })
    return this;
  },

  onLinkClick: function(e) {
    e.preventDefault();
    console.log(e.currentTarget);
    var title = $(e.currentTarget).data("title");
    this.trigger("link:click", title);
  }
});

// ======================  INDIVIDUAL TRACKS ====================== //

var FavTrackView = Backbone.View.extend({

  tagName: "tr",

  template: JST["fav_track"],

    events: {
    "click .play i" : "onButtonClick",
    "click .favorite a" : "onFavButtonClick",
  },

  playClass         : "fa-play-circle",
  pauseClass        : "fa-pause",
  addFavorite       : "fa-heart-o",
  currentFavorite   : "fa-heart",

  initialize: function() {

    this.listenTo(this.model, "stream:play",    this.playing);
    this.listenTo(this.model, "stream:pause",   this.paused);
  },

  removeClasses: function() {
    $i = this.$(".play i");
    $a = this.$(".favorite a");
  },

  playing: function() {
    this.$(".play i").removeClass(this.playClass);
    this.interval = setInterval(this.updatePosition.bind(this), 1000);
    this.$(".play i").addClass(this.pauseClass);
  },

  paused: function() {
    this.$(".play i").removeClass(this.pauseClass);
    this.$(".play i").addClass(this.playClass);
  },

  favorite: function() {
    this.$(".favorite a").removeClass(this.addFavorite);
    this.$(".favorite a").addClass(this.currentFavorite);
  },

  finished: function() {
    this.$(".play i").removeClasses();
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
    if( $btn.hasClass(this.addFavorite) ) {
      this.model.favorite();
      this.$(".favorite a").removeClass(this.addFavorite);
      this.$(".favorite a").addClass(this.currentFavorite); //should change heart to solid heart
    }
    else if ( $btn.hasClass(this.currentFavorite) ) {
      this.model.unfavorite();
      this.$(".favorite a").removeClass(this.currentFavorite);
      this.$(".favorite a").addClass(this.addFavorite);//if already favorite click should remove solid heart
    }
  },

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

// ======================  LIST OF TRACKS ====================== //

var FavTrackCollectionView = Backbone.View.extend({

  tagName: "table",

  className: "track-list",

  template: JST["favtrack_collection"],

  initialize: function() {
    this.listenTo(this.collection, "reset", function(){
      this.render();
    });
  },

  render: function() {
    this.$el.html( this.template() );
    $tbody = this.$("tbody");
    this.collection.each(function(model){
      var view = new FavTrackView({model: model});
      $tbody.append(view.render().el);
    });
    return this;
  }

});

