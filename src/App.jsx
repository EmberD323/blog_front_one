import { useState } from "react";
import NavBar from "./components/NavBar";
import "./styles/App.css"
import { Link,Outlet } from "react-router-dom";
const App = () => {
  //get posts from api
  const [posts, setPosts] = useState(1);

  return (
    <>
      <NavBar></NavBar>
      <Outlet context={[posts,setPosts]}/>
    </>
  );
};

export default App;

