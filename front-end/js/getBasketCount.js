getBasketCount = () => {
    let storageBasketBack = localStorage.getItem('storageBasket');
    let basketBag = JSON.parse(storageBasketBack);
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