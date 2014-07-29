/* jshint expr: true*/
define([
  'marionette',
  'controllers/nav',
  'api/movies'
], function (Marionette, NavController, getMovies) {
  'use strict';

  // unit test suite on nav controller
  describe('nav controller', function () {
    var element = document.createElement('div');
    element.className = 'content';

    // hook running before each test
    beforeEach(function () {
      document.body.appendChild(element);

      var region = new Marionette.Region({
        el: '.content'
      });

      this.controller = new NavController({
        region: region,
        movies: getMovies()
      });

    });

    // hook running after each test
    afterEach(function () {
      this.controller.destroy();
      this.controller = null;

      document.body.removeChild(element);
    });

    // tests on list()
    describe('list()', function () {
      it('should render the movie list view', function () {
        // query the after
        var view = this.controller.list().currentView;
        expect(view.$el.find('li').length).to.be.above(1);
      });

      it('should render the same number of items', function () {
        var view = this.controller.list().currentView;
        view.$el.find('li').length.should.eq(8);
      });
    });

    // tests on showMovie()
    describe('showMovie()', function () {
      it('should render the movie details view', function () {
        var view = this.controller.showMovie('nm0000714');
        expect(view.$el.length).to.be.above(0);
      });

      it('should render the expected movie', function () {
        var view = this.controller.showMovie('nm0000714');
        view.$el.find('.media-body').html().should.contain('Willie Aames');
      });
    });
  });

});
