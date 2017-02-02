/** GA Tracking Stuff **/
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-91318191-1', 'auto');
ga('send', 'pageview');
/** End GA Tracking **/

const torchysOrderPage = 'https://order.torchystacos.com/torchys';

chrome.storage.sync.get('storeLocation', function(items) {
    const lastLocation = document.querySelector('#orderlast');
    if (!items.storeLocation) {
        lastLocation.classList.toggle('hide-it');
    } else {
        lastLocation.addEventListener('click', function(e) {
            chrome.tabs.create({ url: `${torchysOrderPage}/${items.storeLocation}` });
            window.close();
        })
    }
})

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

        chrome.storage.sync.set({ 'storeLocation': parts[4] }, function(items) {

            const menuItems = document.querySelectorAll('.menu .button');
            for (i = 0; i < menuItems.length; i++) {
                menuItems[i].addEventListener('click', function(e) {
                    ga(
                        'send', 
                        'event', 
                        parts[4], //location
                        'secret',
                        e.target.innerText //Menu Item
                    );
                    chrome.tabs.update({ url: `${torchysOrderPage}/${parts[4]}/m${this.dataset.path}` });
                    window.close();
                })
            }
        })

    }
})