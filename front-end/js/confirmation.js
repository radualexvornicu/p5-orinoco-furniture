const serverUrl = "http://localhost:3000/api/furniture/";
formSendPost = () => {
    document.getElementById('sendPost').addEventListener('click', (event) => {
        checkEmptyInput(event);
    })
}
// Vérifie que le panier n'est pas vides
checkEmptyInput = (event) => {
    event.preventDefault();
    let storageBasketBack = localStorage.getItem('storageBasket');
    let basketBack = JSON.parse(storageBasketBack);
    // Si le panier n'est pas vide et sa longueur supérieur à 0 sinon, alert panier vide
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
        //si message différent de '', affiche le message en alert sinon... appelle controlBasket
        if (mes != '') {
            alert('ERREUR :' + br + br + 'Il manque :' + mes);
        } else {
            controlBasket(event);
        }
    } else {
        alert("Votre panier est vide, merci d'ajouter un article")
    }
}
// Vérifie les inputs du formulaire
controlBasket = (event) => {
    event.preventDefault();
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
    if (regex.test(formNom) == true) {
        console.log('nom invalide');
        mes = mes + br + ' - Nom invalide;';
    } else {
        console.log('nom ok')
    }
    if (regex.test(formPrename) == true) {
        console.log('Prénom invalide');
        mes = mes + br + ' - Prénom invalide;';
    } else {
        console.log('prénom ok')
    }
    if (regexCity.test(formCity) == true) {
        console.log('Ville invalide');
        mes = mes + br + ' - Nom de ville invalide;';
    } else {
        console.log('ville ok')
    }
    if (regexMail.test(formMail) == false) {
        console.log('mail invalide');
        mes = mes + br + ' - Mail invalide;';
    } else {
        console.log('mail ok')
    }
    if (regexAddress.test(formAdresse) == true) {
        console.log('Address invalide');
        mes = mes + br + ' - Address invalide;';
    } else {
        console.log('address ok')
    }
    if (regex.test(formNom) == false && regex.test(formPrename) == false && regex.test(formCity) == false && regexMail.test(formMail) == true && regexAddress.test(formAdresse) == false) {
        this.postFurniture(event); // passer à la page confirmation seulement après que postFurniture soit ok
    } else {
        //affiche le message d'erreur
        alert('ERREUR :' + br + br + mes);
    }
};
// Envoie la requête post de la commande avec le tableau d'items et l'objet contact
postFurniture = () => {
    let arrayProducts = [];
    let storageBasketBack = localStorage.getItem('storageBasket');
    basketBack = JSON.parse(storageBasketBack);
    basketBack.forEach(function (basketBag) {
        arrayProducts.push(basketBag.id);
    });
    sessionStorage.clear();
    sessionStorage.setItem('name', document.getElementById('formPrename').value);
    //-> l'objet contact
    let contact = {
        firstName: document.getElementById('formPrename').value,
        lastName: document.getElementById('formName').value,
        address: document.getElementById('formAdresse').value,
        city: document.getElementById('formCity').value,
        email: document.getElementById('formMail').value,
    }
    //-> objet à POST
    let data = {
        products: arrayProducts,
        contact: contact,
    }
    let priceFinal = document.getElementById('priceTotal').innerText;
    // Définition de la requête POST au serveur
    // et des actions: vide le panier (localStorage), met la valeur du montant total du panier dans le localStorage
    fetch(serverUrl + 'order', {
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
        sessionStorage.setItem('order', data.orderId);
        sessionStorage.setItem('total', JSON.stringify(priceFinal));
        // Si le panier est vide la commande n'est pas envoyée au serveur
        if (priceFinal == 0) {
            alert("Votre panier est vide, merci d'ajouter un article")
            window.location = 'panier.html';
        }
        // Si le panier contient au moins un article, la commande peut être envoyée au serveur
        // (si le formulaire est valide)
        if (priceFinal != 0) {
            window.location = 'confirmation.html?order=' + data.orderId;
        }
    })
};