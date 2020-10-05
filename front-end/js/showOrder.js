 // Affiche le message de confirmation à partir du sessionStorage
 showOrder = () => {
    let orderFinal = sessionStorage.getItem('order');
    let priceShow = sessionStorage.getItem('total');
    let name = sessionStorage.getItem('name');
    let merciMess = document.getElementById('name');
    let order = document.getElementById('order');
    if (orderFinal != null) {
        merciMess.textContent = name;
        order.textContent = 'Votre commande de ' + priceShow + ' porte le numéro : ' + orderFinal;
        localStorage.clear();
    } else {
        document.getElementById('merci').textContent = 'Something Something!';
        order.textContent = 'Il y a un souci avec votre commande.'
    }
}
