$( document ).ready(function() {

  $('#wineType').hide();
  $('#countryVariety').hide();
  $('#countries').hide();
  $('#redVarieties').hide();

  var zipcode = '';
  var wineType = '';
  var countryVariety = '';

  $('#zipSubmit').click(function() {
    zipcode = $('#zipcode').val();
    $('#wineType').fadeToggle();
  })

  $('#wineType').click(function(e) {
    wineType = $(e.target).val();
    $('#countryVariety').fadeToggle();

  $('#countryVariety').click(function(e) {
      countryVariety = $(e.target).val();
      if(countryVariety === 'country') {
        $('#countries').fadeToggle();
      } else {
        $('#redVarieties').fadeToggle();
      }
    });
  });







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
