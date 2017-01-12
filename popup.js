const torchysOrderPage = 'https://order.torchystacos.com/torchys';

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

    const menuItems = document.querySelectorAll('.menu .button');
    for (var i in menuItems) {
        menuItems[i].addEventListener('click', function(e) {
            console.log(this.dataset.path);
            chrome.tabs.update({ url: `${pageUrl}/m${this.dataset.path}` });
            window.close();
        })
    }
})