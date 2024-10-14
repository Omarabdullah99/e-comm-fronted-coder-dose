
export function fetchOrdersByUserId(userId){
    return new Promise(async(resolve)=>{
        const response= await fetch('http://localhost:8000/orders?user.id='+userId)
        const data= await response.json()
        // console.log('user api',data)
        resolve({data})
    })

}