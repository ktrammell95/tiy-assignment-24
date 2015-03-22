this["JST"] = this["JST"] || {};
this["JST"]["fav"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "\n  <div class=\"song\">\n    <img class=\"image\" src=\"http://lorempixel.com/output/nightlife-q-c-600-600-5.jpg\" alt=\"title\">\n    <div class=\"play-btn\">\n        <i class=\"fa fa-play-circle\"></i>\n    </div>\n    <div class=\"title\">\n      <span>title 1</span>\n    </div>\n  </div><!--song-->";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["fav_list"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h2>Favorites</h2>\n\n<li><a data-fav=\"pop\" href=\"#\" alt=\"pop\">Pop</li>\n";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["genre"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h2>Genres</h2>\n\n<li><a data-genre=\"pop\" href=\"#\" alt=\"pop\">Pop</li>\n<li><a data-genre=\"rock\" href=\"#\" alt=\"rock\">Rock</li>\n<li><a data-genre=\"folk\" href=\"#\" alt=\"folk\">Folk</li>\n<li><a data-genre=\"rap\" href=\"#\" alt=\"rap\">Rap</li>\n<li><a data-genre=\"country\" href=\"#\" alt=\"country\">Country</li>\n<li><a data-genre=\"80s\" href=\"#\" alt=\"80's\">80s</li>";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["nav"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div>\n  <a class=\"nav-home btn-glass\" data-name=\"home\" href=\"/genres\"><i class=\"fa fa-fw fa-lg fa-home \"></i>Home</a>\n</div>\n<div>\n  <a class=\"nav-genres btn-glass\"data-name=\"genres\" href=\"/genres\"><i class=\"fa fa-fw fa-lg fa-headphones \"></i>Genres</a>\n</div>\n\n\n";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["search"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"search\">\n  <form class=\"search-form\" action=\"\" method=\"\">\n    <span></span>\n    <input type = \"text\" class=\"search-field\" name=\"search\" placeholder=\"Enter Search Words\">\n    <input type = \"submit\" class = \"search-button\" name=\"submit\"value=\"Search\">\n  </form>\n</div>";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["track"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "  <i class=\"fa fa-play-circle\"></i>\n";
},"3":function(depth0,helpers,partials,data) {
    return "  <i class=\"fa fa-ban\"></i>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n<td class=\"favorite\">\n  <a href=\"#\" data-track-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"fa fa-heart-o\">\n  </a>\n</td>\n<td class=\"artwork\">\n  <img src=\""
    + alias3(((helper = (helper = helpers.artwork_url || (depth0 != null ? depth0.artwork_url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"artwork_url","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\n</td>\n<td class=\"play\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.streamable : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n<td class=\"title\">\n  <span>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td>\n</td>\n<td class=\"genre\">\n  <span>"
    + alias3(((helper = (helper = helpers.genre || (depth0 != null ? depth0.genre : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"genre","hash":{},"data":data}) : helper)))
    + "</td>\n</td>\n<td class=\"duration\">\n  <span>"
    + alias3(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"duration","hash":{},"data":data}) : helper)))
    + "</span>\n</td>";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["track_collection"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<thead>\n  <tr>\n    <th>Favorite</th>\n    <th>Artwork</th>\n    <th></th>\n    <th>Title</th>\n    <th>Genre</th>\n    <th>Duration</th>\n  </tr>\n</thead>\n<tbody>\n\n</tbody>";
},"useData":true});