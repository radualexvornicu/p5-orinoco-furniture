// L'URL de l'API
const serverUrl = "http://localhost:3000/api/furniture/";
getAllFurniture = async function () {
    let response = await fetch(serverUrl)
    if (response.ok) {
        return response.json()
    } else {
        console.error('server return: ', response.status)
    }
};
// Avec la promesse du getAllFurniture => crée la liste du produit stocké dans le serveur
showAllFurniture = () => {
    // Avec la réponse  => une fonction que prend chaque key et value pour créer un item du produit dans le HTML
    getAllFurniture().then(function (json) {
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
            let nameFurniture = document.createElement("h5");
            nameFurniture.textContent = furnitureOne.name;
            nameFurniture.setAttribute('class', 'card-title m-0');
            let priceFurniture = document.createElement("p");
            priceFurniture.textContent = furnitureOne.price / 100 + " Euro";
            priceFurniture.setAttribute('class', 'card-text m-0');
            // Ouverture de la page produit correspondant au clic sur la fiche de la page d'accueil, grâce à son id.
            let buttonFurniture = document.createElement("a");
            buttonFurniture.textContent = "Détails " + furnitureOne.name;
            buttonFurniture.setAttribute('class', 'btn btn-warning text-break');
            buttonFurniture.setAttribute('href', 'produit.html?id=' + furnitureOne._id);
            holder.appendChild(iconFurniture);
            iconFurniture.appendChild(imageFurniture);
            iconFurniture.appendChild(tagFurniture);
            tagFurniture.appendChild(nameFurniture);
            tagFurniture.appendChild(priceFurniture);
            tagFurniture.appendChild(buttonFurniture);
        });
    });
}