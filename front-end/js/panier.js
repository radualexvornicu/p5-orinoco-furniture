// La fonction qui va creer la liste du produit qui ce trouver dans le panier
    // Name, count et price + button de souprime le produit
  function  createItemsInBasket(basketBag) {
        this.basketBack = basketBag;
        console.log(this.basketBack.length);
        console.log(this.basketBack);
        for (let i = 0; i < this.basketBack.length; i++) {
            console.log('inner for message ok');
            // Cree un 'div' HTLM dans le fichier panier.html qui contient le Name, count et price + button de souprime le produit
            let item = document.createElement("div");
            // Cree un 'img' avec la image du produit
            item.setAttribute('id', 'item' + [i]);
            item.setAttribute('class', 'item d-sm-flex justify-content-between align-items-center flex-row bg-warning rounded p-2');
            let icon = document.createElement("img");
            icon.setAttribute('src', this.basketBack[i].url);
            icon.setAttribute('class', 'img-fluid rounded w-25');
            icon.setAttribute('alt', 'icon of this furniture');
            // Cree un 'p' avec le Nom
            let name = document.createElement("p");
            name.setAttribute('class', 'w-50 m-1');
            name.textContent = this.basketBack[i].name;
            // Cree un 'p' avec le Prix
            let price = document.createElement("p");
            price.setAttribute('class', 'w-50 m-0');
            price.textContent = this.basketBack[i].count * this.basketBack[i].price / 100 + ' Euro';
            // Cree un 'p' avec la quantite
            let increment = document.createElement("p");
            increment.setAttribute('class', 'w-50 m-0');
            increment.textContent = 'X ' + this.basketBack[i].count;
            // Cree un 'button' de souprime le produit ou de diminue la quantite
            let cancel = document.createElement("button");
            cancel.setAttribute('id', 'cancel' + [i]);
            cancel.setAttribute('class', 'close text-success');
            cancel.textContent = "x"
            cancel.addEventListener('click', (event) => {
                console.log('this furniture is removed');
                this.removeFurniture(i);
            })
            let hr = document.createElement("hr");
            basketInner.appendChild(item);
            item.appendChild(icon);
            item.appendChild(name);
            item.appendChild(increment);
            item.appendChild(price);
            item.appendChild(cancel);
            basketInner.appendChild(hr);
        }
    };
    // La fonction qui va calculer et creer un 'p' HTML avec le prix total des produits du panier
   function createTotalprice(basketBag) {
        this.basketBack = basketBag;
        let total = 0;
        this.basketBack.forEach(function (basketBag) {
            total += basketBag.count * basketBag.price / 100;
        })
        this.priceFinal = total;
        console.log(this.priceFinal);
        let priceTotal = document.createElement("div");
        priceTotal.setAttribute('class', 'p-2 w-50 m-0');
        priceTotal.textContent = 'Prix total : ' + this.priceFinal + ' Euro';
        basketInner.appendChild(priceTotal);
    }
    // La fonction qui va creer un 'button' HTML pour vider le panier
  function  createClearBasket() {
        let clearBasket = document.createElement("button");
        clearBasket.setAttribute('id', 'clearBasket');
        clearBasket.setAttribute('class', 'btn btn-danger w-50');
        clearBasket.textContent = 'Vider le panier';
        basket.appendChild(clearBasket);
        clearBasket.addEventListener('click', () => {
            localStorage.clear();
            this.getFromStorage();
            this.getBasketCount();
            console.log(clearBasket);
            clearBasket.remove();
            document.getElementById('basketInner').remove();
        })
    }
    // La fonction qui va creer un 'p' HTML qui va indique que le panier est vide
   function createPanierVide() {
        let basketVoid = document.createElement("p");
        basketVoid.setAttribute('id', 'PanierVide');
        basketVoid.setAttribute('class', 'w-50 m-0');
        basketVoid.textContent = 'Panier vide';
        basket.appendChild(basketVoid);
    }
    // La fonction qui va verifier les element 'button' pour 'Vider le panier'
    // ou qui va indique que le panier est vide ou que il a devenu vide    
   function basketTextCheck(basketBag) {
        if (basketBag.length == 0) {
            console.log(basketBag.length);
            this.createPanierVide();
            if (document.getElementById('clearBasket')) {
                document.getElementById('clearBasket').remove();
                document.getElementById('PanierVide').remove();
            } else {
                document.getElementById('basketInner').remove();
            }
        } else {
            document.getElementById('basketInner').innerHTML = null;
            if (document.getElementById('clearBasket')) {
                document.getElementById('clearBasket').remove();
            }
        }
    }
    // La fonction qui trouve dans le localStorage pour retruve les produits du panier
    // et affiche tous les produits du panier
  function  getFromStorage() {
        console.log("in the panier we GO");
        let storageBasketBack = localStorage.getItem('storageBasket');
        console.log(storageBasketBack);
        let basketBag = JSON.parse(storageBasketBack);
        console.log(basketBag);
        if (storageBasketBack && storageBasketBack.length > 0) {
            let basketBag = JSON.parse(storageBasketBack);
            if (Array.isArray(basketBag)) {
                if (basketBag.length == 0) {
                    // Si le panier est vide
                    // apell aux fonction qui verifier les message correct
                    this.basketTextCheck(basketBag);
                } else {
                    // Si le panier n'est pas vide
                    // apell aux fonction qui verifier les message correct
                    this.basketTextCheck(basketBag);
                    // apell aux fonction qui affiche le Name, count et price
                    this.createItemsInBasket(basketBag);
                    // apell aux fonction qui affiche prix total des produits
                    this.createTotalprice(basketBag);
                    // apell aux fonction qui cree le 'button' HTML 'vide le panier'
                    this.createClearBasket();
                }
            } else {
                console.log('this is not a table');
            }
        } else {
            this.createPanierVide();
        }
        document.getElementById('sendPost').addEventListener('click', (event) => {
            console.log('we have a click');
            this.checkEmptyInput(event);
        })
    }
    // La fonction qui realise la elimination d'un produit ou de reduir ca quantite
  function  removeFurniture(i) {
        console.log('it has been canceled');
        // Si la quantite est plus de 1, reduir la quantite
        if (this.basketBack[i].count > 1) {
            console.log('count reduced');
            this.basketBack[i].count -= 1;
            console.log(this.basketBack[i].count);
            let storageBasketBack = JSON.stringify(this.basketBack);
            localStorage.clear();
            localStorage.setItem('storageBasket', storageBasketBack);
            console.log('localStorage has been updated? after the count reduce?');
            // Si la quantite est unique, eliminer totalement le produit et son contenu HTLM
        } else {
            this.basketBack.splice(i, 1);
            console.log(this.basketBack);
            let storageBasketBack = JSON.stringify(this.basketBack);
            console.log(storageBasketBack);
            localStorage.clear();
            console.log('localStorage empty');
            localStorage.setItem('storageBasket', storageBasketBack);
            console.log('localStorage has been updated?');
            // Apre la elimination, recreer la liste des produits
            this.getFromStorage();
        }
        // Apre la reduction du quantite, recreer la liste des produits        
        this.getFromStorage();
        // Et compte la nombre des produits
        this.getBasketCount();
    }