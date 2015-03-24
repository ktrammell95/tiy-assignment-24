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
    ""              : "showHome",
    "home"          : "showHome",
    // "title/:title"  : "loadSongs",
    "genre/:genre"  : "loadGenre",
  },

  initialize: function() {
    this.homeView = new HomeView();
    this.navView = new NavView();//create new navigation
    this.genreView = new GenreView(); //create new genre
    this.searchView = new SearchView();//create new search
    // this.songView = new SongView();
    //create new track list and tracks to play
    this.tracks = new TrackCollection();
    this.tracksView = new TrackCollectionView({
      collection: this.tracks
    });

    //create new favorite list and favorite songs to play
    this.favorites = new FavoriteCollection();
    this.favListView = new FavListView({
      collection: this.favorites,
    });

    // this.favoriteColl = new FavoriteCollection();
    // this.favView = new FavView({
    //   // collection: this.favorites,
    // });

    $(".navigation").append(this.navView.el);
    $(".upper-right").append(this.homeView.el);
    $(".upper-right").prepend(this.tracksView.el);
    $(".upper-left").append(this.genreView.el);
    $(".search-bar").append(this.searchView.el);
    $(".lower-left").append(this.favListView.el);
    // $(".lower-right").append(this.favView.el);

  // -- navigation -- //
  this.listenTo(this.navView, "link:click", function(link){
    this.navigate(link);
    if (link === "home"){
      console.log("this should load Home");
      this.showHome();
    } else {
      // console.log("loading Genres");
      this.loadSongs();
    }
  });

  this.listenTo(this.genreView, "link:click", function(genre){
      this.loadGenre(genre);
      this.navigate("tracks/" + genre);
    });

  // this.listenTo(this.songView, "link:click", function(title){
  //     this.loadSongs(title);
  //     this.navigate("tracks/" + title);
  //   });

  this.listenTo(this.homeView, "search:submitted", function(keyword, id){
    this.loadSearch(keyword, id);
    this.navigate("search/" + keyword);
  }); 

  },

  loadGenre: function(genre) {
    this.tracks.loadGenre(genre);
  },

  loadSongs: function(title) {
    this.tracks.loadSongs(title);
  },

  loadSearch: function(keyword) {
    this.tracks.loadSearch(keyword);
  },

  showGenre: function() {
    // console.log("show Products");
   if (!this.songView) {
      this.songView = new SongView().render();
    }
      this.$main.html(this.songView.el);
  },

  showSongs: function() {
    // console.log("show Products");
   if (!this.genreView) {
      this.genreView = new GenreView().render();
    }
      this.$main.html(this.genreView.el);
  },

  showHome: function() {
    // console.log(this);
   if (!this.homeView) {
      this.homeView = new HomeView().render();
    }
      this.$main.html(this.homeView.el);
  }


});