import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Router } from './router/Routes'
import ReactModal from 'react-modal';
import { useEffect } from 'react';

function App() {
  ReactModal.setAppElement('#root');
  
  useEffect(() => {
    const defaultAdmin = {
      matricula: '01',
      salt: '861918edf24cc72e2536a8b254a0f692',
      hash: 'af067cef1a2dd778c535f67aa3acde28c8b33db518b3d8a384943f6069c3f648',
      tipoAcesso: 'Administrador',
      cargo: 'Administrador',
      email: 'admin_master@gmail.com',
      id: '01',
      nome: 'Administrador Master',
      setor: 'TI'
    };

    const colaboradoresString = sessionStorage.getItem('ColaboradoresCadastrados');
    let colaboradores = [];

    if (colaboradoresString) {
      try {
        colaboradores = JSON.parse(colaboradoresString);
      } catch (e) {
        console.error("Erro ao parsear colaboradores:", e);
      }
    }

    if (Array.isArray(colaboradores) && !colaboradores.some((colaborador) => colaborador.matricula === defaultAdmin.matricula)) {
      sessionStorage.setItem(
        'ColaboradoresCadastrados',
        JSON.stringify([...colaboradores, defaultAdmin])
      );
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
