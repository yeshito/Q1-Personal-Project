$( document ).ready(function() {

  $('#wineType').hide();
  $('#countryVariety').hide();
  $('#countries').hide();
  $('#redVarieties').hide();
  $('#whiteVarieties').hide();
  hideFinalSelectors();

var wineArguments = {
  zipcode: '',
  wineType: '',
  variety: '',
  country: '',
  maxPrice: ''
}

// since this parameter is not actually used for URL request
var countryVariety = ''


  $('#zipSubmit').mouseup(function() {
    wineArguments.zipcode = $('#zipcode').val();
    console.log(wineArguments.zipcode);
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
            middleWineCrumb = wineArguments.variety;
          } else {
            middleWineCrumb = wineArguments.country;
          };

          var wineCrumbsBar = $(`
            <div class="row">
              <nav>
                <div class="nav-wrapper">
                  <div class="col s6 offset-s3">
                    <a href="#!" class="breadcrumb">${wineArguments.wineType}</a>
                    <a href="#!" class="breadcrumb">${middleWineCrumb}</a>
                    <a href="#!" class="breadcrumb">${wineArguments.maxPrice}</a>
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
          if (wineArguments[key] && wineArguments[key] !== 'Make it rain!') {
            if(key === 'wineType') {
              if (wineArguments[key] === 'sparkling' || wineArguments[key] === 'dessert') {
                urlInput += `&t=${wineArguments[key]}`;
              } else {
                urlInput += `&t=wine&color=${wineArguments[key]}`;
              }
            } else if (key === 'zipcode') {
              urlInput += `&z=${wineArguments[key]}`;
            } else if (key === 'maxPrice') {
              urlInput += `&xp=${wineArguments[key]}`
            } else {
              urlInput += `&q=${wineArguments[key]}`
            }
          }
        }

        var finalURLRequest = `http://api.snooth.com/wines/?akey=977mbzz45u7unhx1vg0fs4iw9r8wpzmpxm78d1yf89dhueit&n=100&c=US&lang=en&s=sr${urlInput}`
        var wineResultsArray = []

        // initial ajax request
        $.ajax({
          url: finalURLRequest,
          method: "GET",
          success: function(data) {
            data = JSON.parse(data)
            var numReturnedWines = data.meta.returned;
            console.log('returned wines ' + numReturnedWines);

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

      return $(`<div class="col l4">
        <div class="card hoverable">
        <div class="card-image waves-effect waves-block waves-light">
          <img src=${wineObject.image}>
        </div>
         <div class="card-content paper1">
               <span class="card-title grey-text text-darken-4">${wineObject.name}</span>
                 <p>Region: ${wineObject.region}</p>
                 <p>Winery: ${wineObject.winery}</p>
                 <p>Varietal: ${wineObject.varietal}</p>
                 <p>Type: ${wineObject.type}</p>
                 <p>Price: $${wineObject.price}</p>
                 <p>Snoothrank: ${wineObject.snoothrank}</p>
               <div class="card-action">
                 <a target="_blank" href="http://www.wine-searcher.com/find/${wineSearchName}/1/usa-${wineArguments.zipcode}-20?Xlist_format=&Xbottle_size=all&Xprice_set=CUR&Xprice_min=&Xprice_max=&Xshow_favourite=">Buy</a>
                 <a class="activator" id=${wineObject.code}>More</a>
               </div>
         </div>
         <div class="card-reveal paper2">
           <span class="card-title grey-text text-darken-4">${wineObject.name}<i class="material-icons right">close</i></span>
           <a target="_blank" href="http://www.wine-searcher.com/find/${wineSearchName}/1/usa-${wineArguments.zipcode}-20?Xlist_format=&Xbottle_size=all&Xprice_set=CUR&Xprice_min=&Xprice_max=&Xshow_favourite=">Buy</a>
           <p></p>
         </div>
        </div>
        </div>`);
    };


    function populateMoreData () {

      $('.activator').one('click', function(e) {
        var bottleID = this.id;
        console.log(bottleID);
        var bottleURL = `http://api.snooth.com/wine/?akey=977mbzz45u7unhx1vg0fs4iw9r8wpzmpxm78d1yf89dhueit&food=1&lang=en&c=US&z=${wineArguments.zipcode}&id=${bottleID}`
        console.log(bottleURL)

        $.ajax({
          url: bottleURL,
          method: "GET",
          success: function(data) {
            data = JSON.parse(data)
            console.log(data);
          },
          error: function(errorObject, textStatus) {
              console.log(errorObject);
              console.log(textStatus);
          }
        })
      });
    };

});
