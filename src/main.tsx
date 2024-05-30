import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ListScreen from './screens/ListScreen/ListScreen.tsx'
import NotFoundScreen from './screens/NotFoundScreen/NotFoundScreen.tsx'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  { path: '/', element: <RegisterScreen />, errorElement: <NotFoundScreen /> },
  { path: '/list', element: <ListScreen /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
