$( document ).ready(function() {

  $('#wineType').hide();
  $('#countryVariety').hide();
  $('#countries').hide();
  $('#redVarieties').hide();
  $('#whiteVarieties').hide();

  var zipcode = '';
  var wineType = '';
  var countryVariety = '';

  $('#zipSubmit').click(function() {
    zipcode = $('#zipcode').val();
    $('#wineType').fadeIn();
    $('#zipSubmit').fadeOut();
    $('#countryVariety').hide();
    $('#countries').hide();
    $('#redVarieties').hide();
  })

  $('#wineType').click(function(e) {
    wineType = $(e.target).val();
    $('#countryVariety').fadeIn();
  })
  //   if (wineType === "red") {
  //     $('#redVarieties').fadeIn();
  //   }
  // })


});








  // $('#countryVariety').click(function(e) {
  //     countryVariety = $(e.target).val();
  //     if(countryVariety === 'country') {
  //       $('#countries').fadeToggle();
  //     } else {
  //       $('#redVarieties').fadeToggle();
  //     }
  //   });



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
