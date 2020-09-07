const veggies = document.querySelectorAll('.veggies');
const basket = document.querySelector('#btnCart');
const totalInput = document.querySelector('#total');

let total = 0.0;
let vegetables = [];
let totalBill = [];
let draggedItem = null;

const generatePrice = () => {
    let price = Math.random() * 4;
    return price;
}

for (let i = 0; i < veggies.length; i++) {
    const veg = veggies[i];

    veg.addEventListener('dragstart', () => draggedItem = veg.id);
    veg.addEventListener('dragend', () => {
        setTimeout(() => draggedItem = null, 0);
    });

    const vegetable = new Vegetable(veg.id, generatePrice());
    vegetables.push(vegetable);
}

console.log(vegetables.length);

basket.addEventListener('dragover', e => e.preventDefault());
basket.addEventListener('dragenter', e => e.preventDefault());
basket.addEventListener('drop', e => {
    vegetables.forEach(el => {
        console.log(el.name);
        if (el.name === draggedItem) {
            total += el.price;
        }
    });
    totalInput.value = total.toFixed(2) + ' €';
});