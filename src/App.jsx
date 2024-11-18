import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import "./styles/App.css"
import { Outlet } from "react-router-dom";

const App = () => {
  const [posts,setPosts]=useState(null);
  const [error,setError]=useState(null);
  const [loading,setLoading] = useState(true);
  const initalToken = localStorage.getItem("token");
  const [token,setToken] = useState(initalToken);
  const [edit,setEdit] = useState(true);
  const [users,setUsers] = useState(null);

  //fetch users
  useEffect(()=>{
    fetch("https://blog-api-backend-59l7.onrender.com/users",{
      method: "GET",
      mode:"cors"
    })
    .then((response)=>response.json())
    .then((json)=>setUsers(json))
    .catch((error)=>setError(error))
  },[])
  //fetch posts
  useEffect(()=>{
    fetch("https://blog-api-backend-59l7.onrender.com/posts",{
      method: "GET",
      mode:"cors"
    })
    .then((response)=>response.json())
    .then((json)=>setPosts(json))
    .catch((error)=>setError(error))
    .finally(()=>setLoading(false));
  },[edit])

  if(error) return <p>Error</p>
  if(loading) return <p>Loading</p>
  return (
    <>
      <NavBar token={token} setToken={setToken}></NavBar>
      <Outlet context={[posts,setPosts,token,setToken,edit,setEdit,users,setUsers]}/>
    </>
  );
};

export default App;