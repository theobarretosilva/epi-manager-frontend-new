import { useEffect } from 'react';
import { BtnStyled } from '../../components/BtnStyled/BtnStyled';
import { InputStyled } from '../../components/InputStyled/InputStyled';
import { SelectCodStyled } from '../../components/SelectCodStyled/SelectCodStyled';
import * as S from './SolicitarEPI.styles';
import { SelectStyled } from '../../components/SelectStyled/SelectStyled';
import { useNavigate } from 'react-router';
import "react-toastify/dist/ReactToastify.css";
import { useGetEPIS } from '../../hooks/useGetEPIS';
import { EPIProps } from '../../props/episProps';
import { useGetUserLogado } from '../../hooks/useGetUserLogado';
import { useHandleFormSolicitarEPI } from '../../hooks/useHandleFormSolicitarEPI';
import { Urgencia } from '../../enums/Urgencia';
import { OptionProps } from '../../props/optionProps';
import { useGetColaboradores } from '../../hooks/useGetColaboradores';
import { SubmitHandler } from 'react-hook-form';

export const SolicitarEPI = () => {
    const { userLogado } = useGetUserLogado();
    console.log('userLogado id:', userLogado?.id);
    const { 
        onSubmit,
        handleSubmit,
        register,
        responseError,
        setValue,
        watch,
        errors
    } = useHandleFormSolicitarEPI();
    const { epis } = useGetEPIS();
    const navigate = useNavigate();
    const tipoAcessoStorage = sessionStorage.getItem('TipoAcesso');
    const tipoAcesso = tipoAcessoStorage?.toLowerCase() || userLogado?.permissao?.toLowerCase() || 'colaborador';
    const { colaboradores } = useGetColaboradores();
    const colaboradoresList = colaboradores?.filter((colab) => colab.nome_lideranca == userLogado?.nome);

    const options: OptionProps[] = (epis ?? []).map((epi: EPIProps) => ({
        label: epi.descricao || '',
        value: epi.codigo ?? 0,
    }));

    const handleItemChange = (option: OptionProps) => {
        setValue('descricaoItem', option.label);
        setValue('equipamentoId', option.value);
    };

    useEffect(() => {
        if (userLogado?.nome) {
            setValue('solicitante', userLogado.nome);
            setValue('responsavel', userLogado.nome || '');
            setValue('matricula_responsavel', userLogado.matricula + '');
        }
    }, [setValue, userLogado]);

    const redirectPaths: Record<string, string> = {
        admin: '/administrador/solicitacoes',
        colaborador: '/colaborador/solicitacoes',
        almoxarifado: '/almoxarifado/dashboardAlmox',
    };
    const path = redirectPaths[tipoAcesso] || '/';

console.log('Erros do formulário:', errors);
    return (
        <S.MainStyled>
            <S.FormMainSolicitar onSubmit={handleSubmit(onSubmit as SubmitHandler<unknown>)}>
                <S.DivFlex>
                    <InputStyled 
                        tipo="text"
                        titulo="Solicitante"
                        disabled
                        value={watch('solicitante')}
                    />
                    <SelectStyled
                        titulo="Responsável pelo EPI"
                        value={watch('responsavelEPI')}
                        options={colaboradoresList?.map(colab => colab.nome) || []}
                        onChange={(value) => {
                            if (value) setValue("responsavelEPI", value);
                        }}
                        name='responsavelEPI'
                        disabled={!colaboradoresList || colaboradoresList.length === 0}
                    />
                </S.DivFlex>
                
                <p style={{color: 'red', margin: '0'}}>{errors.solicitante?.message}</p>
                <S.DivFlex>
                    <SelectCodStyled
                        titulo="Escolha um item"
                        options={options}
                        onChange={handleItemChange}
                    />
                    <p style={{color: 'red', margin: '0'}}>{errors.descricaoItem?.message}</p>
                    <InputStyled
                        tipo="text"
                        titulo="Código do EPI"
                        {...register('equipamentoId')}
                        value={watch('equipamentoId')}
                    />
                    <p style={{color: 'red', margin: '0'}}>{errors.equipamentoId?.message}</p>
                </S.DivFlex>
                <S.DivFlex>
                    <SelectStyled
                        titulo="Urgência"
                        value={watch("urgencia")}
                        options={['Alta', 'Média', 'Baixa']}
                        onChange={(value) => {
                            if (value) setValue("urgencia", value as Urgencia);
                        }}
                        name='urgencia'
                    />
                    <p style={{color: 'red', margin: '0'}}>{errors.urgencia?.message}</p>
                    <InputStyled 
                        tipo='number'
                        titulo='Quantidade'
                        {...register('qtd')}
                        value={watch('qtd')}
                    />
                    <p style={{color: 'red', margin: '0'}}>{errors.qtd?.message}</p>
                </S.DivFlex>
                {!!responseError && <p>{responseError}</p>}
                <BtnStyled text='Solicitar' type='submit' />
                <S.PVoltar onClick={() => navigate(path)}>Voltar</S.PVoltar>
            </S.FormMainSolicitar>
        </S.MainStyled>
    );
};
