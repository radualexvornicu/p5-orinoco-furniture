// La fonction qui trouve dans le localStorage pour retrouver les produits du panier
// et affiche tous les produits du panier
getFromStorage = () => {
    let storageBasketBack = localStorage.getItem('storageBasket');
    let basketBag = JSON.parse(storageBasketBack);
    if (storageBasketBack && storageBasketBack.length > 0) {
        if (Array.isArray(basketBag)) {
            if (basketBag.length == 0) {
                // Si le panier est vide
                // apell aux fonction qui verifier les message correct
                basketTextCheck(basketBag);
            } else {
                // Si le panier n'est pas vide
                // appel aux fonction qui verifier les message correct
                basketTextCheck(basketBag);
                // appel aux fonction qui affiche le Name, count et price
                createItemsInBasket(basketBag);
                // appel aux fonction qui affiche prix total des produits
                createTotalprice(basketBag);
                // appel aux fonction qui crée le 'button' HTML 'vide le panier'
                createClearBasket();
            }
        } else {
            console.log('this is not a table');
        }
    } else {
        createPanierVide();
    }  
}
createItemsInBasket = (basketBack) => {
    for (let i = 0; i < basketBack.length; i++) {
        // Créer un 'div' HTML dans le fichier panier.html qui contient le Name, count et price + button de supprimer le produit
        let item = document.createElement("div");
        // Créer un 'img' avec la Icon du produit
        item.setAttribute('id', 'item' + [i]);
        item.setAttribute('class', 'd-flex justify-content-between align-items-center flex-row bg-warning rounded p-2');
        let icon = document.createElement("img");
        icon.setAttribute('src', basketBack[i].url);
        icon.setAttribute('class', 'img-fluid rounded w-25');
        icon.setAttribute('alt', 'icon of this furniture');
        // Créer un 'p' avec le Nom
        let name = document.createElement("h6");
        name.setAttribute('class', 'w-25 m-2 ');
        name.textContent = basketBack[i].name;
        // Créer un 'p' avec le Prix
        let price = document.createElement("h6");
        price.setAttribute('class', 'w-25 m-1 ');
        price.textContent = basketBack[i].count * basketBack[i].price / 100 + ' Euro';
        // Créer un 'p' avec la quantité
        let increment = document.createElement("h6");
        increment.setAttribute('class', 'w-25 m-1 ');
        increment.textContent = 'X ' + basketBack[i].count;
        // Créer un 'button' de supprimer le produit ou de diminuer la quantité
        let cancel = document.createElement("button");
        cancel.setAttribute('id', 'cancel' + [i]);
        cancel.setAttribute('class', 'btn btn-danger ');
        cancel.textContent = "x";
        cancel.addEventListener('click', (event) => {
            removeFurniture(i);
            getBasketCount();
        })
        let minus = document.createElement("button");
        minus.setAttribute('id', 'minus' + [i]);
        minus.setAttribute('class', 'btn btn-danger m-1 h6 ');
        minus.textContent = "-";
        minus.addEventListener('click', (event) =>{
            minusFurniture(i);
            getBasketCount();
        })
        let plus = document.createElement("button");
        plus.setAttribute('id', 'plus' + [i]);
        plus.setAttribute('class', 'btn btn-info m-1 h6 ');
        plus.textContent = "+";
        plus.addEventListener('click', (event) =>{
            plusFurniture(i);
            getBasketCount();
        })
        let hr = document.createElement("hr");
        basketInner.appendChild(item);
        item.appendChild(icon);
        item.appendChild(name);
        item.appendChild(minus);
        item.appendChild(plus);
        item.appendChild(increment);            
        item.appendChild(price);
        item.appendChild(cancel);
        basketInner.appendChild(hr);
    }
}
// La fonction qui va calculer et créer un 'p' HTML avec le prix total des produits du panier
createTotalprice = (basketBack) => {
    let total = 0;
    basketBack.forEach(function (basketBag) {
        total += basketBag.count * basketBag.price / 100;
    })
    let priceTotal = document.createElement("h4");
    priceTotal.setAttribute('id', 'priceTotal')
    priceTotal.setAttribute('class', 'p-2 m-0 w-100 ');
    priceTotal.textContent = 'Prix total : ' + total + ' Euro';
    basketInner.appendChild(priceTotal);
}
// La fonction qui va créer un 'button' HTML pour vider le panier
createClearBasket = () => {
    let clearBasket = document.createElement("button");
    clearBasket.setAttribute('id', 'clearBasket');
    clearBasket.setAttribute('class', 'btn btn-danger w-50');
    clearBasket.textContent = 'Vider le panier';
    basket.appendChild(clearBasket);
    clearBasket.addEventListener('click', () => {
        localStorage.clear();
        getFromStorage();
        getBasketCount();
        clearBasket.remove();
        document.getElementById('basketInner').remove();
    })
}
// La fonction qui va créer un 'p' HTML qui va indique que le panier est vide
createPanierVide = () => {
    if (!document.getElementById('PanierVide')) {
        let basketVoid = document.createElement("p");
        basketVoid.setAttribute('id', 'PanierVide');
        basketVoid.setAttribute('class', 'w-50 m-0');
        basketVoid.textContent = 'Panier vide';
        basket.appendChild(basketVoid);
    }
}
// La fonction qui va vérifier les élément 'button' pour 'Vider le panier'
// ou qui va indique que le panier est vide ou qu'il a devenu vide 
basketTextCheck = (basketBag) => {
    if (basketBag.length == 0) {
        this.createPanierVide();
        if (document.getElementById('clearBasket')) {
            document.getElementById('clearBasket').remove();
            document.getElementById('PanierVide').remove();
        } else {
            if(document.getElementById('basketInner')){
                document.getElementById('basketInner').remove();
            }
        }
    } else {
        document.getElementById('basketInner').innerHTML = null;
        if (document.getElementById('clearBasket')) {
            document.getElementById('clearBasket').remove();
        }
    }
}
 // La fonction qui réalise la augmentation du quantité
 plusFurniture = (i) => {
    let storageBasketBack = localStorage.getItem('storageBasket');
    let basketBag = JSON.parse(storageBasketBack);
    basketBag[i].count++;
    let storageBasketGo = JSON.stringify(basketBag);
    localStorage.setItem('storageBasket', storageBasketGo);  
    getFromStorage();
    }
// La fonction qui réalise la elimination d'un produit ou de réduire sa quantité
minusFurniture = (i) => {
    // Si la quantite est plus de 1, réduire la quantité
    let storageBasketBack = localStorage.getItem('storageBasket');
    let basketBack = JSON.parse(storageBasketBack);
    if (basketBack[i].count > 1) {
        basketBack[i].count--;
        let storageBasketBack = JSON.stringify(basketBack);
        localStorage.clear();
        localStorage.setItem('storageBasket', storageBasketBack);
        // Si la quantité est unique, éliminer totalement le produit et son contenu HTML
    } else {
        if (confirm("vous êtes sur le point de supprimer l'élément, vraiment supprimer?")) {
            basketBack.splice(i, 1);
            let storageBasketBack = JSON.stringify(basketBack);
            localStorage.clear();
            localStorage.setItem('storageBasket', storageBasketBack);
            // Après la elimination, recréer la liste des produits
            getFromStorage();
          } else {
            // Do nothing!
          }           
    }
    // Après la réduction du quantite, recréer la liste des produits        
    getFromStorage();
    // Et compte le nombre des produits
}
removeFurniture = (i) => {
    let storageBasketBack = localStorage.getItem('storageBasket');
    let basketBack = JSON.parse(storageBasketBack);
    if (confirm("vous êtes sur le point de supprimer l'élément, vraiment supprimer?")) {
        basketBack.splice(i, 1);
        let storageBasketBack = JSON.stringify(basketBack);
        localStorage.clear();
        localStorage.setItem('storageBasket', storageBasketBack);
        // Après la elimination, recréer la liste des produits
        getFromStorage();
      } else {
        // Do nothing!
        console.log('Thing was not saved to the database.');
      }  
      // Après la réduction du quantite, recréer la liste des produits        
    getFromStorage();
    // Et compte le nombre des produits
}
