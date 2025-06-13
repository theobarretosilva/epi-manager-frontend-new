import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Router } from './router/Routes'
import ReactModal from 'react-modal';

function App() {
  ReactModal.setAppElement('#root');
  
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
