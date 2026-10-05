let categoryList = document.querySelector('.categories .container ul');
let productLists =document.querySelector('.products .container .boxs');
let searchBox=document.getElementById('search-value');

function getAllCategoriesName() {
    categoryList.innerHTML = `<li class="loader">Loading categories...</li>`;

    fetch('https://dummyjson.com/products/categories')
        .then(res => {
               if (!res.ok) {
     throw new Error(`Server error: ${res.status}`);
    }
    return res.json();
        }
    
    )
        .then((categories) => {
            // categoryList.innerHTML = '<li class="active" data-category="all">ALL</li>';
             categoryList.innerHTML =" ";
            categories.forEach(element => {
                let li = document.createElement('li');
                
                let slugValue = typeof element === 'object' ? element.slug : element;
                let nameValue = typeof element === 'object' ? element.name : element;

                li.setAttribute('data-category', slugValue);
                li.textContent = nameValue;
                
                categoryList.append(li);
            });
        })
        .catch(err => {
            console.error("Error fetching categories:", err);
            categoryList.innerHTML = `<li class="error-msg">⚠️ Failed to load categories. Please check your connection.</li>`;
        });
}

getAllCategoriesName();

categoryList.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI' && e.target.hasAttribute('data-category')) {
        console.log('yes');
        let selectedCategory = e.target.getAttribute('data-category');
        console.log('Selected Category:', selectedCategory);

         window.location.href = `category.html?cat=${selectedCategory}`;
    }
});

getProducts();

function getProducts(){
       productLists.innerHTML = `<li class="loader">Loading products...</li>`;

    fetch('https://dummyjson.com/products')
        .then(res => {
               if (!res.ok) {
     throw new Error(`Server error: ${res.status}`);
    }
     
    return res.json();
  
        }
    
    )
        .then((data) => {
            productLists.innerHTML = '';
            let box='';
          
          let products=data.products;
            products.forEach(element => {
               box += `
              <div class="box">
    <img src="${element.images[0]}" alt="${element.title}">
    <div class="brand-and-rate">
        <p class="brand">${element.brand ? element.brand : "No Data"}</p>
        <p class="rate">⭐ ${element.rating.toFixed(1)}</p>
    </div>
     <p class="name">${element.title}</p>
   <div class="text">
      <p class="price">$${element.price}</p>
    <p class="stock stock-status ${element.stock > 0 ? 'in-stock' : 'out-stock'}"> ● ${element.availabilityStatus || 'In Stock'}</p>
   
   </div>
      <a href="product.html?id=${element.id}">View Details</a>
</div>
              `
            });
            productLists.innerHTML=box;
        })
        .catch(err => {
             console.error("Error fetching products:", err);
             productLists.innerHTML = `<li class="error-msg">⚠️ Failed to load products. Please check your connection.</li>`;
        });
}

//search
function searchProduct(valueToSearchFor){
     fetch('https://dummyjson.com/products/search?q='+valueToSearchFor)
        .then(res => {
               if (!res.ok) {
     throw new Error(`Server error: ${res.status}`);
    }
    return res.json();
        })
        .then((data) => {
        
   productLists.innerHTML = '';
            let box='';
          
          let products=data.products;
          if(data.total === 0 || products.length === 0){
        productLists.innerHTML = `<li class="error-msg">⚠️ No products available.</li>`;     
          }else{
products.forEach(element => {
               box += `
              <div class="box">
    <img src="${element.images[0]}" alt="${element.title}">
    <div class="brand-and-rate">
        <p class="brand">${element.brand ? element.brand : "No Data"}</p>
        <p class="rate">⭐ ${element.rating.toFixed(1)}</p>
    </div>
     <p class="name">${element.title}</p>
   <div class="text">
      <p class="price">$${element.price}</p>
    <p class="stock stock-status ${element.stock > 0 ? 'in-stock' : 'out-stock'}"> ● ${element.availabilityStatus || 'In Stock'}</p>
   
   </div>
      <a href="product.html?id=${element.id}">View Details</a>
</div>
              `
            });
             productLists.innerHTML=box;
          }
            
           
        })
        .catch(err => {
             console.error("Error fetching products:", err);
             productLists.innerHTML = `<li class="error-msg">⚠️ Failed to load products. Please check your connection.</li>`;
        }); 
}

//sort
function handleSort(selectedValue) {
    if (!selectedValue) return;

    const [sortBy, order] = selectedValue.split('-');

    fetch(`https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`)
        .then(res => {
               if (!res.ok) {
     throw new Error(`Server error: ${res.status}`);
    }
    return res.json();
        })
        .then(data => {
             console.log('///////////////////')
            console.log(data)
            productLists.innerHTML = '';
            let box='';
          let products=data.products;
products.forEach(element => {
               box += `
              <div class="box">
    <img src="${element.images[0]}" alt="${element.title}">
    <div class="brand-and-rate">
        <p class="brand">${element.brand ? element.brand : "No Data"}</p>
        <p class="rate">⭐ ${element.rating.toFixed(1)}</p>
    </div>
     <p class="name">${element.title}</p>
   <div class="text">
      <p class="price">$${element.price}</p>
    <p class="stock stock-status ${element.stock > 0 ? 'in-stock' : 'out-stock'}"> ● ${element.availabilityStatus || 'In Stock'}</p>
   
   </div>
      <a href="product.html?id=${element.id}">View Details</a>
</div>
              `
            });
             productLists.innerHTML=box;
        })
        .catch(err => {
             console.error("Error fetching products:", err);
             productLists.innerHTML = `<li class="error-msg">⚠️ Failed to load products. Please check your connection.</li>`;
        });
}
