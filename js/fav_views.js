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
  //   var fav-track = $(e.currentTarget).data("track-id");
  //   this.trigger("link:click", track-id);
  // }

});

// ======================  FAVORITES BY ARTWORK ====================== //

var FavView = Backbone.View.extend({

  events: {
    "click a" :"onLinkClick"
  },

  className: "fav-view",

  template: JST["fav"],

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },

  onLinkClick: function(e) {
    e.preventDefault();
    var id = $(e.currentTarget).data("trackid");
    this.trigger("link:click", id);
  }

});



