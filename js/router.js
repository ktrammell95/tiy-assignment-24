// Web applications often provide linkable, bookmarkable,
// shareable URLs for important locations in the app. 
// Until recently, hash fragments (#page) were used to provide these permalinks, 
// but with the arrival of the History API, 
// it's now possible to use standard URLs (/page). 
// Backbone.Router provides methods for routing client-side pages, 
// and connecting them to actions and events. 
// For browsers which don't yet support the History API, 
// the Router handles graceful fallback and transparent 
// translation to the fragment version of the URL.

var Router = Backbone.Router.extend({

  routes: {
    "" : "showHome",
    "genre" : "showGenre",
    // "search"     : "showSearch",
    "genre/:genre" : "loadGenre",
  },

  initialize: function() {
    this.genreView = new GenreView();
    this.navView = new NavView();

    this.favListView = new FavListView({
      collection: this.favorites,
      el: ".lower-left"
    });

    this.favView = new FavView({
      collection: this.favorites,
      el: ".fav-view"
    });

    // this.favorites = new FavFireCollection();

    this.tracks = new TrackCollection();
    this.tracksView = new TrackCollectionView({
      collection: this.tracks
    });

    $(".navigation").append(this.navView.el);
    $(".upper-right").append(this.tracksView.el);
    $(".upper-left").append(this.genreView.el);
    $(".upper-right").append(this.tracksView.el);
    $(".lower-left").append(this.favListView.el);
    $(".lower-right").append(this.favView.el);

  this.listenTo(this.genreView, "link:click", function(genre){
      this.loadGenre(genre);
      this.navigate("tracks/" + genre);
    });
  },

  loadGenre: function(genre) {
    this.tracks.loadGenre(genre);
  },

  showGenre: function() {
    // console.log("show Products");
   if (!this.genreView) {
      this.genreView = new GenreView().render();
    }
      this.$main.html(this.genreView.el);
  },


});