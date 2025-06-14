import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Router } from './router/Routes'
import ReactModal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css' ;

function App() {
  ReactModal.setAppElement('#root');
  
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer position='top-right' />
    </BrowserRouter>
  );
}

export default App;
