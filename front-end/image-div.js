console.log("test"); 
function addTeddy() {

    for(let i = 1; i < 6; i++) {
            var img = document.createElement("img");
            img.src = "../images/teddy_" + i + ".jpg";
            var src = document.getElementById("teddy");
            src.appendChild(img);
            document.querySelector("#teddy").classList.add("teddy_style");
        }
    }