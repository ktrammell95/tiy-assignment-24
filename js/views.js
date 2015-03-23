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

// ======================  NAVIGATION ====================== //

var HomeView = Backbone.View.extend({

  className: "home",
  
  template: JST["home"],

  // events: {
  //   "click a" : "onLinkClick"
  // },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },

  // onLinkClick: function(e) {
  //   e.preventDefault();
  //   var link = $(e.currentTarget).data("name");
  //   this.trigger("link:click", link);
    // console.log("you clicked a link");
  // }

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
    var link = $(e.currentTarget).data("name");
    this.trigger("link:click", link);
    // console.log("you clicked a link");
  }

});

// ======================  SEARCH ====================== //


var SearchView = Backbone.View.extend({

  className: "search-bar",

  template: JST["search"],

  initialize: function() {
    this.render();
  },

  render: function(){
    this.$el.html( this.template());
    return this;
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
