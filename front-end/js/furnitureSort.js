const serverUrl = "http://localhost:3000/api/furniture/";

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

    getAllFurniture = async function () {
        let response = await fetch(serverUrl)

        if (response.ok) {
            return response.json()
        } else {
            console.error('server return: ', response.status)
        }

    }

    showAllFurniture() {
        const furnitureAll = this.getAllFurniture();
        furnitureAll.then(function (json) {
            json.forEach(function (furnitureOne) {
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
                let buttonFurniture = document.createElement("a");
                buttonFurniture.textContent = "Détails " + furnitureOne.name;
                buttonFurniture.setAttribute('class', 'btn btn-warning');
                buttonFurniture.setAttribute('href', 'product.html?id=' + furnitureOne._id);
                holder.appendChild(iconFurniture);
                iconFurniture.appendChild(imageFurniture);
                iconFurniture.appendChild(tagFurniture);
                tagFurniture.appendChild(nameFurniture);
                tagFurniture.appendChild(priceFurniture);
                tagFurniture.appendChild(buttonFurniture);
            })
        });
    };
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

    addFurniture(event) {
        console.log(this.furniture);
        let storageBasketBack = localStorage.getItem('storageBasket');
        console.log(storageBasketBack);
        if (storageBasketBack) {
            let basketBag = JSON.parse(storageBasketBack);
            if (Array.isArray(basketBag)) {
               let furnitureBasket = {
                    name: this.furniture.name,
                    price: this.furniture.price,
                    id: this.furniture._id,
                    count: 1,
                }
                console.log(furnitureBasket);
                basketBag.push(furnitureBasket);
                console.log(basketBag);
                let storageBasketGo = JSON.stringify(basketBag);
                console.log(storageBasketGo);
                localStorage.setItem('storageBasket', storageBasketGo);
            }
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
    }
    putInStorage() {
        document.getElementById('basket').addEventListener('click', (event) => {
            console.log(this);
            this.addFurniture(event);
            alert("Vous avez ajouté ce produit dans votre panier!'\n'Vous pourvez returner a la liste des produits!'\n'Ou verifier votre panier!")

        });
    }
    
    countDuplicat(basketBag){
        for (let j = 1; j < basketBag.length; j++){
            for (let x = j; x < basketBag.length; x++) 
           if(basketBag[j-1].id === basketBag[x].id){
                basketBag[j-1].count+=1;
                this.removeDuplicat(x);
            }
        }
        for (let j = 1; j < basketBag.length; j++){
            if(basketBag[j-1].id === basketBag[j].id){
                basketBag[j-1].count+=1;
                this.removeDuplicat(j);
            }
        }
    }
    removeDuplicat(i) {
        console.log('we have a duplicat');
        this.basketBack.splice(i, 1);
        let storageBasketBack = JSON.stringify(this.basketBack);
        console.log(storageBasketBack);
        localStorage.clear();
        console.log('localStorage empty');
        localStorage.setItem('storageBasket', storageBasketBack);
        console.log('localStorage has been updated?');
    }
      
    getFromStorage() {
        let storageBasketBack = localStorage.getItem('storageBasket');
        console.log(storageBasketBack);
        let basketBag = JSON.parse(storageBasketBack);
        console.log(basketBag);
        if (storageBasketBack && storageBasketBack.length > 0) {
            let basketBag = JSON.parse(storageBasketBack);
            if (Array.isArray(basketBag)) {
                if (basketBag.length == 0) {
                    console.log(basketBag.length);
                    let basketVoid = document.createElement("p");
                    basketVoid.setAttribute('class', '');
                    basketVoid.textContent = 'Panier vide';
                    basket.appendChild(basketVoid);

                    if (document.getElementById('clearBasket')) {
                        document.getElementById('clearBasket').remove();
                    } else {
                        document.getElementById('basketInner').remove();

                    }
                } else {
                    document.getElementById('basketInner').innerHTML = null;
                    if (document.getElementById('clearBasket')) {
                        document.getElementById('clearBasket').remove();
                    } else {
                    }
                    this.basketBack = basketBag;
                    console.log(basketBag.length);
                    let total = 0;
                    this.countDuplicat(basketBag);                    
                    console.log(basketBag);
                    for (let i = 0; i < basketBag.length; i++) {
                        console.log('inner for message ok');
                        let item = document.createElement("div");
                        item.setAttribute('id', 'item' + [i]);
                        item.setAttribute('class', 'item d-sm-flex justify-content-between align-items-center flex-row bg-warning rounded p-2');
                        let name = document.createElement("p");
                        name.setAttribute('class', 'w-50 m-0');
                        name.textContent = basketBag[i].name;
                        let price = document.createElement("p");
                        price.setAttribute('class', 'w-25 m-0');
                        price.textContent = basketBag[i].count * basketBag[i].price / 100 + ' Euro';
                        let increment = document.createElement("p");
                        increment.setAttribute('class', 'w-25 m-0');
                        console.log(increment);
                        console.log(increment.textContent = basketBag[i].count);
                        increment.textContent = 'X ' + basketBag[i].count;
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
                    basketBag.forEach(function (basketBag) {
                        total += basketBag.count * basketBag.price / 100;
                    })
                    this.priceFinal = total;
                    console.log(this.priceFinal);
                    let priceTotal = document.createElement("div");
                    priceTotal.setAttribute('class', 'p-4');
                    priceTotal.textContent = 'Prix total : ' + total + ' Euro';
                    basketInner.appendChild(priceTotal);
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
            } else {
                console.log('this is not a table');
            }
        } else {
            let basketVoid = document.createElement("p");
            basketVoid.setAttribute('class', '');
            basketVoid.textContent = 'Panier vide';
            basket.appendChild(basketVoid);
        }
        document.getElementById('sendPost').addEventListener('click', (event) => {
            console.log('we have a click');
            this.checkEmptyInput(event);
        })
    }

    getBasketCount(event) {
        let storageBasketBack = localStorage.getItem('storageBasket');
        console.log(storageBasketBack);
        let basketBag = JSON.parse(storageBasketBack);
        console.log(basketBag);
        if (storageBasketBack) {
            let basketBag = JSON.parse(storageBasketBack);
            let count = 0;
            for (let j = 0; j < basketBag.length; j++){
                count += basketBag[j].count;
            }
            document.getElementById('basketCount').textContent = count;
        } else {
            document.getElementById('basketCount').textContent = "0"
        }

    }

    putInBasketCount() {
        this.getBasketCount();
        document.getElementById('basket').addEventListener('click', (event) => {
            console.log('we have a click for the basket');
                this.getBasketCount(event);
        })
    }
    
    removeFurniture(i) {
        console.log('it has been canceled');
        if(this.basketBack[i].count > 1){
            console.log('count reduced');
            this.basketBack[i].count -=1;
            console.log(this.basketBack[i].count);
            let storageBasketBack = JSON.stringify(this.basketBack);
            localStorage.clear();
            localStorage.setItem('storageBasket', storageBasketBack);
            console.log('localStorage has been updated? after the count reduce?');
        }else{
            this.basketBack.splice(i, 1);
            console.log(this.basketBack);
            let storageBasketBack = JSON.stringify(this.basketBack);
            console.log(storageBasketBack);
            localStorage.clear();
            console.log('localStorage empty');
            localStorage.setItem('storageBasket', storageBasketBack);
            console.log('localStorage has been updated?');
            this.getFromStorage();

        }        
        this.getFromStorage();
    }
    checkEmptyInput(event) {
        event.preventDefault();
        let storageBasketBack = localStorage.getItem('storageBasket');
        console.log(storageBasketBack);
        let basketBack = JSON.parse(storageBasketBack);
        console.log(basketBack);
        if (basketBack != null && basketBack.length > 0) {
            var tabId = new Array('formName', 'formPrename', 'formMail', 'formAdresse', 'formCity');
            var tabMessage = new Array('votre nom', 'votre prénom', 'votre email', 'votre adresse', 'votre ville');
            var br = '\n', mes = '';
            for (var i = 0; i < tabId.length; i++) {
                document.getElementById(tabId[i]).value = document.getElementById(tabId[i]).value.trim();
                if (document.getElementById(tabId[i]).value == '') {
                    mes = mes + br + ' - ' + tabMessage[i] + ' ;';
                }
            }
            if (mes != '') {
                alert('ERREUR :' + br + br + 'Il manque :' + mes);
            } else {
                console.log('no empty fields');
                this.controlBasket(event);
            }
        } else {
            alert('Basket void')
        }
    }
    controlBasket(event) {
        event.preventDefault();
        console.log('Go Go control !');
        let nomber = /[0-9]/;
        let verifyAt = /.+@.+\..+/;
        let formName = document.getElementById('formName').value;
        let formPrename = document.getElementById('formPrename').value;
        let formCity = document.getElementById('formCity').value;
        let formMail = document.getElementById('formMail').value;
        let br = '\n', mes = '';
        if (nomber.test(formName) == true) {
            console.log('Name is invalid');
            mes = mes + br + ' - Nom invalide;';
        } else {
            console.log('Name ok')
        }
        if (nomber.test(formPrename) == true) {
            console.log('Prename invalide');
            mes = mes + br + ' - Prénom invalide;';
        } else {
            console.log('Prename ok')
        }
        if (nomber.test(formCity) == true) {
            console.log('City invalide');
            mes = mes + br + ' - Nom de ville invalide;';
        } else {
            console.log('City  ok')
        }
        if (verifyAt.test(formMail) == false) {
            console.log('mail invalide');
            mes = mes + br + ' - Mail invalide;';
        } else {
            console.log('Mail ok')
        }
        if (nomber.test(formName) == false && nomber.test(formPrename) == false && nomber.test(formCity) == false && verifyAt.test(formMail) == true) {
            console.log('Ok to POST !')
            this.postFurniture();
        } else {

            console.log('problem in order');
            alert('ERREUR :' + br + br + mes);
        }
    };
    postFurniture() {
        let arrayProductsT = [];
            console.log(this.basketBack)
            this.basketBack.forEach(function (basketBag) {
                console.log('table demanted to be fill')
                arrayProductsT.push(basketBag.id, basketBag.count);
                console.log(arrayProductsT);
            });
            this.arrayProducts = arrayProductsT;
            sessionStorage.clear();
            sessionStorage.setItem('name', document.getElementById('formPrename').value);
            this.contact = {
                firstName: document.getElementById('formPrename').value,
                lastName: document.getElementById('formName').value,
                address: document.getElementById('formAdresse').value,
                city: document.getElementById('formCity').value,
                email: document.getElementById('formMail').value,
            }
            let data = {
                products: this.arrayProducts,
                contact: this.contact,
            }
            console.log(data);

            fetch('http://localhost:3000/api/furniture/order', {
                method: 'post',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              }).then(res=>res.json())
                .then(res => console.log(res));
           
           /* const rawResponse =  fetch('http://localhost:3000/api/furniture/order', {
              method: 'POST',
               body: JSON.stringify(data),
               headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                     }, })
                     const content = rawResponse.json();

                     console.log(content);
             /*  .then(response => {
    
                    if (response.status === 201) {
                            return response.json();
                    }
    
            }).then(data => {
                    localStorage.clear();
                    let total = this.priceFinal;
                    localStorage.setItem('total', JSON.stringify(total));
                    console.log(total);
    
                    if (total == 0) {
                           
                            console.log("Votre panier est vide, merci d'ajouter un article");
                    }
    
                    if (total != 0) {
                            window.location = 'confirmation.html?order=' + data;
                    }
            }) */
    };
     showOrder() {
        console.log('let\'s the show begin !');
        let orderFinal = sessionStorage.getItem('order');
        console.log(orderFinal);
        let priceShow = sessionStorage.getItem('total');
        console.log(priceShow);
        let name = sessionStorage.getItem('name');
        let merciMess = document.getElementById('name');
        let order = document.getElementById('order');
        if (numberFinal != null) {
            merciMess.textContent = name;
            order.textContent = 'Votre commande de ' + priceShow + 'Euro porte le numéro : ' + numberFinal;
            localStorage.clear();
        } else {
            document.getElementById('merci').textContent = 'Something Something!';
            order.textContent = 'Il y a un souci avec votre commande.'
        }
    }
}
