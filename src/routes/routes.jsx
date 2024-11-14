import App from '../App.jsx';
import PostPage from '../components/Postpage.jsx';
import HomePage from '../components/Homepage.jsx';
import PostEdit from '../components/PostEdit.jsx';
import Signup from '../components/Signup.jsx';
import Login from '../components/Login.jsx';




const routes = [
  {
    path: "/",
    element: <App />,
    children:[
      { index: true, element: <HomePage /> },
      {path: "homepage",element: <HomePage/>},
      {path: "signup",element: <Signup/>},
      {path: "login",element: <Login/>},
      {path: "postpage/:id",element: <PostPage />},
      {path: "postedit/:id",element: <PostEdit />},
      
    ]
  },
];
export default routes;