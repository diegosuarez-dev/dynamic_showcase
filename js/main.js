const veggies = document.querySelectorAll('.veggies');
const basket = document.querySelector('#btnCart');
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
    basketView.innerHTML = '<div id="basketContent">';
    vegetables.forEach(el => {
        if (el.units > 0) {
            basketView.innerHTML += 
            `<div class="basketItems">
                <h6>${el.name}</h6>
                <img class="basketImages" src="images/${el.name}.png" alt="Image of ${el.name}">
                <div class="itemUnits">${el.units}</div>
                <div class="itemPrice">${el.price.toFixed(2)}</div>
            </div>`;
        }
    });
    basketView.innerHTML +='</div>';
    basketIsHidden = false;
}

const hideBasket = () => {
    basketView.innerHTML = '';
    basketIsHidden = true;
}

for (let i = 0; i < veggies.length; i++) {
    const veg = veggies[i];

    veg.addEventListener('dragstart', () => draggedItem = veg.id);
    veg.addEventListener('dragend', () => {
        setTimeout(() => draggedItem = null, 0);
    });


    const vegetable = new Vegetable(veg.id, generatePrice(),0);
    vegetables.push(vegetable);
}

basket.addEventListener('dragover', e => e.preventDefault());
basket.addEventListener('dragenter', e => e.preventDefault());
basket.addEventListener('drop', e => {
    vegetables.forEach(el => {
        if (el.name === draggedItem) {
            total += el.price;
            el.units += 1;
        }
    });
    totalInput.value = total.toFixed(2) + ' €';
});
basket.addEventListener('click',() => {
    if (basketIsHidden) {
        showBasket();
    } else {
        hideBasket();
    }
});