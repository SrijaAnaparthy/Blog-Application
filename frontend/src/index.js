import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App'
import { Provider } from 'react-redux';
import store from './store/store';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import AddPost from './components/Posts/AddPost/AddPost';
import AddAd from './components/Ads/AddAd/AddAds';
import MyPosts from './components/Posts/MyPosts/MyPosts';
import SelectedUserPosts from './components/Posts/SelectUser/SelectedUserPosts';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/addpost' element={<AddPost/>}></Route>
      <Route path='/addad' element={<AddAd/>}></Route>
      <Route path='/myposts' element={<MyPosts/>}></Route>
      <Route path="/user/:username" element={<SelectedUserPosts/>}></Route>
      <Route path='/' element={<App />}/>
    </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
