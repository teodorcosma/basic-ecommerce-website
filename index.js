let ascOrDescValue = "ascending";
const productTable = document.getElementById("product-table");
const localStorageData = localStorage.getItem("itemsAddedToCart");
let addToCartIDs = new Array();



function ascendingOrDescending(selectObject) {
  ascOrDescValue = selectObject.value;
  const myNode = document.getElementById("product-table");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  loadProducts('products.json').then(data => {
    const myProducts = data.products;

    let searchbarHasValue = document.getElementById("search-bar").value;

    if (searchbarHasValue) {
      let filteredItems = myProducts.filter(product => product.title.toLowerCase().includes(document.getElementById("search-bar").value.toLowerCase()));
      if (ascOrDescValue == "ascending") {
        filteredItems.sort(compare);
        addItems(filteredItems);
      } else {
        filteredItems.sort(compare).reverse();
        addItems(filteredItems);
      }
    }
    else {
      if (ascOrDescValue == "ascending") {
        myProducts.sort(compare);
        addItems(myProducts);
      } else {
        myProducts.sort(compare);
        const myReverseProducts = myProducts.reverse();
        addItems(myReverseProducts);
      }
    }
  })
}


async function loadProducts(url) {
  const products = await fetch(url);
  return await products.json();
}


function compare(a, b) {
  if (a.price < b.price) {
    return 1;
  }
  if (a.price > b.price) {
    return -1;
  }
  return 0;
}


loadProducts('products.json').then(data => {
  const myProducts = data.products;
  let mySortedProducts = myProducts.sort(compare);
  addItems(mySortedProducts);
})


function addItems(myProducts) {


  myProducts.forEach(element => {
    let isActive = false;
    if (localStorageData && localStorageData.includes(element.id)) {
      isActive = true;
    }
    const finalPrice = element.price - (element.price * element.discountPercentage / 100.00);

    const finalRating = (element.rating.toFixed(1))

    productTable.insertAdjacentHTML("afterbegin",
      `
          <div id="item-box">
          <a href="product.html" class="item-linkto" ><img id="item-img" class="click-me" data-value="${element.id}" src="${element.thumbnail}" /></a>
          <a href="product.html" class="item-linkto" ><p id="item-title" class="click-me" data-value="${element.id}">${element.title}</p></a>
          <p id="item-category">${element.category}</p>
          <p id="item-rating">${finalRating} stars</p>
          <div id="item-description">${element.description}</div>
          <div>
              <p id="item-price">${element.price} $</p>
              <button class="button-add-to-cart isActive-${isActive}" id="${element.id}"></button>
          </div>
          </div> 
          `);
  });
}



function searchChange() {
  setTimeout(function saveInput() {
    loadProducts('products.json').then(data => {
      const myProducts = data.products;
      let filteredItems;
      myProducts.forEach(element => {
        const myNode = document.getElementById("product-table");
        while (myNode.firstChild) {
          myNode.removeChild(myNode.lastChild);
        }
        filteredItems = myProducts.filter(product => product.title.toLowerCase().includes(document.getElementById("search-bar").value.toLowerCase()));
        if (ascOrDescValue == "ascending") {
          filteredItems.sort(compare);
        } else if (ascOrDescValue == "descending") {
          filteredItems.sort(compare);
          filteredItems = filteredItems.reverse();
        }
      })
      addItems(filteredItems);
    })
  }, 500);
}



if (localStorageData) {
  addToCartIDs = JSON.parse(localStorageData);
}

const onCartClick = function (e) {
  console.log(event.target.classList);
  if (event.target.classList.contains("button-add-to-cart")) {
    

    if (event.target.classList.contains("isActive-false")) {
      event.target.classList.remove("isActive-false");
      event.target.classList.add("isActive-true");
      addToCartIDs.push(event.target.id);
      localStorage.setItem("itemsAddedToCart", JSON.stringify(addToCartIDs));
    }
    else if (event.target.classList.contains("isActive-true")) {
      event.target.classList.remove("isActive-true");
      event.target.classList.add("isActive-false");
      const index = addToCartIDs.indexOf(event.target.id);
      if (index > -1) {
        addToCartIDs.splice(index, 1);
      }
      localStorage.setItem("itemsAddedToCart", JSON.stringify(addToCartIDs));
    }
  }
  if(event.target.classList.contains("click-me")){
    let idToTransfer=event.target.getAttribute("data-value");
    if(idToTransfer){
      localStorage.setItem("transferMe", JSON.stringify(idToTransfer));
    }
  }
}

productTable.addEventListener("click", onCartClick);