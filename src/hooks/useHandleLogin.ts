import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useHandleLogin = () => {
    const usuariosCadastrados = JSON.parse(sessionStorage.getItem('Usuarios'))
    const [formData, setFormData] = useState({ matricula: '', senha: '' });
    const navigate = useNavigate();

    const updateField = (field, value) => {
        setFormData(prevState => ({ ...prevState, [field]: value }));
    };

    const handleLogin = async () => {
        const { matricula, senha } = formData;

        if (!matricula || !senha) {
            toast.error('Por favor, preencha todos os campos.');
            return;
        }

        const usuarioAutenticado = {
            matricula: '544',
            nome: 'Théo Barreto Silva',
            cargo: 'Soldador',
            setor: 'Solda',
            email: 'barretotheo25@gmail.com',
        };

        if (matricula === usuarioAutenticado.matricula && senha === '12345') {
            sessionStorage.setItem('UserLogado', JSON.stringify(usuarioAutenticado));
            toast.success('Login bem-sucedido!');
            navigate('/dashboard');
        } else {
            toast.error('Matrícula ou senha inválidos.');
        }
    };

    return { formData, updateField, handleLogin };
};
