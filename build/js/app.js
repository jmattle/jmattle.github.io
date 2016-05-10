$(document).ready(function () {

  // INIT VARIABLES
  var APPLICATION_ID = '6BJZ7N3PQZ';
  var SEARCH_ONLY_API_KEY = 'b20232e3366e78dbdaa50466812a3b8e';
  var INDEX_NAME = 'bestbuy';


  var client = algoliasearch(APPLICATION_ID, SEARCH_ONLY_API_KEY)
  var index = client.initIndex(INDEX_NAME);

    // Mustache templating by Hogan.js (http://mustache.github.io/)
    var templateResult = Hogan.compile('<div class="result">' +
      '<img class="image" src="{{{ image }}}">' +
      '<div class="name">{{{ _highlightResult.name.value }}}</div>' +
      '</div>');

    // EVENT LISTENERS
    // Add event listener to clear button
    $( "#clear_input" ).on( "click", function() {
      $( "#search_input" ).val('');
      $(this).css("visibility", "hidden");
    });

    $( "#clear_product" ).on( "click", function() {
      clearSelectionWrapper();
    });

    autocomplete('#search_input', {hint: true}, [
    {
        source: autocomplete.sources.hits(index, {hitsPerPage: 5}),
        displayKey: 'name',
        templates: {
          suggestion: function(suggestion) {
            $("#clear_input").css("visibility", "visible");
            return templateResult.render(suggestion);
          }
        }
      }
    ]).on('autocomplete:selected', function(event, suggestion, dataset) {
      console.log(suggestion, dataset);
      populateSelectedProduct(suggestion);
    });

    function populateSelectedProduct(suggestion) {
      $(".image").attr("src", suggestion.image);
      $(".brand").html(suggestion.brand);
      $(".name").html(suggestion.name);
      $(".price").html("$" + suggestion.price);
      $(".description").html(suggestion.description);
      $(".buy-btn a").attr("href",suggestion.url);
      $(".buy-btn").css("display","block");
      buildShipping(suggestion.free_shipping);
      buildBreadcrumb(suggestion.categories);
    }

    function clearSelectionWrapper() {
      $(".image").attr("src", "");
      $(".brand").html("");
      $(".name").html("");
      $(".price").html("");
      $(".shipping").html("");
      $(".description").html("");
      $(".breadcrumb").html("");
      $(".buy-btn a").attr("href","");
      $(".buy-btn").css("display","none");
    }

    function buildBreadcrumb(categories) {
      var breadcrumb = "";
      $.each(categories, function(i, cat) {
        breadcrumb += cat;
        if (i !== categories.length - 1) {
          breadcrumb += " > ";
        }
      });

      $('.breadcrumb').html(breadcrumb);
    }

    function buildShipping(free_shipping) {
      if (free_shipping == true) {
        $(".shipping").html('Free shipping on this product!');
      } else {
        $(".shipping").html('Shipping and handling charges apply')
      }
    }

});