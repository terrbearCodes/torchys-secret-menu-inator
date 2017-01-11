
document.addEventListener('DOMContentLoaded', function() {
  console.log('Things happening')
  chrome.tabs.executeScript({
    code: "window.getSelection().toString()"
  }, function(selection){
    document.getElementById('selection').innerHTML = selection;
  });
});
