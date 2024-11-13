import App from '../App.jsx';
import OtherPage from '../components/Otherpage.jsx';
import HomePage from '../components/Homepage.jsx';

const routes = [
  {
    path: "/",
    element: <App />,
    children:[
      { index: true, element: <HomePage /> },
      {path: "homepage",element: <HomePage/>},
      {path: "otherpage",element: <OtherPage />},
      
    ]
  },
];
export default routes;