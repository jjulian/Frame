$(document).bind("mobileinit", function(){
  $.mobile.defaultPageTransition = 'none';
});
$(document).ready(function() {
  mme.mapView = new mme.LevelView({model: mme.levels.get(2)}); // museum entrance on floor 2
  mme.mapView.insertIntoDOM();
  //document.ontouchmove = function(e) { e.preventDefault(); }
  _.each(['ma','mb','mc','md','1a','1b','2a','2b','2c','3a','3b','3c','4a','4b',
    '13c-bg','15c-bg','16c-bg','17c-bg','18c-bg'], function(name) {
    new Image().src = 'images/'+name+'.png';
  });
});

function mme() {}

mme.Level = Backbone.Model.extend({
});

mme.Levels = Backbone.Collection.extend({
  model: mme.Level
});

mme.LevelView = Backbone.View.extend({
  tagName: 'div',
  className: 'main-map',
  events: {
    'tap .hitarea.level': 'chooseLevel',
    'tap .hitarea.section': 'chooseSection'
  },
  _template: '<img src="images/<%= image %>"> \
    <a class="hitarea level" data-level="4"></a> \
    <a class="hitarea level" data-level="3"></a> \
    <a class="hitarea level" data-level="2"></a> \
    <a class="hitarea level" data-level="1"></a> \
    <% _.each(sections, function(section) { %> \
      <a class="hitarea section" data-section="<%= section %>" data-transition="none"></a> \
    <% }); %>',
  initialize: function(options) {
    _.bindAll(this);
  },
  render: function() {
    this.$el.html( _.template(this._template, this.model.toJSON()) );
    return this;
  },
  insertIntoDOM: function() {
    $('#index div[data-role="content"]').prepend(this.render().el); 
  },
  chooseLevel: function(e) {
    var level = $(e.currentTarget).data('level');
    this.remove();
    this.model = mme.levels.get(level); 
    this.insertIntoDOM();
    this.delegateEvents(this.events);
  },
  chooseSection: function(e) {
    var section = $(e.currentTarget).data('section');
    if (mme.sectionView) mme.sectionView.remove();
    mme.sectionView = new mme.SectionView({model: mme.sections.get(section)});
    mme.sectionView.insertIntoDOM();
    $.mobile.changePage( "#section-map" );
  }
});

mme.levels = new mme.Levels([{
  id: 4,
  image: 'md.png',
  sections: ['4a','4b']
},{
  id: 3,
  image: 'mc.png',
  sections: ['3a','3b','3c']
},{
  id: 2,
  image: 'mb.png',
  sections: ['2a','2b','2c']
},{
  id: 1,
  image: 'ma.png',
  sections: ['1a','1b']
}]);

mme.Section = Backbone.Model.extend({
});

mme.Sections = Backbone.Collection.extend({
  model: mme.Section
});

mme.SectionView = Backbone.View.extend({
  tagName: 'div',
  id: 'section-map',
  attributes: {'data-role': 'page'},
  _template: '<div data-role="content" id="section<%= id %>"> \
    <img src="images/<%= image %>"> \
    <% _.each(galleries, function(gallery) { %> \
      <a class="hitarea gallery" href="<%= gallery %>" data-transition="none"></a> \
    <% }); %> \
    <a class="hitarea" data-rel="back"></a> \
    </div>',
  initialize: function(options) {
    _.bindAll(this);
  },
  render: function() {
    this.$el.html( _.template(this._template, this.model.toJSON()) );
    return this;
  },
  insertIntoDOM: function() {
    $('body').append(this.render().el); 
  }
});

mme.sections = new mme.Sections([{
  id: '1a',
  image: '1a.png',
  galleries: []
},{
  id: '1b',
  image: '1b.png',
  galleries: []
},{
  id: '2a',
  image: '2a.png',
  galleries: []
},{
  id: '2b',
  image: '2b.png',
  galleries: []
},{
  id: '2c',
  image: '2c.png',
  galleries: []
},{
  id: '3a',
  image: '3a.png',
  galleries: []
},{
  id: '3b',
  image: '3b.png',
  galleries: ['18century.html','17century.html','16century.html','15century.html','13century.html']
},{
  id: '3c',
  image: '3c.png',
  galleries: []
},{
  id: '4a',
  image: '4a.png',
  galleries: []
},{
  id: '4b',
  image: '4b.png',
  galleries: []
}]);
