import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import Register from './pages/Register.jsx';
import store from './store';
import { Provider } from 'react-redux';
import Profiles from './pages/Profiles.jsx';
import Booking from './pages/Booking.jsx';
import MainBody from './components/MainBody.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profiles' element={<Profiles />} />
      <Route path='/book'  element={<Booking />} />
      <Route path='/home'  element={<MainBody />} />
     </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
