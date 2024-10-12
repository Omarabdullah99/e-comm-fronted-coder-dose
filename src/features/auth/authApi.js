export function createUser(userData){
    return new Promise(async(resolve)=>{
        const response = await fetch('http://localhost:8000/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'content-type': 'application/json' },
          });
          const data = await response.json();
          console.log('sign up data of authapi',data)
          // TODO: on server it will only return some info of user (not password)
          resolve({ data });

    })
}

export function updateUser(update){
  // console.log('auth api update user',update)
  return new Promise(async(resolve)=>{
    const response= await fetch('http://localhost:8000/users/'+update.id,{
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    })
    const data= await response.json()
    resolve({data})
  })

}

export function checkUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://localhost:8000/auth/login', {
          method: 'POST',
          body: JSON.stringify(loginInfo),
          headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          console.log('login data of authapi',data)
          resolve({ data });
        } else {
          const error = await response.text();
          // console.log('login error of authapi',error)
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
    });
  }

  export function signOut(userId) {
    return new Promise(async (resolve) => {
      // TODO: on server we will remove user session info
      resolve({ data: 'success' });
    });
  }

 