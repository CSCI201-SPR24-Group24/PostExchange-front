import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import BasicExample from './basicExample';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './navBar';
import Home from './Home';
//import LoginForm from './loginForm';

//const Home = () => <div>Home Page</div>;
const Postcards = () => <div>Postcards Page</div>;
const Gallery = () => <div>Gallery Page</div>;
const SearchUser = () => <div>Search User Page</div>;
const UserProfile = () => <div>User Profile Page</div>;

const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postcards" element={<Postcards />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/searchuser" element={<SearchUser />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
