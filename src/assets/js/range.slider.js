var jq = jQuery.noConflict();

jq(function () {
  jq('.range input').on('mousemove', function () {
    var getValRange = jq(this).val();
    jq('.range span').text(getValRange + ' Rs.');
  });
});