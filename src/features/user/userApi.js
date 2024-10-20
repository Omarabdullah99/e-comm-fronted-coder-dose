
export function fetchOrdersByUserId(userId){
    return new Promise(async(resolve)=>{
        const response= await fetch('https://e-comm-backend-coder-dose.vercel.app/order/'+userId)
        const data= await response.json()
        // console.log('user api',data)
        resolve({data})
    })

}