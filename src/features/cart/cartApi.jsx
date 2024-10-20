export function createCart(cartItem){
    console.log('api cartitem check', cartItem)
    return new Promise(async(resolve)=>{
        const response= await fetch('https://e-comm-backend-coder-dose.vercel.app/cart',{
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
        const respose= await fetch('https://e-comm-backend-coder-dose.vercel.app/cart?user=' +id)
        const data= await respose.json()
        resolve({data})

    })

}

export function updateCartItem(update){
    // console.log('cart api update', update)
    return new Promise(async(resolve)=>{
        // console.log('update item api', update)
        const response= await fetch('https://e-comm-backend-coder-dose.vercel.app/cart/'+update.id,{
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
        const response= await fetch('https://e-comm-backend-coder-dose.vercel.app/cart/'+itemid,{
            method: 'DELETE',
            headers: {'content-type': 'application/json'}
        })
        const data= await response.json()
        resolve({data:{id:itemid}})
    })

}


export function resetCart(userId){
    return new Promise(async(resolve)=>{
        //getCartItem by specific user id
        const response= await getCartItemByUserId(userId)
        console.log('getcartById by reset', response)
        const items= response.data

        for(let item of items){
            //delete cartItem by specific user id
          await  deleteCart(item.id)
        }
        resolve({status:'succes reset cart'})
    })

}