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
import Gallery from '../Gallery.js';
import PersonalGallery from '../personalGallery.js';
import Home from '../Home/Home.js'
import ReceivedPostcards from '../Postcards/ReceivedPostcards.js'
import CreatePostcard from '../Postcards/CreatePostcard.js'
import SignUp from '../SignUp/SignUp.js';



export const baseAPIDomain = `postexchange.icytools.cn`;

const Postcards = () => <div>Postcards Page</div>;
//const Gallery = () => <div>Gallery Page</div>;
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
          <Route path="/usergallery" element={<PersonalGallery/>} />
          <Route path="/searchuser" element={<SearchUser />} />
          <Route path="/createpostcard" element={<CreatePostcard />} />
          <Route path="/receivedpostcard" element={<ReceivedPostcards />} />

          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/userprofile' element={
              <UserProfile loginToken={loginToken} setLoginToken={setLoginToken} setLoginState={setLoginState}/>
            } />
          </Route>
          <Route element={<AnonymousRoute />}>
            {/* <Route path='/register' element={<RegisterUser />} /> */}
            {/* <Route path='/forgotpassword' element={<ForgotPassword />} /> */}
            <Route path='/login' element={
              <Login loginToken={loginToken} setLoginToken={setLoginToken} setLoginState={setLoginState}/>
            } />
            <Route path='/signup' element={
              <SignUp loginToken={loginToken} setLoginToken={setLoginToken} setLoginState={setLoginState}/>
            } />
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
