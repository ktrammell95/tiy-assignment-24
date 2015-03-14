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
    this.favView = new FavoritesView();

    this.favorites = new FavoriteCollection();
    this.tracks = new TrackCollection();
    this.tracksView = new TrackCollectionView({
      collection: this.tracks
    });

    $(".upper-right").append(this.tracksView.el);
    $(".upper-left").append(this.genreView.el);
    $(".navigation").append(this.navView.el);

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

  loadFavorites: function(id) {
    this.favorites.loadFavorites(id);
  },

  showGenre: function() {
    // console.log("show Products");
   if (!this.favView) {
      this.favView = new FavoritesView().render();
    }
      this.$main.html(this.favView.el);
  },

});