import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import "./styles/App.css"
import { Link,Outlet } from "react-router-dom";

const App = () => {
  //get posts from api
  //fetch posts
  // const [posts,setFakeItem]=useState({});
  //   const [error,setError]=useState(null);
  //   const [loading,setLoading] = useState(true);
  // useEffect(()=>{
  //   fetch('https://fakestoreapi.com/products/'+itemNumber)
  //   .then((response)=>response.json())
  //   .then((json)=>setFakeItem(json))
  //   .catch((error)=>setError(error))
  //   .finally(()=>setLoading(false));
  //  },[])
  //  if(error) return <p>Error</p>
  //  if(loading) return <p>Loading</p>
  useEffect(()=>{
    fetch("https://blog-api-backend-59l7.onrender.com/posts",{
      method: "GET",
      mode:"cors"
    })
    .then((response)=>response.json())
    .then((json)=>console.log(json))

  },[])
  

 //include method type
//  const response = await fetch("/api/posts", {
//   method: "GET",
// });
//api - url of backend data

//making a post
// const request = new Request("/api/posts", {
//   method: "POST",
//   body: JSON.stringify({ username: "example" }),
// });

// const response1 = await fetch(request);
// console.log(response1.status);
  //fetch users
  const [posts, setPosts] = useState(1);

  return (
    <>
      <NavBar></NavBar>
      <Outlet context={[posts,setPosts]}/>
    </>
  );
};

export default App;

