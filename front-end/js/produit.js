const serverUrl = "http://localhost:3000/api/furniture/"; 
// Attrape le paramètre dans l'URL et l'utilise pour fetch get 
    // Utilise la réponse pour remplir la carte produit
    function getOneFurniture() {
        let id = location.search.substring(4);
        console.log(id);
        fetch(serverUrl  + id)
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
    };
    // Avant d'ajoute une furniture dans localStorake => panier
    // Verifier si le neuveaux produit existe deja    
   function checkIfDuplicat(basketBag, furnitureBasket) {
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
   function addFurniture(event) {
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
                    url: this.furniture.imageUrl,
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
                url: this.furniture.imageUrl,
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
  function  putInStorage() {
        document.getElementById('basket').addEventListener('click', (event) => {
            console.log(this);
            // Apell aux fonction qui va adjoute le produit aux panier
            this.addFurniture(event);
            alert("Vous avez ajouté ce produit dans votre panier!'\n'Vous pouvez retourner à la liste des produits!'\n'Ou verifier votre panier!")
        });
    }