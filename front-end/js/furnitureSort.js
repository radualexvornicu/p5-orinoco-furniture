// L'URL de l'API
const serverUrl = "http://localhost:3000/api/furniture/";
// Denifir la class
class furnitureSort {
    constructor() {
        console.log('all good here');
        this.furnitures = null;
        this.furniture = null;
        this.basketBack = null;
        this.contact = null;
        this.products = null;
        this.arrayProducts = null;
        this.stuffPost = null;
        this.objectPost = null;
        this.priceFinal = null;
    }
// Appel de l'API => promesse
    getAllFurniture = async function () {
        let response = await fetch(serverUrl)

        if (response.ok) {
            return response.json()
        } else {
            console.error('server return: ', response.status)
        }
    }
// Avec la promese du getAllFurniture => cree la liste du produit stoke dans le serveur
    showAllFurniture() {
        const furnitureAll = this.getAllFurniture();
// Avec la reponse  => une fonction que prend chaque key et value pour creer un item du produit dans le HTML
        furnitureAll.then(function (json) {
            json.forEach(function (furnitureOne) {
// Récupération des photo et nom de chaque produit de l'API pour les afficher en page d'accueil sous forme de liste.
                let iconFurniture = document.createElement("div");
                iconFurniture.setAttribute('class', 'card bg-secondary text-white w-25 m-2');
                iconFurniture.setAttribute('id', 'icon');
                let imageFurniture = document.createElement("img");
                imageFurniture.setAttribute('src', furnitureOne.imageUrl);
                imageFurniture.setAttribute('class', 'card-img-top');
                imageFurniture.setAttribute('alt', 'preview of this furniture');
                let tagFurniture = document.createElement("div");
                tagFurniture.setAttribute('class', 'card-body bg-secondary p-1 text-center');
                let nameFurniture = document.createElement("h3");
                nameFurniture.textContent = furnitureOne.name;
                nameFurniture.setAttribute('class', 'card-title m-0');
                let priceFurniture = document.createElement("p");
                priceFurniture.textContent = furnitureOne.price / 100 + " Euro";
                priceFurniture.setAttribute('class', 'card-text m-0');
 // Ouverture de la page produit correspondant au clic sur la fiche de la page d'accueil, grâce à son id.
                let buttonFurniture = document.createElement("a");
                buttonFurniture.textContent = "Détails " + furnitureOne.name;
                buttonFurniture.setAttribute('class', 'btn btn-warning');
                buttonFurniture.setAttribute('href', 'produit.html?id=' + furnitureOne._id);
                holder.appendChild(iconFurniture);
                iconFurniture.appendChild(imageFurniture);
                iconFurniture.appendChild(tagFurniture);
                tagFurniture.appendChild(nameFurniture);
                tagFurniture.appendChild(priceFurniture);
                tagFurniture.appendChild(buttonFurniture);
            })
        });
    };
// Attrape le paramètre dans l'URL et l'utilise pour fetch get 
// Utilise la réponse pour remplir la carte produit
    getOneFurniture() {
        let id = location.search.substring(4);
        console.log(id);
        fetch(serverUrl + '/' + id)
            .then(response => response.json())
            .then((response) => {
                console.log(this.furniture);
                this.furniture = response;
                console.log(this.furniture);
                document.getElementById('name').textContent = this.furniture.name;
                document.getElementById('image').setAttribute('src', this.furniture.imageUrl);
                document.getElementById('image').setAttribute('alt', 'preview picture of' + this.furniture.name);
                document.getElementById('description').textContent = this.furniture.description;
                document.getElementById('price').textContent = this.furniture.price / 100 + ' Euro';
                this.furniture.varnish.forEach(function (varnishPick) {
                    let varnishIn = document.createElement("option");
                    varnishIn.setAttribute('value', varnishPick);
                    varnishIn.innerText = varnishPick;
                    varnishs.appendChild(varnishIn);
                });
            })
            .catch(function (error) {
                console.log('Problem with fetch to server:' + error.message);
            });
    }
// Avant d'ajoute une furniture dans localStorake => panier
// Verifier si le neuveaux produit existe deja    
    checkIfDuplicat(basketBag, furnitureBasket) {
        let ok = 1;
        for (let i = 0; i < basketBag.length; i++) {
// Si le id existe deja dans le panier
// => augmenter le compteur
            if (basketBag[i].id === this.furniture._id) {
                basketBag[i].count++;
                i = basketBag.length;
                ok = 0;
            }
        }
// Si no => adjoute la furniture aux tablou
        if (ok === 1) {
            console.log(furnitureBasket);
            basketBag.push(furnitureBasket);
            console.log(basketBag);
        }
// Retourner le tablou avec tout les produits
        return basketBag;
    }
// Aux click event ('Metre aux panier')
    addFurniture(event) {
// console.log du furniture qui va etre adjoute aux panier
        console.log(this.furniture);
// Retrouve le panier du localStorage
        let storageBasketBack = localStorage.getItem('storageBasket');
        console.log(storageBasketBack);
// Si le panier existe deja, verifier et adjoute le produit
        if (storageBasketBack) {
            let basketBag = JSON.parse(storageBasketBack);
            if (Array.isArray(basketBag)) {
                let furnitureBasket = {
                    name: this.furniture.name,
                    price: this.furniture.price,
                    id: this.furniture._id,
                    count: 1,
                }
// Apell aux fonction qui verifier si l'utilisateur adjout un neuveau produit
// ou un produit qui exist deja
                this.checkIfDuplicat(basketBag, furnitureBasket);
// Adjoute le tablou avec tous les produid et le neuveaux produit selecte
                let storageBasketGo = JSON.stringify(basketBag);
                console.log(storageBasketGo);
                localStorage.setItem('storageBasket', storageBasketGo);
            }
// Si le panier est vide/il n'exist pas dans le localStorage
// => creer le panier avec le premier produit
        } else {
            let tableBasket = [];
            let furnitureBasket = {
                name: this.furniture.name,
                price: this.furniture.price,
                id: this.furniture._id,
                count: 1,
            }
            console.log(furnitureBasket);
            tableBasket.push(furnitureBasket);
            console.log(tableBasket);

            let storageBasketGo = JSON.stringify(tableBasket);
            console.log(storageBasketGo);
            localStorage.setItem('storageBasket', storageBasketGo);
        }
// Apell aux fonction qui compte le nombre total des produits qui sont dans le panier
        this.getBasketCount();
    }
// Realiser un EventListener ('click) pour le button 'Mettre dans le panier' 
    putInStorage() {
        document.getElementById('basket').addEventListener('click', (event) => {
            console.log(this);
// Apell aux fonction qui va adjoute le produit aux panier
            this.addFurniture(event);
            alert("Vous avez ajouté ce produit dans votre panier!'\n'Vous pourvez returner a la liste des produits!'\n'Ou verifier votre panier!")

        });
    }
// La fonction qui va creer la liste du produit qui c'est trouve dans le panier
// Name, count et price + button de souprime le produit
    createItemsInBasket(basketBag) {
        this.basketBack = basketBag;
        console.log(this.basketBack.length);
        console.log(this.basketBack);
        for (let i = 0; i < this.basketBack.length; i++) {
            console.log('inner for message ok');
// Cree un 'div' HTLM dans le fichier panier.html qui contient le Name, count et price + button de souprime le produit
            let item = document.createElement("div");
// Cree un 'p' avec le Name
            item.setAttribute('id', 'item' + [i]);
            item.setAttribute('class', 'item d-sm-flex justify-content-between align-items-center flex-row bg-warning rounded p-2');
            let name = document.createElement("p");
            name.setAttribute('class', 'w-50 m-0');
            name.textContent = this.basketBack[i].name;
// Cree un 'p' avec le Price
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
            item.appendChild(name);
            item.appendChild(increment);
            item.appendChild(price);
            item.appendChild(cancel);
            basketInner.appendChild(hr);
        }
    }
// La fonction qui va calculer et creer un 'p' HTML avec le prix total des produits du panier
    createTotalprice(basketBag){
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
    createClearBasket(){
        let clearBasket = document.createElement("button");
        clearBasket.setAttribute('id', 'clearBasket');
        clearBasket.setAttribute('class', 'btn btn-danger w-50');
        clearBasket.textContent = 'Vider le panier';
        basket.appendChild(clearBasket);
        clearBasket.addEventListener('click', () => {
            localStorage.clear();
            this.getFromStorage();
            console.log(clearBasket);
            clearBasket.remove();
            document.getElementById('basketInner').remove();
        })
    }
// La fonction qui va creer un 'p' HTML qui va indique que le panier est vide
    createPanierVide(){
        let basketVoid = document.createElement("p");
        basketVoid.setAttribute('id', 'PanierVide');
        basketVoid.setAttribute('class', 'w-50 m-0');
        basketVoid.textContent = 'Panier vide';
        basket.appendChild(basketVoid);
    }
// La fonction qui va verifier les element 'button' pour 'Vider le panier'
// ou qui va indique que le panier est vide ou que il a devenu vide    
    basketTextCheck(basketBag) {
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
    getFromStorage() {
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
// La fonction qui compte la quantite des produits qui sont dans le panier
// l'appel est realise quand la quantite se modifie
    getBasketCount() {
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
            document.getElementById('basketCount').textContent = "0"
        }
    }
// La fonction qui realise la elimination d'un produit ou de reduir ca quantite
    removeFurniture(i) {
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
// Vérifie que les champs du formulaire ne sont pas vides
    checkEmptyInput(event) {
        event.preventDefault();
        let storageBasketBack = localStorage.getItem('storageBasket');
        console.log(storageBasketBack);
        let basketBack = JSON.parse(storageBasketBack);
        console.log(basketBack);
// Si le panier est pas vide et sa longueur supérieur à 0 sinon, alert panier vide
        if (basketBack != null && basketBack.length > 0) {
            var tabId = new Array('formName', 'formPrename', 'formMail', 'formAdresse', 'formCity');
            var tabMessage = new Array('votre nom', 'votre prénom', 'votre email', 'votre adresse', 'votre ville');
            var br = '\n', mes = '';
// Trim permet de eliminer les espaces
            for (var i = 0; i < tabId.length; i++) {
                document.getElementById(tabId[i]).value = document.getElementById(tabId[i]).value.trim();
                if (document.getElementById(tabId[i]).value == '') {
                    mes = mes + br + ' - ' + tabMessage[i] + ' ;';
                }
            }
//si message différent de '', affiche le message en alert sinon... appelle controlPanier
            if (mes != '') {
                alert('ERREUR :' + br + br + 'Il manque :' + mes);
            } else {
                console.log('no empty fields');
                this.controlBasket(event);
            }
        } else {
            alert("Votre panier est vide, merci d'ajouter un article")
        }
    }
// Vérifie les inputs du formulaire
    controlBasket(event) {
        event.preventDefault();
        console.log('Go Go control !');
        let regex = /[~`!#$%\^&*+=\-\[\]\';,/{}|\":<>\?0123456789 ]/;
        let regexAddress = /[~`!#$%\^&*+=\-\[\]\';/{}|\":<>\?]/;
        let regexMail = /.+@.+\..+/;
        let formName = document.getElementById('formName').value;
        let formPrename = document.getElementById('formPrename').value;
        let formAdresse = document.getElementById('formAdresse').value;
        let formCity = document.getElementById('formCity').value;
        let formMail = document.getElementById('formMail').value;
        if(formName.match(regex) || formPrename.match(regex) || formAdresse.match(regexAddress) || formAdresse == ' '  || formCity.match(regex) || !formMail.match(regexMail))
        {
            alert('ERREUR : Veuillez remplir correctement les champs avec des lettres'); 
        }
        else{
            console.log('Ok to POST !');
            this.postFurniture();
        }
    };
// Envoie la requête post de la commande avec le tableau d'items et l'objet contact
    postFurniture() {
        let arrayProductsT = [];
        console.log(this.basketBack)
        this.basketBack.forEach(function (basketBag) {
            console.log('table demanted to be fill')
            arrayProductsT.push(basketBag.id);
            console.log(arrayProductsT);
        });
        this.arrayProducts = arrayProductsT;
        sessionStorage.clear();
        sessionStorage.setItem('name', document.getElementById('formPrename').value);
 //-> l'objet contact
        this.contact = {
            firstName: document.getElementById('formPrename').value,
            lastName: document.getElementById('formName').value,
            address: document.getElementById('formAdresse').value,
            city: document.getElementById('formCity').value,
            email: document.getElementById('formMail').value,
        }
 //-> objet à POST
        let data = {
            products: this.arrayProducts,
            contact: this.contact,
        }
// Définition de la requête POST au serveur
// et des actions: vide le panier (localStorage), met la valeur du montant total du panier dans le localStorage
        console.log(data);
        fetch('http://localhost:3000/api/furniture/order', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 201) {
                return res.json();
            }
        }).then(data => {
            console.log(data.contact);
            console.log(data.orderId);
            sessionStorage.setItem('order', data.orderId);
            sessionStorage.setItem('total', JSON.stringify(this.priceFinal));
// Si le panier est vide la commande n'est pas envoyée au serveur
            if (this.priceFinal == 0) {
                alert("Votre panier est vide, merci d'ajouter un article")
                window.location = 'panier.html';
            }

// Si le panier contient au moins un article, la commande peut être envoyée au serveur
// (si le formulaire est valide)
            if (this.priceFinal != 0) {

                window.location = 'confirmation.html?order=' + data.orderId;
            }
        })
    };
// Affiche le message de confirmation à partir du sessionStorage
    showOrder() {
        console.log('let\'s the show begin !');
        let orderFinal = sessionStorage.getItem('order');
        console.log(orderFinal);
        let priceShow = sessionStorage.getItem('total');
        console.log(priceShow);
        let name = sessionStorage.getItem('name');
        let merciMess = document.getElementById('name');
        let order = document.getElementById('order');
        if (orderFinal != null) {
            merciMess.textContent = name;
            order.textContent = 'Votre commande de ' + priceShow + 'Euro porte le numéro : ' + orderFinal;
            localStorage.clear();
        } else {
            document.getElementById('merci').textContent = 'Something Something!';
            order.textContent = 'Il y a un souci avec votre commande.'
        }
    }
}