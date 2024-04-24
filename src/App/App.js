import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
//import BasicExample from './basicExample';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../navBar';
import UserProfile from '../Profile/UserProfile';
import Login from '../Login/Login';
import useLoginToken from './LoginToken';
import useToken from '../useToken';



const Home = () => <div>Home Page</div>;
const Postcards = () => <div>Postcards Page</div>;
const Gallery = () => <div>Gallery Page</div>;
const SearchUser = () => <div>Search User Page</div>;
// const UserProfile = () => <div>User Profile Page</div>;

function PrivateRoute () {
  console.log("in private route");
  const user = JSON.parse(sessionStorage.getItem('loginToken'));
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

function AnonymousRoute () {
  console.log("in anon route");
  const user = JSON.parse(sessionStorage.getItem('loginToken'));
  return user ? <Navigate to="/" replace /> : <Outlet />;
}

const App = () => {

  // const [loginToken, setLoginToken] = useState();
  const {loginToken, setLoginToken } = useLoginToken();
  const [loginState, setLoginState] = useState(loginToken);
  // const { token, setToken } = useToken();

  // setLogin(false);
  // localStorage.clear();
  if(loginToken) {
  // if(token) {
    console.log("app sees token");
    console.log(loginState);
    // setLoginState(true);
  }

  // useEffect(() => {

  // }, [loginToken]);

  return (
    <Router>
      <div>
        <NavigationBar loginToken={loginToken} loginState={loginState}/>
        {/* <NavigationBar loginToken={token}/> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postcards" element={<Postcards />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/searchuser" element={<SearchUser />} />

          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/userprofile' element={
              <UserProfile loginToken={loginToken} setLoginToken={setLoginToken} setLoginState={setLoginState}/>
            } />
          </Route>
          <Route element={<AnonymousRoute />}>
            {/* <Route path='/register' element={<RegisterUser />} /> */}
            <Route path='/login' element={
              <Login loginToken={loginToken} setLoginToken={setLoginToken} setLoginState={setLoginState}/>
            } />
            {/* <Route path='/forgotpassword' element={<ForgotPassword />} /> */}
          </Route>

          {/* <Route path="/userprofile" element={
            <UserProfile loginToken={loginToken} setLoginToken={setLoginToken}/>
          }/>
          <Route path="/login" element={
            <Login loginToken={loginToken} setLoginToken={setLoginToken} />
          }/> */}
          {/* <Route path="/userprofile" element={<UserProfile loginToken={token} setLoginToken={setToken}/>} />
          <Route path="/login" element={<Login loginToken={token} setLoginToken={setToken} />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
