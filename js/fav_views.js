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

  className: "favorites-list",

  template: JST["fav_list"],

  initialize: function(){
    this.listenTo(this.collection, "reset add sync", function(){
      this.render();
    });
  },

  render: function(){
    this.$el.html( this.template() );
    $ul = this.$("ul");
    this.collection.each(function(model){
      var view = new FavListItemView({model: model});
      $ul.append(view.render().el);
    })
    return this;
  }
});

// ======================  FAVORITES BY ARTWORK ====================== //

// var FavView = Backbone.View.extend({

//   tagName: "tr",

//   template: JST["fav"],

//     events: {
//     "click .play i" : "onButtonClick",
//     "click .favorite a" : "onFavButtonClick",
//   },

//   playClass         : "fa-play-circle",
//   pauseClass        : "fa-pause",


//   initialize: function() {

//     this.listenTo(this.model, "stream:play",    this.playing);
//     this.listenTo(this.model, "stream:pause",   this.paused);
//   },

//   removeClasses: function() {
//     $i = this.$(".play i");
//   },

//   playing: function() {
//     this.$(".play i").removeClass(this.playClass);
//     this.interval = setInterval(this.updatePosition.bind(this), 1000);
//     this.$(".play i").addClass(this.pauseClass);
//   },

//   paused: function() {
//     this.$(".play i").removeClass(this.pauseClass);
//     this.$(".play i").addClass(this.playClass);
//   },

//   finished: function() {
//     this.$(".play i").removeClasses();
//     this.$(".play i").addClass(this.playClass);
//   },

//   onButtonClick: function(e) {
//     e.preventDefault();

//     $btn = $(e.currentTarget);

//     if( $btn.hasClass(this.playClass) ) {
//       this.model.play();
//     }
//     else if ( $btn.hasClass(this.pauseClass) ) {
//       this.model.pause();
//     }
//   },

//   formatDuration: function(duration) {
//       duration = duration / 1000 / 60;
//       var minutes = Math.floor(duration);
//       var seconds = Math.round((duration - minutes) * 60);
//       if (seconds < 10) {
//         seconds = "0" + seconds.toString();
//       }
//       duration = minutes.toString() + ":" + seconds.toString();
//       return duration;
//   },

//   render: function() {
//     var data = this.model.toJSON();
//     data.duration = this.formatDuration(data.duration);
//     this.$el.html(
//       this.template( data )
//     );
//     return this;
//   }

// });

// // ======================  LIST OF FAVORITES ====================== //

// var FavCollectionView = Backbone.View.extend({

//   tagName: "table",

//   className: "fav-list",

//   template: JST["fav_collection"],

//   initialize: function() {
//     this.listenTo(this.collection, "reset add sync", function(){
//       this.render();
//     });
//   },

//   render: function() {
//     this.$el.html( this.template() );
//     $tbody = this.$("tbody");
//     this.collection.each(function(model){
//       var view = new FavView({model: model});
//       $tbody.append(view.render().el);
//     });
//     return this;
//   }

// });