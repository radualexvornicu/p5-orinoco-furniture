// La fonction qui compte la quantite des produits qui sont dans le panier
    // l'appel est realise quand la quantite se modifie
   function getBasketCount(){
        let storageBasketBack = localStorage.getItem('storageBasket');
        console.log(storageBasketBack);
        let basketBag = JSON.parse(storageBasketBack);
        console.log(basketBag);
        if (storageBasketBack) {
            let count = 0;
            for (let j = 0; j < basketBag.length; j++) {
                count += basketBag[j].count;
            }
            document.getElementById('basketCount').textContent = count;
        } else {
            document.getElementById('basketCount').textContent = "0";
        }
    }