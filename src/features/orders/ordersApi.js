export function createOrders(order){
    return new Promise(async(resolve)=>{
        const response= await fetch('http://localhost:8000/order',{
            method:"POST",
            body:JSON.stringify(order),
            headers: { 'content-type': 'application/json' },
        })
        const data= await response.json()
        console.log('data of order api', data)
        resolve({data})
    })

}

export function updateOrder(order){
    return new Promise(async(resolve)=>{
        const response= await fetch('http://localhost:8000/orders/'+order.id,{
            method:"PATCH",
            body:JSON.stringify(order),
            headers: { 'content-type': 'application/json' },
        })
        const data= await response.json()
        // console.log('data of order api', data)
        resolve({data})
    })

}

export function fetchAllOrders(){
    return new Promise(async(resolve)=>{
        const response= await fetch('http://localhost:8000/orders')
        const data= await response.json()
        resolve({data})
    })
}