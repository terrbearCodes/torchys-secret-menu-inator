const torchysOrderPage = 'https://order.torchystacos.com/torchys';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Things happening')
});

document.querySelector('#goto').addEventListener('click', function(e) {
    chrome.tabs.create({ url: torchysOrderPage });
    window.close();
})


chrome.tabs.query({ active: true }, function(tabs) {
    const currentTab = tabs[0];
    const pageUrl = currentTab.url;
    const parts = pageUrl.split('/');


    if (pageUrl.startsWith(torchysOrderPage) && parts[4]) {
        document.querySelector('.menu').classList.toggle('hide-it');
        document.querySelector('.navigation').classList.toggle('hide-it');
    }
})