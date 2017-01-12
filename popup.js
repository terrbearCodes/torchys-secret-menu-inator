const torchysOrderPage = 'https://order.torchystacos.com/torchys';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Things happening')
});


chrome.tabs.query({ active: true }, function(tabs) {
    const currentTab = tabs[0];
    const pageUrl = currentTab.url;
    console.log(pageUrl)

    if (pageUrl.startsWith(torchysOrderPage)) {
        document.querySelector('.menu').classList.toggle('hide-it');
        document.querySelector('.navigation').classList.toggle('hide-it');
    }
})