export function fetchAllProducts() {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('http://localhost:8000/products') 
      const data = await response.json()
      console.log('apidata',data)
      resolve({data})
    }
    );
  }