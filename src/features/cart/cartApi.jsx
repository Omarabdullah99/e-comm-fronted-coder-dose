export function createCart(cartItem){
    console.log('api cartitem check', cartItem)
    return new Promise(async(resolve)=>{
        const response= await fetch('http://localhost:8000/carts',{
            method: 'POST',
            body: JSON.stringify(cartItem),
            headers: { 'content-type': 'application/json' },
        })
        const data= await response.json()
        resolve({data})
    })

}

