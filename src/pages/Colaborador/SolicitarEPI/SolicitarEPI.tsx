import { useEffect, useState } from 'react';
import { BtnStyled } from '../../../components/BtnStyled/BtnStyled';
import { InputStyled } from '../../../components/InputStyled/InputStyled';
import { SelectCodStyled } from '../../../components/SelectCodStyled/SelectCodStyled';
import * as S from './SolicitarEPI.styles';
import { SelectStyled } from '../../../components/SelectStyled/SelectStyled';
import { useNavigate } from 'react-router';
import useHandleFormSolicitarEPI from '../../../hooks/useHandleFormSolicitarEPI';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SolicitarEPI = () => {
    const navigate = useNavigate();
    const { formData, updateField, submitForm } = useHandleFormSolicitarEPI();

    const userLogado = JSON.parse(sessionStorage.getItem('UserLogado') || '{}');

    const EPIList = JSON.parse(sessionStorage.getItem('EPIsCadastrados') || '[]');
    const options = EPIList.map((epi: { descricaoItem: string; codigo: string }) => ({
        label: epi.descricaoItem,
        value: epi.codigo,
    }));

    const pad = (num: number) => num.toString().padStart(2, '0');
    const generateUniqueID = () => {
        const now = new Date();
        return `SOL-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    };

    const [id] = useState(() => generateUniqueID());
    
    useEffect(() => {
        updateField('id', id);
        updateField('solicitante', userLogado.nome);
    }, [updateField, userLogado.nome]);

    const handleSubmit = () => {
        if (!formData.descricaoItem || !formData.codigoEPI || !formData.prioridade || !formData.quantidade) {
            toast.error('Por favor, preencha todos os campos.');
            return;
        }

        submitForm();
        toast.success('EPI solicitado com sucesso!');
        navigate('/colaborador/solicitacoes');
    };

    return (
        <S.MainStyled>
            <S.DivMainSolicitar>
                <S.DivFlex>
                    <InputStyled 
                        disabled={true}
                        tipo='text'
                        titulo='ID da Solicitação'
                        value={formData.id}
                        handle={e => updateField('id', e.target.value)}
                    />
                    <InputStyled 
                        disabled={true}
                        tipo='text'
                        titulo='Solicitante'
                        value={userLogado.nome}
                    />
                </S.DivFlex>
                <S.DivFlex>
                    <SelectCodStyled 
                        titulo="Escolha um item"
                        value={formData.descricaoItem}
                        options={options}
                        onChange={option => {
                            updateField('descricaoItem', option.label);
                            updateField('codigoEPI', option.value);
                        }}
                    />
                    <InputStyled 
                        tipo='text'
                        titulo='Código'
                        disabled={true}
                        value={formData.codigoEPI}
                    />
                </S.DivFlex>
                <S.DivFlex>
                    <SelectStyled
                        titulo="Prioridade" 
                        value={formData.prioridade} 
                        options={['Alta', 'Média', 'Baixa']} 
                        onChange={value => updateField('prioridade', value)} 
                        name='prioridade'
                    />
                    <InputStyled 
                        tipo='number'
                        titulo='Quantidade'
                        value={formData.quantidade}
                        handle={e => {
                            const value = parseInt(e.target.value, 10);
                            updateField('quantidade', isNaN(value) ? 0 : value);
                        }}
                    />
                </S.DivFlex>
                <br />
                <BtnStyled text='Solicitar' onClick={handleSubmit} />
                <S.PVoltar onClick={() => navigate('/colaborador/solicitacoes')}>Voltar</S.PVoltar>
            </S.DivMainSolicitar>
        </S.MainStyled>
    );
};
