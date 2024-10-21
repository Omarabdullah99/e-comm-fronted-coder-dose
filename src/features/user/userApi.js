
export function fetchOrdersByUserId(userId){
    return new Promise(async(resolve)=>{
        const response= await fetch('https://e-comm-backend-coder-dose.onrender.com/order/'+userId)
        const data= await response.json()
        // console.log('user api',data)
        resolve({data})
    })

}