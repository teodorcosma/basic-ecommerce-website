const productBG = document.getElementById("product-background");
const idNextPage = JSON.parse(localStorage.getItem("transferMe"));
let buttonAddToCart = document.getElementById("add-to-cart-button");
const localStorageData = localStorage.getItem("itemsAddedToCart");
let addToCartIDs = new Array();


let similarProducts = [];
let newArray = [];
async function loadProducts(url) {
    const products = await fetch(url);
    return await products.json();
}

loadProducts('http://127.0.0.1:5500/products.json').then(data => {
    const myProducts = data.products;
    addItems(myProducts);
})

if (localStorageData) {
    addToCartIDs = JSON.parse(localStorageData);
}

function addItems(myProducts) {


    myProducts.forEach(element => {
        const finalPrice = element.price - (element.price * element.discountPercentage / 100.00);
        let isActive = false;
        if (localStorageData && localStorageData.includes(element.id)) {
            isActive = true;
        }

        let searchCategory = element.category
        newArray = myProducts.filter(function (el) {
            return el.category == searchCategory;
        });


        const finalRating = (element.rating.toFixed(1))
        if (element.id == idNextPage) {


            productBG.insertAdjacentHTML("afterbegin",
                `
                <div id="product-box">
            <div id="product-images">
                <a><img id="product-img" src="${element.thumbnail}" /></a>
                <div id="product-small-images">
                    <img id="product-img-small" src="${element.images[0]}">
                    <img id="product-img-small" src="${element.images[1]}"> 
                    <img id="product-img-small" src="${element.images[2]}">
                    <img id="product-img-small" src="${element.images[3]}" onerror='this.style.display = "none"'>
                </div>
            </div>

            <div id="product-details">

                <a>
                    <p id="product-title">${element.title}</p>
                </a>
                <p id="product-brand-name">${element.brand}, <em>${element.seller}</em></p>
                <p id="product-category">Category: ${element.category}</p>
                <p id="product-rating">${finalRating} stars</p>
                <div id="product-description">${element.description}</div>
                <p id="product-price">${element.price} $</p>
                <p id="product-stock">Stock: ${element.stock}</p>

                <div>
                    <button class="button-add-to-cart-product isActive-${isActive}" id="${element.id}"
                        ></button>
                </div>
            </div>

        </div>
        <div id="item-box-table">
            <div id="item-box">
                <a class="click-me" href="product.html" data-value="${newArray[0].id}" ><img id="item-img" src="${newArray[0].thumbnail}" /></a>
                <a class="click-me" href="product.html" data-value="${newArray[0].id}" ><p id="item-title" >${newArray[0].title}</p></a>
                <p id="item-category">${newArray[0].category}</p>
                <p id="item-rating">${newArray[0].rating} stars</p>
                <div id="item-description">${newArray[0].description}</div>
                <div>
                    <p id="item-price">${newArray[0].price} $</p>
                </div>
            </div> 
            <div id="item-box">
                <a class="click-me" href="product.html" data-value="${newArray[1].id}" ><img id="item-img" src="${newArray[1].thumbnail}" /></a>
                <a class="click-me" href="product.html" data-value="${newArray[1].id}" ><p id="item-title" >${newArray[1].title}</p></a>
                <p id="item-category">${newArray[1].category}</p>
                <p id="item-rating">${newArray[1].rating} stars</p>
                <div id="item-description">${newArray[1].description}</div>
                <div>
                    <p id="item-price">${newArray[1].price} $</p>
                </div>
            </div> 
            <div id="item-box">
                <a class="click-me" href="product.html" data-value="${newArray[2].id}" ><img id="item-img" src="${newArray[2].thumbnail}" /></a>
                <a class="click-me" href="product.html" data-value="${newArray[2].id}" ><p id="item-title" >${newArray[2].title}</p></a>
                <p id="item-category">${newArray[2].category}</p>
                <p id="item-rating">${newArray[2].rating} stars</p>
                <div id="item-description">${newArray[2].description}</div>
                <div>
                    <p id="item-price">${newArray[2].price} $</p>
                </div>
            </div>
            <div id="item-box">
                <a class="click-me" href="product.html" data-value="${newArray[3].id}" ><img id="item-img" src="${newArray[3].thumbnail}" /></a>
                <a class="click-me" href="product.html" data-value="${newArray[3].id}" ><p id="item-title" >${newArray[3].title}</p></a>
                <p id="item-category">${newArray[3].category}</p>
                <p id="item-rating">${newArray[3].rating} stars</p>
                <div id="item-description">${newArray[3].description}</div>
                <div>
                    <p id="item-price">${newArray[3].price} $</p>
                </div>
            </div>  
        </div>
                  `);


        }
    });
}

const onTheCartClick = function () {

    if (event.target.classList.contains("button-add-to-cart-product")) {

        buttonAddToCart = document.getElementById("add-to-cart-button");

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
            console.log(index);
            if (index > -1) {
                addToCartIDs.splice(index, 1);
            }
            localStorage.setItem("itemsAddedToCart", JSON.stringify(addToCartIDs));

        }


    }
}

productBG.addEventListener("click", onTheCartClick);

