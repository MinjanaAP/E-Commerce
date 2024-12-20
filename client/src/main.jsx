import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routers/router.jsx'
import 'remixicon/fonts/remixicon.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import React from 'react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router ={router}/>
  </Provider>,
)
