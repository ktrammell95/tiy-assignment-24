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
    "favorites"     : "showFavorites",
    "tracks/:title" : "loadFavorites",
    "genre"         : "showGenre",
    "genre/:genre"  : "loadGenre",
  },

  initialize: function() {
    this.homeView = new HomeView();

    this.navView = new NavView();//create new navigation
    this.genreView = new GenreView(); //create new genre
    this.searchView = new SearchView();//create new search

    //create new track list and tracks to play
    this.tracks = new TrackCollection();
    this.tracksView = new TrackCollectionView({
      collection: this.tracks
    });


    //create new favorite list 
    this.favorites = new FavoriteCollection();
    this.favListView = new FavListView({
      collection: this.favorites,
    });
    //create new track list and tracks to play
    this.favtracksView = new FavTrackCollectionView({
      collection: this.favorites,
    });

    $(".navigation").append(this.navView.el);
    // $(".upper-right").append(this.homeView.el);
    // $(".upper-right").append(this.tracksView.el);
    // $(".upper-left").append(this.genreView.el);
    // $(".upper-left").append(this.favListView.el);
    // $(".search-bar").append(this.searchView.el);

    //listens to navigation to show pages
   this.listenTo(this.navView, "link:click", function(option){
     switch(option.name) {
       case "favorites":
         this.showFavList();
         this.showFavorites();
       break;
       case "genre":
         this.showGenreList();
         this.showGenre();
       break;
       default:
         this.showHome();
       break;
     }
     this.navigate(option.href);
   });

    this.listenTo(this.genreView, "link:click", function(genre){
        this.showGenre(genre);
        // this.loadGenre(genre);
        this.navigate("tracks/" + genre);
    });

    this.listenTo(this.favListView, "link:click", function(title){
      // console.log(title)
        this.showFavorites(title);
        this.navigate("tracks/" + title);
    });
 
  },

  showHome: function() {
    $(".upper-right").html(this.homeView.el);
  },

//----- Genres -----//
  //list of Genres for left side of screen
  showGenreList: function() {
    $(".upper-left").html(this.genreView.el);
  },
  //loads Genres to tracks
  loadGenre: function(genre) {
    // console.log(tracks);
    this.tracks.loadGenre(genre);
  },
  //creates new tracks for Genre and appends them to the screen
  showGenre: function(genre) {
   if (!this.genreView) {
      this.genreView = new GenreView().render();
    }
    this.loadGenre(genre);
    $(".upper-right").html(this.tracksView.el);
  },

//----- Favorites -----//

  //list of Favorites for left side of screen
  showFavList: function() {
    $(".upper-left").html(this.favListView.el);
  },
   

    //loads Favorites to tracks
  loadFavorites: function(title) {
    this.favorites.loadFavorites(title);
  },
  //creates new tracks for Genre and appends them to the screen
  showFavorites: function(title) {
   if (!this.favListView) {
      this.favListView = new FavListView().render();
    }
    this.loadFavorites(title);
    $(".upper-right").html(this.favtracksView.el);  
  }


});