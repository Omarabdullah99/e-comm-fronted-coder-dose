export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("https://e-comm-backend-coder-dose.onrender.com/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://e-comm-backend-coder-dose.onrender.com/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
      mode:'cors'
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  console.log("update admin ProductApi.js");
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-comm-backend-coder-dose.onrender.com/products/" +update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
        mode:'cors'
      }
    );
    const data= await response.json()
    resolve({data})
  });
}



export function fetchProductById(productId) {
  return new Promise(async (resolve) => {
    const id = productId;

    const respose = await fetch("https://e-comm-backend-coder-dose.onrender.com/products/" + id,{
      mode:'cors'
    });
    const data = await respose.json();

    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort,pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}

  // TODO : on server we will support multi values in filter

  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  // console.log("pagination of product api",pagination)
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      "https://e-comm-backend-coder-dose.onrender.com/products?" + queryString,{
        mode:'cors'
      }
      
    );
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({data:{products:data, totalItems: +totalItems}})
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://e-comm-backend-coder-dose.onrender.com/category",{
      mode:'cors'
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://e-comm-backend-coder-dose.onrender.com/brands",{
      mode:'cors'
    });
    const data = await response.json();
    resolve({ data });
  });
}
