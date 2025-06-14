import { useEffect, useState } from 'react';
import { BtnStyled } from '../../components/BtnStyled/BtnStyled';
import { InputStyled } from '../../components/InputStyled/InputStyled';
import { SelectCodStyled } from '../../components/SelectCodStyled/SelectCodStyled';
import * as S from './SolicitarEPI.styles';
import { SelectStyled } from '../../components/SelectStyled/SelectStyled';
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetEPIS } from '../../hooks/useGetEPIS';
import { EPIProps } from '../../props/episProps';
import { useGetUserLogado } from '../../hooks/useGetUserLogado';
import { useHandleFormSolicitarEPI } from '../../hooks/useHandleFormSolicitarEPI';

export const SolicitarEPI = () => {
    const { userLogado, isError } = useGetUserLogado();
    const { defaultValues, handleSubmit, onSubmit, register, reset, responseError, setValue, watch } = useHandleFormSolicitarEPI();
    const { epis } = useGetEPIS();
    const navigate = useNavigate();

    const options = epis?.map((epi: EPIProps) => ({
        label: epi.descricao,
        value: epi.codigo,
    }));

    const handleSubmit = () => {
        if (!formData.descricaoItem || !formData.codigoEPI || !formData.urgencia || !formData.quantidade) {
            toast.error('Por favor, preencha todos os campos.');
            return;
        }

        submitForm();
        toast.success('EPI solicitado com sucesso!');
        navigate('/colaborador/solicitacoes');
    };

    const handleItemChange = (option: { label: string; value: string }) => {
        updateField('descricaoItem', option.label);
        updateField('codigoEPI', option.value);
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
                        onChange={e => updateField('id', e.target.value)}
                    />
                    <InputStyled 
                        disabled={true}
                        tipo='text'
                        titulo='Solicitante'
                        value={userLogado?.nome}
                    />
                </S.DivFlex>
                <S.DivFlex>
                    <SelectCodStyled
                        titulo="Escolha um item"
                        value={formData.descricaoItem}
                        options={options}
                        onChange={handleItemChange}
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
                        titulo="Urgência" 
                        value={formData.urgencia} 
                        options={['Alta', 'Média', 'Baixa']} 
                        onChange={value => updateField('urgencia', value)} 
                        name='urgencia'
                    />
                    <InputStyled 
                        tipo='number'
                        titulo='Quantidade'
                        value={formData.quantidade}
                        onChange={e => {
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
