import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {BrowserRouter} from 'react-router-dom'
import { StoreContextProvider } from './context/StoreContext';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <StoreContextProvider>
    <App />
    </StoreContextProvider>
    </BrowserRouter>
)
