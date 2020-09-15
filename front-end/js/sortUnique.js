
for (let i=1; i < basketBag.lenth; i++){
    if(basketBag[i-1].id === basketBag[i].id){
        basketBag[i-1].count++;
        removeFurniture(i);
        sortUnique();
    }
}