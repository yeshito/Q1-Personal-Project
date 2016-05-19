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
              priceSubmitForm();
            });

          } else if (countryVariety === 'variety' && wineArguments.wineType === 'white'){
            $('#whiteVarieties').fadeIn();
            $('#redVarieties').hide();
            $('#countries').hide();
            hideFinalSelectors();

            $('#whiteVarieties label').mouseup(function(e) {
              wineArguments.variety = $(e.target).attr('for')
              console.log(wineArguments.variety);
              priceSubmitForm();
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
          priceSubmitForm();
        });
      }

      function priceSubmitForm () {
      $('#maxPrice').fadeIn();
      $('#completeButton').hide();

      $('#maxPrice label').mouseup(function(e) {
        wineArguments.maxPrice = $(e.target).attr('for')
        console.log(wineArguments.maxPrice)
        $('#completeButton').fadeIn();
      });

      $('#completeButton').mouseup(function() {
        var urlInput = '';
        var wineResultsArray = []

        for(key in wineArguments) {
          if (wineArguments[key] && wineArguments[key] !== '0') {
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
        // zipcode = &z='';
        //  wineType = &t='sparkling, dessert', &color='red, white, rose'
        //  variety = ''; put straight into beginning
        //  country = ''; put straight into beginning
        //  maxPrice = ''; if false do not add else &xp=''
        $.ajax({
          url: finalURLRequest,
          method: "GET",
          success: function(data) {
            // console.log(data, "SHOW ME THE DATA")
            console.log(JSON.parse(data).meta.results);
            data = JSON.parse(data)
            // var numReturnedWines = JSON.parse(data).meta.results;
            var numReturnedWines = data.meta.results;


            var selectThreeWines = function (winePool) {
              var previousChoices = [];

              do {
                var currentWineChoice = Math.floor(Math.random() * winePool)
                if (previousChoices.indexOf(currentWineChoice) === -1) {
                  wineResultsArray.push(data.wines[currentWineChoice]);
                  previousChoices.push(currentWineChoice);
                }
              } while (wineResultsArray.length < 3);

            } // end function;

            if (numReturnedWines < 4) {
              wineResultsArray = data.wines;
            } else if (numReturnedWines <= 40) {
              selectThreeWines(numReturnedWines);
            } else {
              selectThreeWines(40)
            }
            console.log(wineResultsArray);
          },
          error: function(errorObject, textStatus) {
              console.log(errorObject);
              console.log(textStatus);
          }
        });

      });
      }
});
