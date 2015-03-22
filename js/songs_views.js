// ======================  SONGS ====================== //

var SongView = Backbone.View.extend({

  className: "song-view",

  template: JST["songs"],

  events: {
    "click .play i" : "onButtonClick",
    "click .favorite a" : "onFavButtonClick",
  },

  playClass         : "fa-play-circle",
  pauseClass        : "fa-pause",
  addFavorite       : "fa-heart-o",
  currentFavorite   : "fa-heart",

  // initialize: function() {

  //   this.listenTo(this.model, "stream:play",    this.playing);
  //   this.listenTo(this.model, "stream:pause",   this.paused);
  // },

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
      this.$(".favorite a").removeClass(this.addFavorite);
      this.$(".favorite a").addClass(this.currentFavorite); //should change heart to solid heart
    }
    else if ( $btn.hasClass(this.currentFavorite) ) {
      this.$(".favorite a").removeClass(this.currentFavorite);
      this.$(".favorite a").addClass(this.addFavorite);//if already favorite click should remove solid heart
    }
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



