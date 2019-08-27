
$(document).ready(function () {
  $('select').formSelect();
});

$(document).ready(function () {
  $('input.autocomplete').autocomplete({
    data: {
      "New York": null,
      "Apple": null,
      "Microsoft": null,
      "Google": 'https://placehold.it/250x250'
    },
  });
});

$(document).ready(function () {
  $('.datepicker').datepicker();
});