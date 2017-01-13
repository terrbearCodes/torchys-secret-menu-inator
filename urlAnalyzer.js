console.log('ABCD')

const storeLocation = window.location.pathname.split('/')[2];
chrome.storage.sync.set({storeLocation}, function(items){
});