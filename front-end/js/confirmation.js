 // Vérifie que les champs du formulaire ne sont pas vides
 function checkEmptyInput(event) {
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
function controlBasket(event) {
    event.preventDefault();
    console.log('Go Go control !');
    let regex = /[~`!#$%\^&*+=\-\[\]\';,/{}|\":<>\?0123456789 ]/;
    let regexCity = /[~`!#$%\^&*+=[\]\';,/{}|\":<>\?0123456789]/;
    let regexAddress = /[~`!#$%\^&*+=[\]\';/{}|\":<>\?]/;
    let regexMail = /.+@.+\..+/;
    let formNom = document.getElementById('formName').value;
    let formPrename = document.getElementById('formPrename').value;
    let formAdresse = document.getElementById('formAdresse').value;
    let formCity = document.getElementById('formCity').value;
    let formMail = document.getElementById('formMail').value;
    let br = '\n', mes = '';
    if(regex.test(formNom)==true){
        console.log('nom invalide');
        mes = mes + br + ' - Nom invalide;';
    }else{
        console.log('nom ok')
    }
    if(regex.test(formPrename)==true){
        console.log('Prénom invalide');
        mes = mes + br + ' - Prénom invalide;';
    }else{
        console.log('prénom ok')
    }
    if(regexCity.test(formCity)==true){
        console.log('Ville invalide');
        mes = mes + br + ' - Nom de ville invalide;';
    }else{
        console.log('ville ok')
    }
    if(regexMail.test(formMail)==false){
        console.log('mail invalide');
        mes = mes + br + ' - Mail invalide;';
    }else{
        console.log('mail ok')
    }
    if(regexAddress.test(formAdresse)==true){
        console.log('Address invalide');
        mes = mes + br + ' - Address invalide;';
    }else{
        console.log('address ok')
    }
    if(regex.test(formNom)==false && regex.test(formPrename)==false && regex.test(formCity)==false && regexMail.test(formMail)==true && regexAddress.test(formAdresse)==false){
        console.log('On peut POST !')           
        this.postFurniture(event); // passer à la page confirmation seulement après que postTeddy soit ok
    }else{
        //affiche le message d'erreur
        console.log('il reste un problème');
        alert('ERREUR :' + br + br + mes);
    }
};
// Envoie la requête post de la commande avec le tableau d'items et l'objet contact
function postFurniture() {
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
function showOrder() {
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