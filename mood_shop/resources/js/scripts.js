import data from './data.js'

const itemsContainer = document.getElementById('items')
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')


// the length of our data determines how many times this loop goes around
for (let i=0; i<data.length; ++i) {
    // create a new div element and give it a class name
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    // create an image element
    let img = document.createElement('img');
    // this will change each time we go through the loop. Can you explain why?
    img.src = data[i].image
    img.width = 300
    img.height = 300

    // Add the image to the div
    newDiv.appendChild(img)
    // put new div inside items container
    itemsContainer.appendChild(newDiv)


    let desc = document.createElement('P')
    desc.innerText =data[i].desc
    newDiv.appendChild(desc)

    let price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    let button = document.createElement('button')
    button.id = data[i].name

    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)

    itemsContainer.appendChild(newDiv)
}

const all_items_button = Array.from(document.querySelectorAll('button'))

all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))


const cart = [ ]

function addItem(name, price) {
    for (let i = 0; i < cart.length; i+= 1){
        if (cart[i].name === name){
            cart[i].qty += 1
            return
        }
    }

    const item = {name: name, price: price, qty: 1}
    cart.push(item)
}

function showItems(){
    console.log(`You have ${cart.length} items in your cart`)
    cartQty.innerHTML = `You have ${cart.length} items in your cart`

    let itemStr = ""
    for (let i = 0; i < cart.length; i += 1){
        console.log(`${cart[i].name} : $${cart[i].price} x ${cart[i].qty}`)
        itemStr += `<li> ${cart[i].name} : $${cart[i].price} x ${cart[i].qty}</li>`
    }

    let total = 0
    for (let i = 0; i < cart.length; i+= 1){
        total += cart[i].price * cart[i].qty
    }

    itemList.innerHTML = itemStr;

    console.log(`Cart Total: $${total}`)
    cartTotal.innerHTML = `Cart Total: $${total}`
}

function removeItem(name) {
    for (let i = 0; i < cart.length; i += 1){
        if (cart[i].name === name){
            if (qty > 0) {
                cart[i].qty -= qty
            }
            if (cart[i].qty < 1 || qty === 0){
                cart.splice(i, 1)
            }
            return
        }
    }
}

showItems()