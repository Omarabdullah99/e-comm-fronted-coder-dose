
// authApi.js
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
      try {
          const token = localStorage.getItem('ecommerceProfile') 
              ? JSON.parse(localStorage.getItem('ecommerceProfile')).token 
              : null;

          const response = await fetch('https://e-comm-backend-coder-dose.vercel.app/auth/signup', {
              method: 'POST',
              body: JSON.stringify(userData),
              headers: { 
                  'Content-Type': 'application/json',
                  ...(token && { 'Authorization': `Bearer ${token}` }) // টোকেন যোগ করা হচ্ছে
              },
          });

          const data = await response.json();

          if (!response.ok) {
            // ব্যর্থ হলে `reject` করতে হবে
            return reject(data.message || 'Something went wrong');
          }

          resolve({data});
      } catch (error) {
        
          reject(error.message);
      }
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
      try {
          const token = localStorage.getItem('ecommerceProfile') 
              ? JSON.parse(localStorage.getItem('ecommerceProfile')).token 
              : null;

          const response = await fetch('https://e-comm-backend-coder-dose.vercel.app/auth/login', {
              method: 'POST',
              body: JSON.stringify(loginInfo),
              headers: { 
                  'Content-Type': 'application/json',
                  ...(token && { 'Authorization': `Bearer ${token}` }) // টোকেন যোগ করা হচ্ছে
              },
          });

          const data = await response.json();
          if (!response.ok) {
            // ব্যর্থ হলে `reject` করতে হবে
            return reject(data.message || 'Something went wrong');
          }
          resolve({data}); //note ei line ta eivabe na likle localstore e set hote problem kore
      } catch (error) {
       
          reject(error.message);
      }
  });
}

export function fetchUserById(userId){
  return new Promise(async(resolve)=>{
    const response= await fetch('https://e-comm-backend-coder-dose.vercel.app/user/'+userId)
    const data= await response.json()
    resolve({data})
  })
}
export function updateUser(update){
  // console.log('auth api update user',update)
  return new Promise(async(resolve)=>{
    const response= await fetch('https://e-comm-backend-coder-dose.vercel.app/user/'+update.id,{
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    })
    const data= await response.json()
    resolve({data})
  })

}



  export function signOut(userId) {
    return new Promise(async (resolve) => {
      // TODO: on server we will remove user session info
      resolve({ data: 'success' });
    });
  }

 