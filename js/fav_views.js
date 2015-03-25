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
