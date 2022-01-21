import React, { useEffect, useState ,useMemo} from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import Auth  from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken,decodeToken,removeToken } from './utils/token';
import AuthContext from './context/AuthContext';
import Navigation from './routes/Navigation';


function App() {
  const [auth,setAuth] = useState(undefined);

  useEffect(() => {
    const token  =getToken();
    if(!token){
      setAuth(null);
    }else{
      setAuth(decodeToken(token))
    }
  }, []);


  const logout = ()=>{
    removeToken();
    setAuth(null);
  }

  const setUser = (user)=>{//Actualiza el usuario con useState
    setAuth(user);
  }

  const authData = useMemo(() => //Actualiza el usuario con useState
    (
      {
        auth:auth,
        logout:logout,
        setUser:setUser
      }
    ),
    [auth]
  );

  if(auth===undefined) return null;


  return (
  
    <ApolloProvider client= {client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation/>}     
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
