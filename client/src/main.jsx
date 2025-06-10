import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google';
const CLIENT_ID = "126238218384-aoelvufpimlh9dinbqvclj6oo2dbd75r.apps.googleusercontent.com"
  
createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <GoogleOAuthProvider clientId={CLIENT_ID}>
<App />
  </GoogleOAuthProvider>
  </BrowserRouter>,
)
