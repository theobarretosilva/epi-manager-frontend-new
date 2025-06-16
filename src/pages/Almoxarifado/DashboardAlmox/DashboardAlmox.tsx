import { Paper } from '@mui/material'
import { Searchbar } from '../../../components/Searchbar/Searchbar'
import * as S from './DashboardAlmox.styles'
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid'
import { OpenModalIcon } from '../../../components/OpenModalIcon/OpenModalIcon'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { NoDataToShow } from '../../../components/NoDataToShow/NoDataToShow'
import ReactModal from 'react-modal'
import { AprovarSolicitacao } from '../../../components/AprovarSolicitacao/AprovarSolicitacao'
import { useGetSolicitacoes } from '../../../hooks/useGetSolicitacoes'
import { SolicitacaoProps } from '../../../props/solicitacao.props'
import { useNavigate } from 'react-router'
import { InputDisable } from '../../../components/InputDisable/InputDisable'
import { EPIProps } from '../../../props/episProps'
import { useModalDetalhesSolicitacao } from '../../../hooks/useModalDetalhesSolicitacao'
import { useGetEPIS } from '../../../hooks/useGetEPIS'
import { DeliverIcon } from '../../../components/DeliverIcon/DeliverIcon'
import { useDeliverEPI } from '../../../hooks/useDeliverEPI'
import { SelectInput } from '../../../components/SelectInput/SelectInput'
import { SolicitacaoModalProps } from '../../../props/solicitacaoModalProps'
import { ApproveIcon } from '../../../components/ApproveIcon/ApproveIcon'
import { DenyIcon } from '../../../components/DenyIcon/DenyIcon'
import { axiosInstance } from '../../../lib/axios'

export const DashboardAlmox = () => {
    const { solicitacoes } = useGetSolicitacoes();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [id, setId] = useState('');
    const navigate = useNavigate();
    const { isOpen, solicitacao, openModal, closeModal } = useModalDetalhesSolicitacao();
    const { epis } = useGetEPIS();
    const { deliverEPIMutation } = useDeliverEPI();
    const [approveDenyModalOpen, setApproveDenyModalOpen] = useState(false);
    const [selectedSolicitacaoId, setSelectedSolicitacaoId] = useState<number | null>(null);
    const [actionType, setActionType] = useState<'aprovada' | 'rejeitada' | null>(null);

    const openApproveDenyModal = (id: number, action: 'aprovada' | 'rejeitada') => {
        setSelectedSolicitacaoId(id);
        setActionType(action);
        setApproveDenyModalOpen(true);
    };

    const closeApproveDenyModal = () => {
        setApproveDenyModalOpen(false);
        setSelectedSolicitacaoId(null);
        setActionType(null);
    };

    const getValidadeEPI = useCallback((cod: number | undefined) => {
        const epi = epis?.find((epi: EPIProps) => epi.codigo === cod);
        return epi
            ? new Date(epi.data_validade).toLocaleDateString('pt-BR')
            : 'N/A';
    }, [epis]);

    const getCAEPI = (cod: number | undefined) => {
        const epi = epis?.find((epi: EPIProps) => epi.codigo === cod);
        console.log(epi)
        return epi ? epi.ca : 'N/A';
    }

    const columns: GridColDef[] = [
        {
            field: 'open',
            type: 'actions',
            headerName: 'Abrir',
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem 
                    key={0}
                    icon={<OpenModalIcon />}
                    label='Abrir'
                    onClick={() => {
                        const solicitacao = getSolicitacao(params.row.id, true);
                        if (solicitacao) {
                            openModal(solicitacao);
                        }
                    }}
                />
            ],
            width: 60
        },
        { field: 'id', headerName: 'ID', width: 60, align: 'center', headerAlign: 'center' },
        { field: 'descricaoItem', headerName: 'Descrição do Item', width: 280, align: 'center', headerAlign: 'center' },
        { field: 'urgencia', headerName: 'Urgência', width: 100, align: 'center', headerAlign: 'center'},
        { field: 'status', headerName: 'Status', width: 100, align: 'center', headerAlign: 'center' },
        { field: 'validadeEPI', headerName: 'Validade EPI', width: 100, align: 'center', headerAlign: 'center' },
        { field: 'solicitante', headerName: 'Solicitante', width: 170, align: 'center', headerAlign: 'center' },
        {
            field: 'deliver',
            type: 'actions',
            headerName: 'Entregar',
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem 
                    key={0}
                    icon={<DeliverIcon />}
                    label='Entregar'
                    onClick={() => deliverEPIMutation.mutate(params.row.id)}
                />
            ],
            width: 80
        },
        {
            field: 'approveDeny',
            type: 'actions',
            headerName: 'Aprovar/Negar',
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key="aprovada"
                    icon={<ApproveIcon />}
                    label="Aprovar"
                    onClick={() => openApproveDenyModal(params.row.id, 'aprovada')}
                    showInMenu={false}
                />,
                <GridActionsCellItem
                    key="rejeitada"
                    icon={<DenyIcon />} 
                    label="Negar"
                    onClick={() => openApproveDenyModal(params.row.id, 'rejeitada')}
                    showInMenu={false}
                />
            ],
            width: 140,
        }
    ];

    const rows = useMemo(() => 
        solicitacoes?.map((solicitacao: SolicitacaoProps) => ({
            id: solicitacao.id,
            descricaoItem: solicitacao.equipamento.descricao,
            urgencia: solicitacao.urgencia,
            status: solicitacao.status,
            validadeEPI: new Date(solicitacao.equipamento.data_validade).toLocaleDateString('pt-BR'),
            solicitante: solicitacao.solicitante.nome
        })) ?? [], [solicitacoes]
    );

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);

    useEffect(() => {
        if (rows) setFilteredRows(rows);
    }, [rows]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        if (!value) {
            setFilteredRows(rows);
            return;
        }

        const normalized = (text: string | undefined) =>
            (text ?? '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        setFilteredRows(
            rows?.filter((row) => {
                return (
                    normalized(row.descricaoItem).includes(normalized(value)) ||
                    normalized(row.status).includes(normalized(value)) ||
                    normalized(row.urgencia).includes(normalized(value)) ||
                    normalized(row.solicitante).includes(normalized(value)) ||
                    row.id?.toString().includes(value)
                );
            })
        );
    };

    function getSolicitacao(idSolicitacao: number, modal: true): SolicitacaoModalProps | undefined;
    function getSolicitacao(idSolicitacao: number, modal: false): SolicitacaoProps | undefined;
    function getSolicitacao(idSolicitacao: number, modal: boolean): SolicitacaoProps | SolicitacaoModalProps | undefined {
        const solicitacao = solicitacoes?.find(s => s.id === idSolicitacao);
        if (!solicitacao) return undefined;

        if (modal) {
            return {
                id: solicitacao.id,
                status: solicitacao.status,
                dataSolicitacao: solicitacao.dataAbertura,
                solicitante: solicitacao.solicitante,
                quantidade: solicitacao.qtd,
                codigoEPI: solicitacao.equipamento.codigo,
                urgencia: solicitacao.urgencia,
                dataConclusao: solicitacao.dataConclusao,
                item: solicitacao.equipamento.descricao
            };
        } else {
            return solicitacao;
        }
    }

    const handleApproveDenyConfirm = async () => {
        if (!selectedSolicitacaoId || !actionType) return;

        try {
            await axiosInstance.put('/solicitacoes/aprove', {
                    status: actionType.toUpperCase(),
                    id: selectedSolicitacaoId
                }
            )

            // Depois atualizar lista ou refetch
            // Por exemplo, chamar a função de busca de solicitações ou mutação do react-query
            // Aqui só fechar modal e talvez atualizar a lista
            closeApproveDenyModal();
            // Opcional: refetch das solicitações
        } catch (error) {
            console.error('Erro ao atualizar solicitação:', error);
            // Mostrar mensagem de erro para o usuário, se desejar
        }
    };

    return(
        <>
            <S.MainStyled>
                {rows && rows.length > 0 ? (
                    <>
                        <Paper sx={{ height: '100%', width: '100%', fontSize: 14, mt: 0 }}>
                            <S.DivBtnSearch>
                                <S.ButtonStyled onClick={() => navigate('/almoxarifado/solicitarEPI')}>+ Fazer Solicitação</S.ButtonStyled>
                                <Searchbar placeholder='Buscar por ID, item, status, urgência ou solicitante...' value={searchTerm} onSearch={handleSearch} />
                            </S.DivBtnSearch>
                            <DataGrid
                                rows={filteredRows.length > 0 || searchTerm ? filteredRows : rows}
                                columns={columns}
                                autoHeight
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 3, page: 0 },
                                    },
                                }}
                                sx={{
                                    border: 0,
                                    '& .MuiDataGrid-cell': { textAlign: 'center' },
                                    '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5' },
                                }}
                            />
                        </Paper>
                    </>
                ) : (
                    <>
                        <S.ButtonStyled onClick={() => navigate('/administrador/solicitarEPI')}>+ Fazer Solicitação</S.ButtonStyled>
                        <NoDataToShow mainText='Não foi feita nenhuma solicitação!' />
                    </>
                )}
                
            </S.MainStyled>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={S.customStyles}
            >
                <S.ImageContent onClick={() => setModalIsOpen(false)}>
                    <S.Image src="../../src/assets/svg/Close.svg" />
                </S.ImageContent>
                <AprovarSolicitacao setModalIsOpen={setModalIsOpen} id={id}/>
            </ReactModal>
            <ReactModal isOpen={isOpen} onRequestClose={closeModal} style={S.customStyles}>
                <S.MainWrapper>
                    <S.ImageContent onClick={closeModal}>
                        <S.Image src="../../src/assets/svg/Close.svg" />
                    </S.ImageContent>
                    <S.DivWrapper>
                        <InputDisable text={solicitacao?.dataSolicitacao ? new Date(solicitacao.dataSolicitacao).toLocaleDateString() : ''} title="Data de Abertura" type="text" />
                        <InputDisable text={solicitacao?.dataConclusao ? new Date(solicitacao.dataConclusao).toLocaleDateString() : ''} title="Data de Conclusão" type="text" />
                        <InputDisable text={solicitacao?.status ?? ''} title="Status" type="text" />
                        <InputDisable text={solicitacao?.id + ''} title="ID da Solicitação" type="text" />
                        <InputDisable text={solicitacao?.solicitante?.nome ?? ''} title="Solicitante" type="text" />
                        <InputDisable text={solicitacao?.quantidade + ''} title="Quantidade" type="number" />
                        <InputDisable text={solicitacao?.item ?? ''} title="Item" type="text" />
                        <InputDisable text={solicitacao?.codigoEPI + ''} title="Código" type="text" />
                        <SelectInput disable={true} text={solicitacao?.urgencia ?? ''} title="Urgência" />
                        <InputDisable text={getCAEPI(solicitacao?.codigoEPI)} title="CA" type="text" />
                        <InputDisable text={getValidadeEPI(solicitacao?.codigoEPI)?.toLocaleString?.() || getValidadeEPI(solicitacao?.codigoEPI)?.toString?.() || 'N/A'}  title="Validade do EPI" type="text" />
                    </S.DivWrapper>
                </S.MainWrapper>
            </ReactModal>
            <ReactModal
                isOpen={approveDenyModalOpen}
                onRequestClose={closeApproveDenyModal}
                style={S.customStyles}
            >
                <S.ImageContent onClick={closeApproveDenyModal}>
                    <S.Image src="../../src/assets/svg/Close.svg" />
                </S.ImageContent>
                <S.ModalContent>
                    <h2>{actionType === 'aprovada' ? 'Aprovar' : 'Negar'} Solicitação</h2>
                    <p>Tem certeza que deseja {actionType === 'rejeitada' ? 'negar' : 'aprovar'} a solicitação #{selectedSolicitacaoId}?</p>
                    <S.ButtonContainer>
                        <S.ButtonStyled onClick={handleApproveDenyConfirm}>Confirmar</S.ButtonStyled>
                        <S.ButtonStyled onClick={closeApproveDenyModal}>Cancelar</S.ButtonStyled>
                    </S.ButtonContainer>
                </S.ModalContent>
            </ReactModal>
        </>
    )
}