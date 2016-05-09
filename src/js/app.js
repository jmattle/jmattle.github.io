(function () {
    var client = algoliasearch('6BJZ7N3PQZ', 'b20232e3366e78dbdaa50466812a3b8e')
    var index = client.initIndex('bestbuy');

    // Mustache templating by Hogan.js (http://mustache.github.io/)
    var templateResult = Hogan.compile('<div class="result">' +
      '<img class="image" src="{{{ image }}}">' +
      '<div class="name">{{{ _highlightResult.name.value }}}</div>' +
      '</div>');

    autocomplete('#search-input', {hint: true}, [
    {
        source: autocomplete.sources.hits(index, {hitsPerPage: 5}),
        displayKey: 'name',
        templates: {
          //header: '<div class="category">Results</div>',
          suggestion: function(suggestion) {
            return templateResult.render(suggestion);
          }
        }
      }
    ]).on('autocomplete:selected', function(event, suggestion, dataset) {
      console.log(suggestion, dataset);
    });

})();