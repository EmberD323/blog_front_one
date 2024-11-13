import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import "./styles/App.css"
import { Link,Outlet } from "react-router-dom";

const App = () => {
  //fetch posts
  const [posts,setPosts]=useState(null);
  const [error,setError]=useState(null);
  const [loading,setLoading] = useState(true);
  
  useEffect(()=>{
    fetch("https://blog-api-backend-59l7.onrender.com/posts",{
      method: "GET",
      mode:"cors"
    })
    .then((response)=>response.json())
    .then((json)=>setPosts(json))
    .catch((error)=>setError(error))
    .finally(()=>setLoading(false));
  },[])
  if(error) return <p>Error</p>
  if(loading) return <p>Loading</p>
  return (
    <>
      <NavBar></NavBar>
      <Outlet context={[posts,setPosts]}/>
    </>
  );
};

export default App;


//making a post
// const request = new Request("/api/posts", {
//   method: "POST",
//   body: JSON.stringify({ username: "example" }),
// });
