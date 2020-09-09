const veggies = document.querySelectorAll('.veggies');
const basket = document.querySelector('#btnCart');
const basketImage = document.querySelector('#basket');
const totalInput = document.querySelector('#total');
const basketView = document.querySelector('#basketView');
let basketIsHidden = true;
let total = 0.0;
let vegetables = [];
let totalBill = [];
let draggedItem = null;

const generatePrice = () => {
    let price = Math.random() * 4;
    return price;
}

const showBasket = () => {
    let htmlContent = '<div id="basketContent" class="container-fluid"><div class="row">';
    vegetables.forEach(el => {
        if (el.units > 0) {
            let elementName = el.name;
            let elementUnits = el.units;
            let elementPrice = el.price.toFixed(2);
            htmlContent +=
                `<div class="col-3 col-sm-2 col-lg-1 basketItems">
                <img class="basketImages" src="images/${elementName}.png" alt="Image of ${elementName}" data-toggle="tooltip" title="${elementName}">
                <div class="itemUnits">Ud: ${elementUnits}</div>
                <div class="itemPrice">${elementPrice} €/ud.</div>
                <div class="basketButtons">
                    <button id="add${elementName}" class="btn btn-outline-success" type="button">+</button>
                    <button id="substract${elementName}" class="btn btn-outline-warning" type="button">-</button>
                    <button id="remove${elementName}" class="btn btn-outline-danger" type="button">x</button>
                </div>
            </div>`;
        }
    });
    htmlContent += '</div></div>';
    basketView.innerHTML = htmlContent;
    basketIsHidden = false;
}

const hideBasket = () => {
    basketView.innerHTML = '';
    basketIsHidden = true;
}

const changeBasketImg = () => {
    if (total > 0) {
        basketImage.setAttribute('src','images/full-basket.png');
    } else {
        basketImage.setAttribute('src','images/empty-basket.png');
    }
}

document.onclick = (e) => {
    let elemento = e.target;
    let nombreElemento = elemento.id;
    if (nombreElemento.includes("add")) {
        addOne(nombreElemento.substring(3));
    } else if (nombreElemento.includes("substract")) {
        substractOne(nombreElemento.substring(9));
    } else if (nombreElemento.includes("remove")) {
        remove(nombreElemento.substring(6));
    }
} 

const addOne = (productName) => {
    vegetables.forEach(el => {
        if (el.name === productName) {
            total += el.price;
            el.units += 1;
            totalInput.value = total.toFixed(2) + ' €';
            console.log(basketIsHidden);
            if (!basketIsHidden) {
                hideBasket();
                showBasket();
            }
        }
    });
}

const substractOne = (productName) => {
    vegetables.forEach(el => {
        if (el.name === productName) {
            total -= el.price;
            el.units -= 1;
            totalInput.value = total.toFixed(2) + ' €';
            changeBasketImg();
            if (!basketIsHidden) {
                hideBasket();
                showBasket();
            }
        }
    });
}

const remove = (productName) => {
    vegetables.forEach(el => {
        if (el.name === productName) {
            total -= el.price*el.units;
            el.units = 0;
            totalInput.value = total.toFixed(2) + ' €';
            changeBasketImg();
            if (!basketIsHidden) {
                hideBasket();
                showBasket();
            }
        }
    });
}

for (let i = 0; i < veggies.length; i++) {
    const veg = veggies[i];

    veg.addEventListener('dragstart', () => draggedItem = veg.id);
    veg.addEventListener('dragend', () => {
        setTimeout(() => draggedItem = null, 0);
    });


    const vegetable = new Vegetable(veg.id, generatePrice(), 0);
    vegetables.push(vegetable);
}

basket.addEventListener('dragover', e => e.preventDefault());
basket.addEventListener('dragenter', e => e.preventDefault());
basket.addEventListener('drop', e => {
    vegetables.forEach(el => {
        if (el.name === draggedItem) {
            total += el.price;
            el.units += 1;
            totalInput.value = total.toFixed(2) + ' €';
            changeBasketImg();
            if (!basketIsHidden) {
                hideBasket();
                showBasket();
            }
        }
    });
});
basket.addEventListener('click', () => {
    if (basketIsHidden) {
        showBasket();
    } else {
        hideBasket();
    }
});