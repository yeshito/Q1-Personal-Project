$( document ).ready(function() {

  $('#wineType').hide();
  $('#countryVariety').hide();
  $('#countries').hide();
  $('#redVarieties').hide();
  $('#whiteVarieties').hide();
  hideFinalSelectors();

var wineArguments = {
  wineType: '',
  variety: '',
  country: '',
  maxPrice: ''
}

// since this parameter is not actually used for URL request
var countryVariety = '';
var zipcode = '';
  $('#zipSubmit').mouseup(function() {
    zipcode = $('#zipcode').val();
    console.log(zipcode);
    $('#wineType').fadeIn();
  });

  $('#wineType label').mouseup(function(e) {
    wineArguments.wineType = $(e.target).attr('for');
    $('#countryVariety').hide();
    countryVariety = ''
    $('#countries').hide();
    wineArguments.country = ''
    $('#redVarieties').hide();
    $('#whiteVarieties').hide();
    wineArguments.variety = ''
    hideFinalSelectors();
    console.log(wineArguments.wineType);

    if(wineArguments.wineType === 'red' || wineArguments.wineType === 'white') {
      $('#countryVariety').fadeIn();

      $('#countryVariety label').mouseup(function(e) {
        $('#redVarieties').hide();
        $('#whiteVarieties').hide();
        $('#countries').hide();
        hideFinalSelectors();
        countryVariety = $(e.target).attr('for');
        console.log(countryVariety);

          if(countryVariety === 'variety' && wineArguments.wineType === 'red') {
            $('#redVarieties').fadeIn();
            $('#countries').hide();
            $('#whiteVarieties').hide();
            hideFinalSelectors();

            $('#redVarieties label').mouseup(function(e) {
              $('#countries').hide();
              $('#whiteVarieties').hide();
              hideFinalSelectors();
              wineArguments.variety = $(e.target).attr('for')
              console.log(wineArguments.variety);
              winePrice();
            });

          } else if (countryVariety === 'variety' && wineArguments.wineType === 'white'){
            $('#whiteVarieties').fadeIn();
            $('#redVarieties').hide();
            $('#countries').hide();
            hideFinalSelectors();

            $('#whiteVarieties label').mouseup(function(e) {
              wineArguments.variety = $(e.target).attr('for')
              console.log(wineArguments.variety);
              winePrice();
            });
          } else {
            countrySelection();
          }
      });
    } else {
      $('#whiteVarieties').hide();
      $('#redVarieties').hide();
      $('#countryVariety').hide();
      countrySelection();
    };
  });

      function hideFinalSelectors () {
        $('#maxPrice').hide();
        $('#completeButton').hide();
        $('#noResults').hide();
      }

      function countrySelection () {
      $('#countries').fadeIn();
      $('#maxPrice').hide();
      $('#completeButton').hide();

        $('#countries label').mouseup(function(e) {
          $('#maxPrice').hide();
          wineArguments.country = $(e.target).attr('for')
          console.log(wineArguments.country);
          winePrice();
        });
      }

      function winePrice () {
      $('#maxPrice').fadeIn();
      $('#completeButton').hide();

        $('#maxPrice label').mouseup(function(e) {
          wineArguments.maxPrice = $(e.target).attr('for')
          console.log(wineArguments.maxPrice)
          $('#completeButton').fadeIn();
        });
      };



      $('#completeButton').mouseup(function() {
        $('#wineType').hide();
        $('#countryVariety').hide();
        $('#countries').hide();
        $('#redVarieties').hide();
        $('#whiteVarieties').hide();
        hideFinalSelectors()

        appendWineCrumbsBar();

        function appendWineCrumbsBar () {
          var middleWineCrumb = ''
          if (wineArguments.variety) {
            middleWineCrumb = wineArguments.variety.replace(/\+/g, ' ');
          } else {
            middleWineCrumb = wineArguments.country.replace(/\+/g, ' ');
          };

          var wineCrumbsBar = $(`
            <div class="row">
              <nav class="col s6 offset-s3">
                <div class="nav-wrapper">
                  <div>
                    <a href="#!" class="breadcrumb">${wineArguments.wineType}</a>
                    <a href="#!" class="breadcrumb">${middleWineCrumb}</a>
                    <a href="#!" class="breadcrumb">$${wineArguments.maxPrice}</a>
                  </div>
                </div>
              </nav>
            </div>`)

          $('.container').append(wineCrumbsBar);
        }
        // end appendWineCrumbsBar Function

        var urlInput = '';

        // Takes form data and converts to URL
        for(key in wineArguments) {
          if (wineArguments[key] && wineArguments[key] !== 'The sky is the limit!') {
            if(key === 'wineType') {
              if (wineArguments[key] === 'sparkling' || wineArguments[key] === 'dessert') {
                urlInput += `&t=${wineArguments[key]}`;
              } else {
                urlInput += `&t=wine&color=${wineArguments[key]}`;
              }
            } else if (key === 'maxPrice') {
              urlInput += `&xp=${wineArguments[key]}`
            } else {
              urlInput += `&q=${wineArguments[key]}`
            }
          }
        }

        var finalURLRequest = `https://api.snooth.com/wines/?akey=977mbzz45u7unhx1vg0fs4iw9r8wpzmpxm78d1yf89dhueit&n=20&c=US&lang=en&s=sr${urlInput}`
        console.log(finalURLRequest);
        var wineResultsArray = []

        // initial ajax request
        $.ajax({
          url: finalURLRequest,
          method: "GET",
          success: function(data) {
            data = JSON.parse(data)
            var numReturnedWines = data.meta.returned;
            console.log('returned wines ' + numReturnedWines);

            if (!numReturnedWines) {
              $('#noResults').fadeIn();
              $('.container').remove('.row:last-child')
            } else {

              if (numReturnedWines < 4) {
                wineResultsArray = data.wines;
              } else if (numReturnedWines <= 30) {
                selectThreeWines(numReturnedWines);
              } else {
                selectThreeWines(30)
              }
              console.log(wineResultsArray);

              createWineCardRow(wineResultsArray);

              function selectThreeWines (winesAmount) {
                var previousChoices = [];

                do {
                  var currentWineChoice = Math.floor(Math.random() * winesAmount)
                  if (previousChoices.indexOf(currentWineChoice) === -1) {
                    wineResultsArray.push(data.wines[currentWineChoice]);
                    previousChoices.push(currentWineChoice);
                  }
                } while (wineResultsArray.length < 3);
                console.log(previousChoices);
              }
            }
            },
          error: function(errorObject, textStatus) {
              console.log(errorObject);
              console.log(textStatus);
          }
        });
      });
  // functions used to create wine row

    function createWineCardRow (wineArray)  {
      var cardRow = $('<div class="row">')
      $('.container').append(cardRow);
      wineArray.forEach(function(wineElement) {
        var cardDiv = createBottle(wineElement);
        cardRow.append(cardDiv);
      });
      //$('.container').append('</div>');
      populateMoreData();
    }

    function createBottle(wineObject) {
      var wineSearchName = wineObject.name.replace(/ /g, '+');
      var cardImage = '';

      // creates image div only if there is an image url returned
      if (wineObject.image) {
        var httpImgURLString = wineObject.split('s').join('');
        console.log(httpImgURLString);
        cardImage = `<div class="card-image waves-effect waves-block waves-light">
                          <img src=${httpImgURLString}>
                         </div>`;
      }

      return $(`<div class="col l4">
        <div class="card hoverable">
        ${cardImage}
         <div class="card-content paper1">
               <span class="card-title grey-text text-darken-4">${wineObject.name}</span>
                 <p>Region: ${wineObject.region}</p>
                 <p>Winery: ${wineObject.winery}</p>
                 <p>Varietal: ${wineObject.varietal}</p>
                 <p>Type: ${wineObject.type}</p>
                 <p>Price: $${wineObject.price}</p>
                 <p>Snoothrank: ${wineObject.snoothrank}</p>
               <div class="card-action">
                 <a target="_blank" href="http://www.wine-searcher.com/find/${wineSearchName}/1/usa-${zipcode}-100?Xlist_format=&Xbottle_size=all&Xprice_set=CUR&Xprice_min=&Xprice_max=&Xshow_favourite=">Buy</a>
                 <a href="#" class="activator" id=${wineObject.code}>More</a>
               </div>
         </div>
         <div class="card-reveal paper2">
           <span class="card-title grey-text text-darken-4">${wineObject.name}<i class="material-icons right">close</i></span>
           <a target="_blank" href="http://www.wine-searcher.com/find/${wineSearchName}/1/usa-${zipcode}-100?Xlist_format=&Xbottle_size=all&Xprice_set=CUR&Xprice_min=&Xprice_max=&Xshow_favourite=">Buy</a>
         </div>
        </div>
        </div>`);
    };


    function populateMoreData () {

      $('.activator').one('click', function(e) {
        var bottleID = this.id;
        var divToPopulate = $(this).parent().parent().next();
        console.log(this);
        console.log(bottleID);
        var bottleURL = `https://api.snooth.com/wine/?akey=977mbzz45u7unhx1vg0fs4iw9r8wpzmpxm78d1yf89dhueit&food=1&lang=en&id=${bottleID}`
        console.log(bottleURL)

        $.ajax({
          url: bottleURL,
          method: "GET",
          success: function(data) {
            data = JSON.parse(data)
            var wineryNotes = data.wines[0].winery_tasting_notes;
            var wineMakerNotes = data.wines[0].wm_notes;
            $(divToPopulate).append(`<p>${wineryNotes}${wineMakerNotes}</p>`)
          },
          error: function(errorObject, textStatus) {
              console.log(errorObject);
              console.log(textStatus);
          }
        })
      });
    };

});
