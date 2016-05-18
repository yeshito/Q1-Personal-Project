$( document ).ready(function() {

  $('#wineType').hide();
  $('#countryVariety').hide();
  $('#countries').hide();
  $('#redVarieties').hide();
  $('#whiteVarieties').hide();
  hideFinalSelectors();

  var zipcode = '';
  var wineType = '';
  var countryVariety = '';
  var variety = '';
  var country = '';
  var maxPrice = '';

  $('#zipSubmit').mouseup(function() {
    zipcode = $('#zipcode').val();
    console.log(zipcode);
    $('#wineType').fadeIn();
  });

  $('#wineType label').mouseup(function(e) {
    wineType = $(e.target).attr('for');
    $('#countryVariety').hide();
    $('#countries').hide();
    $('#redVarieties').hide();
    $('#whiteVarieties').hide();
    hideFinalSelectors();
    console.log(wineType);

    if(wineType === 'red' || wineType === 'white') {
      $('#countryVariety').fadeIn();

      $('#countryVariety label').mouseup(function(e) {
        $('#redVarieties').hide();
        $('#whiteVarieties').hide();
        $('#countries').hide();
        hideFinalSelectors();
        countryVariety = $(e.target).attr('for');
        console.log(countryVariety);

          if(countryVariety === 'variety' && wineType === 'red') {
            $('#redVarieties').fadeIn();
            $('#countries').hide();
            $('#whiteVarieties').hide();
            hideFinalSelectors();

            $('#redVarieties label').mouseup(function(e) {
              $('#countries').hide();
              $('#whiteVarieties').hide();
              hideFinalSelectors();
              variety = $(e.target).attr('for')
              console.log(variety);
              priceSubmitForm();
            });

          } else if (countryVariety === 'variety' && wineType === 'white'){
            $('#whiteVarieties').fadeIn();
            $('#redVarieties').hide();
            $('#countries').hide();
            hideFinalSelectors();

            $('#whiteVarieties label').mouseup(function(e) {
              variety = $(e.target).attr('for')
              console.log(variety);
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
          country = $(e.target).attr('for')
          console.log(country);
          priceSubmitForm();
        });
      }

      function priceSubmitForm () {
      $('#maxPrice').fadeIn();
      $('#completeButton').hide();

      $('#maxPrice label').mouseup(function(e) {
        maxPrice = $(e.target).attr('for')
        console.log(maxPrice)
        $('#completeButton').fadeIn();
      });

      $('#completeButton').mouseup(function() {});
      }
});











// $.ajax({
//   url: 'https://www.omdbapixxxhfksu.com/?t=Frozen&y=&plot=short&r=json',
//   method: "GET",
//   success: function(data) {
//     alert(JSON.stringify(data));
//   },
//   error: function(errorObject, textStatus) {
//       console.log(errorObject);
//       console.log(textStatus);
//   }
// });
