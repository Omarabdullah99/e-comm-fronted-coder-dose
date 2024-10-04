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

export function getCartItemByUserId(userId){
    return new Promise(async(resolve)=>{
        const id= userId
        const respose= await fetch('http://localhost:8000/carts?user=' +id)
        const data= await respose.json()
        resolve({data})

    })

}

export function updateCartItem(update){
    return new Promise(async(resolve)=>{
        // console.log('update item api', update)
        const response= await fetch('http://localhost:8000/carts/'+update.id,{
            method: 'PATCH',
            body: JSON.stringify(update),
            headers: {'content-type': 'application/json'}
        })
        const data= await response.json()
        resolve({data})
    })
}

export function deleteCart(itemid){
    return new Promise(async(resolve)=>{
        const response= await fetch('http://localhost:8000/carts/'+itemid,{
            method: 'DELETE',
            headers: {'content-type': 'application/json'}
        })
        const data= await response.json()
        resolve({data:{id:itemid}})
    })

}
