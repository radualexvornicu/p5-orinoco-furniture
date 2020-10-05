// L'URL de l'API
const serverUrl = "http://localhost:3000/api/furniture/";
// Global declaration du variable qui va gestioner la reponse
let furniture;
getOneFurniture =() => {
    let id = location.search.substring(4);
    fetch(serverUrl + id)
        .then(response => response.json())
        .then((response) => {
            furniture = response;
            document.getElementById('name').textContent = furniture.name;
            document.getElementById('image').setAttribute('src', furniture.imageUrl);
            document.getElementById('image').setAttribute('alt', 'preview picture of' + furniture.name);
            document.getElementById('description').textContent = furniture.description;
            document.getElementById('price').textContent = furniture.price / 100 + ' Euro';
            furniture.varnish.forEach(function (varnishPick) {
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
// Aux click event ('Metre aux panier')
addFurniture = (event) =>{
    // Retrouve le panier du localStorage
    let storageBasketBack = localStorage.getItem('storageBasket');
    // Si le panier existe déjà, vérifier et ajouter le produit
    if (storageBasketBack) {
        let basketBag = JSON.parse(storageBasketBack);
        if (Array.isArray(basketBag)) {
            let furnitureBasket = {
                name: furniture.name,
                price: furniture.price,
                id: furniture._id,
                count: 1,
                url: furniture.imageUrl,
            }
            // Appel aux fonction qui vérifie si l'utilisateur ajouter un nouveau produit
            // ou un produit qui exist déjà
            checkIfDuplicat(basketBag, furnitureBasket);
            // Ajouté le tableau avec tous les produits et le nouveaux produit sélecté
            let storageBasketGo = JSON.stringify(basketBag);
            localStorage.setItem('storageBasket', storageBasketGo);
        }
        // Si le panier est vide/il n'exist pas dans le localStorage
        // => créée le panier avec le premier produit
    } else {
        let tableBasket = [];
        let furnitureBasket = {
            name: furniture.name,
            price: furniture.price,
            id: furniture._id,
            count: 1,
            url: furniture.imageUrl,
        }
        tableBasket.push(furnitureBasket);
        let storageBasketGo = JSON.stringify(tableBasket);
        localStorage.setItem('storageBasket', storageBasketGo);
    }
    // Appel  aux fonction qui compte le nombre total des produits qui sont dans le panier
}
// Réaliser un EventListener ('click) pour le button 'Mettre dans le panier' 
putInStorage =() => {
    document.getElementById('basket').addEventListener('click', (event) => {
        // Appel aux fonction qui va ajouter le produit aux panier
        addFurniture(event);
        getBasketCount();
        alert("Vous avez ajouté ce produit dans votre panier!'\n'Vous pouvez retourner à la liste des produits!'\n'Ou verifier votre panier!")
    });
}
// Fonction qui verifier si l'utilisateur adjout un neuveau produit
checkIfDuplicat =(basketBag, furnitureBasket) => {
    let ok = 1;
    for (let i = 0; i < basketBag.length; i++) {
        // Si l'id existe déjà dans le panier
        // => augmenter le compteur
        if (basketBag[i].id === furniture._id) {
            basketBag[i].count++;
            i = basketBag.length;
            ok = 0;
        }
    }
    // Si no => ajoute la fourniture aux tableau
    if (ok === 1) {
        basketBag.push(furnitureBasket);
    }
    // Retourner le tableau avec tous les produits
    return basketBag;
}