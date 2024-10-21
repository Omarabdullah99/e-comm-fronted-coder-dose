export function createOrders(order){
    return new Promise(async(resolve)=>{
        const response= await fetch('https://e-comm-backend-coder-dose.onrender.com/order',{
            method:"POST",
            body:JSON.stringify(order),
            headers: { 'content-type': 'application/json' },
        })
        const data= await response.json()
        // console.log('data of order api', data)
        resolve({data})
    })

}

export function updateOrder(order){
    return new Promise(async(resolve)=>{
        const response= await fetch('https://e-comm-backend-coder-dose.onrender.com/order/'+order.id,{
            method:"PATCH",
            body:JSON.stringify(order),
            headers: { 'content-type': 'application/json' },
        })
        const data= await response.json()
        // console.log('data of order api', data)
        resolve({data})
    })

}

export function fetchAllOrders(pagination){
    //pagination={_page:1, _limit=10}
    let queryString="";
    for (let key in pagination){
        queryString += `${key}=${pagination[key]}&`
    }
    return new Promise(async(resolve)=>{
        const response= await fetch('https://e-comm-backend-coder-dose.onrender.com/order?' + queryString)
        const data= await response.json()
        const totalItems= await response.headers.get('X-Total-Count')
        resolve({data:{orders:data, totalItems: +totalItems}})
    })
}