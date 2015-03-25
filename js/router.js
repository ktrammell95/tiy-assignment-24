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
    "genre/:genre"  : "loadGenre",
  },

  initialize: function() {
    this.home = new HomeView();

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
    // $(".upper-right").append(this.home.el);
    // $(".upper-right").append(this.tracksView.el);
    $(".upper-left").append(this.genreView.el);
    $(".upper-left").append(this.favListView.el);
    // $(".search-bar").append(this.searchView.el);

    //listens to navigation to show pages
   this.listenTo(this.navView, "link:click", function(options){
     switch(options.name) {
       case "favorites":
       console.log("favorites");
         this.showFavorites();
       break;
       case "genres":
       console.log("genres");
         this.showGenre();
       break;
       // case "home":
       // console.log("home");
       //   this.showHome();
       // break;
       default:
         this.showHome();
       break;
     }
     this.navigate(options.href);
   });

    this.listenTo(this.genreView, "link:click", function(genre){
        this.showGenre(genre);
        // this.loadGenre(genre);
        this.navigate("tracks/" + genre);
    });

    this.listenTo(this.favListView, "link:click", function(title){
        this.favorites.get(title);
        this.navigate("tracks/" + title);
    });
 
  },

  showHome: function() {
    $(".upper-right").html(this.home.el);
  },

//-----Genres
  loadGenre: function(genre) {
    // console.log(tracks);
    this.tracks.loadGenre(genre);
  },

  showGenre: function(genre) {
   if (!this.genreView) {
      this.genreView = new GenreView().render();
    }
    this.loadGenre(genre);
    $(".upper-right").html(this.tracksView.el);
      // this.$main.html(this.genreView.el);
  },

//-----Favorites
  //  loadFavorites: function(title) {
  //   console.log("title", title)
  //   this.favorites.get(title);
  // },

  showFavorites: function() {
   if (!this.favListView) {
      this.favListView = new FavListView().render();
    }
    this.favorites(title);
    $(".upper-right").html(this.favtracksView.el);  }


});