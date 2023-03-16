import axios from './axios'



export const login = (
  { email, password,setLogged,setUser}) => {
  ///api call
  axios.post("/api/user/login", { email, password })
    .then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setUser(data);
        sessionStorage.setItem("token", JSON.stringify(data));
        setTimeout(() => {
           setLogged(true)
        }, 1000);
      }
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};


export const registerr=({email,password,firstName,lastName},successNotification,errorNotification)=>{
  axios.post("/api/auth/register",{email,password,firstName,lastName})
    .then((res)=>{
      if(res.status===201){
        const data=res.data;
        successNotification("Registered Successfully")
        setTimeout(() => {
           window.location="/";
        }, 2000);
      }
    })
    .catch((err)=>{
      console.log(err.response.data);
      errorNotification(err.response.data);
    })
}

export const logout = (setLogged) => {
  if (sessionStorage.getItem("token")) {
    sessionStorage.removeItem("token");
    window.location = "/";
  }
};