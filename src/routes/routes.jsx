import App from '../App.jsx';
import PostPage from '../components/Postpage.jsx';
import HomePage from '../components/Homepage.jsx';

const routes = [
  {
    path: "/",
    element: <App />,
    children:[
      { index: true, element: <HomePage /> },
      {path: "homepage",element: <HomePage/>},
      {path: "otherpage/:id",element: <PostPage />},
      
    ]
  },
];
export default routes;