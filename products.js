let svgIceCream = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 120 250" preserveAspectRatio="xMinYMin meet" >
<circle id="e1_circle" cx="50" cy="90" style="fill:#fff;stroke:black;stroke-width:1px;" r="50"/>
<circle id="e2_circle" cx="50" cy="50" style="fill:#001;stroke:black;stroke-width:1px;" r="50"/>
<polyline style="stroke:black;fill:chocolate;stroke-width:1px;" id="e3_polyline" points="0,120,50,250,100,120,70,150,30,150,0,120"/>
</svg>`;

let divOfProducts = document.querySelector("#products");
let divToPrepend = divOfProducts.children[0];

fetchIceCreams();

function fetchIceCreams() {
    fetch('https://raw.githubusercontent.com/Maciej333/Homemade-Ice-Creams/main/ice_cream.json')
        .then(response => {
            let responseJSON = response.json();
            responseJSON.then(item => {
                for (let iceCream of item.iceCreams) {
                    addIceCream(iceCream);
                }
            })
        })
        .catch(err => console.error(err));
}

function addIceCream(obj) {
    let mainIceCreamDiv = document.createElement('div');
    mainIceCreamDiv.classList.add('ice');

    let svg = svgIceCream.replace("fff", obj.color1);
    svg = svg.replace("001", obj.color2);
    // metoda innerHTML wykorzystana wylacznie z uwagi na manipulacje parametrami SVG, w rzeczywistych okolicznosciach pobralbym zdjecie z servera
    mainIceCreamDiv.innerHTML = svg;

    if (obj.bestseller === "yes") {
        let pBestseller = createPBestseller();
        mainIceCreamDiv.append(pBestseller);
    }

    let pTitle = createPTitle(obj.title);
    mainIceCreamDiv.append(pTitle);

    let pRating = createPRaring(obj.rating);
    mainIceCreamDiv.append(pRating);

    let pDescription = createPDescription(obj.description);
    mainIceCreamDiv.append(pDescription);

    divToPrepend.append(mainIceCreamDiv);
}

function createPBestseller() {
    let pBestseller = document.createElement('p');
    pBestseller.classList.add('badge');
    pBestseller.classList.add('bg-primary');
    pBestseller.textContent = "Bestseller";
    return pBestseller;
}

function createPTitle(title) {
    let pTitle = document.createElement('p');
    pTitle.classList.add('mb-0');
    pTitle.textContent = title;
    return pTitle;
}

function createPRaring(rating) {
    let pRating = document.createElement('p');
    for (let i = 1; i < 6; i++) {
        let icon = document.createElement('i');
        if (i <= rating) {
            icon.classList.add('fas');
        } else {
            icon.classList.add('far');
        }
        icon.classList.add('fa-star');
        pRating.append(icon);
    }
    return pRating;
}

function createPDescription(description) {
    let pDescription = document.createElement('p');
    pDescription.classList.add('pt-1');
    pDescription.classList.add('mx-1');
    pDescription.textContent = description;
    return pDescription;
}