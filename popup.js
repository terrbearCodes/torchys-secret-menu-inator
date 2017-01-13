const torchysOrderPage = 'https://order.torchystacos.com/torchys';
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('storeLocation', function(items){
        console.log(items);
        const lastLocation = document.querySelector('#orderlast');
        if(!items.storeLocation){
            lastLocation.classList.toggle('hide-it');
        }else{
            lastLocation.addEventListener('click', function(e){
                chrome.tabs.create({url: `${torchysOrderPage}/${items.storeLocation}`});
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
            chrome.storage.sync.set({'storeLocation': parts[4]}, function(items){
                document.querySelector('.menu').classList.toggle('hide-it');
                document.querySelector('.navigation').classList.toggle('hide-it');

                const menuItems = document.querySelectorAll('.menu .button');
                for (var i in menuItems) {
                    menuItems[i].addEventListener('click', function(e) {
                        console.log(this.dataset.path);
                        chrome.tabs.update({ url: `${torchysOrderPage}/${parts[4]}/m${this.dataset.path}` });
                        window.close();
                    })
                }
            })
            
        }

        
    })
})