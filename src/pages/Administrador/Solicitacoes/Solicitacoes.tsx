import { Paper } from '@mui/material'
import { Searchbar } from '../../../components/Searchbar/Searchbar'
import * as S from './Solicitacoes.styled'
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid'
import { OpenModalIcon } from '../../../components/OpenModalIcon/OpenModalIcon';
import { useState } from 'react';
import { DownloadSoliciIcon } from '../../../components/DownloadSoliciIcon/DownloadSoliciIcon';
import jsPDF from 'jspdf';
import { useModalDetalhesSolicitacao } from '../../../hooks/useModalDetalhesSolicitacao';
import ReactModal from 'react-modal';
import { InputDisable } from '../../../components/InputDisable/InputDisable';
import { SelectInput } from '../../../components/SelectInput/SelectInput';
import { NoDataToShow } from '../../../components/NoDataToShow/NoDataToShow';
import { ModuloNSoliciDash } from '../../../components/ModuloNSoliciDash/ModuloNSoliciDash';
import { ModuloNStatSoli } from '../../../components/ModuloNStatSoli/ModuloNStatSoli';
import { useGetSolicitacoes } from '../../../hooks/useGetSolicitacoes';
import { EPIProps } from '../../../props/episProps';
import { useGetEPIS } from '../../../hooks/useGetEPIS';
import { SolicitacaoProps } from '../../../props/solicitacao.props';
import { SolicitacaoModalProps } from '../../../props/solicitacaoModalProps';

export const Solicitacoes = () => {
    const { 
        isOpen,
        descricaoItem,
        id,
        status,
        dataSolicitacao,
        solicitante,
        quantidade,
        codigoEPI,
        prioridade,
        dataConclusao,
        openModal,
        closeModal 
    } = useModalDetalhesSolicitacao();
    const { solicitacoes } = useGetSolicitacoes();
    const { epis } = useGetEPIS();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRows, setFilteredRows] = useState();

    const getValidadeEPI = (cod: number | undefined) => {
        const epi = epis?.find((epi: EPIProps) => epi.codigo === cod);
        return epi ? epi.dataValidade : 'N/A';
    };

    const getCAEPI = (cod: number | undefined) => {
        const epi = epis?.find((epi: EPIProps) => epi.codigo === cod);
        console.log(epi)
        return epi ? epi.ca : 'N/A';
    }

    const getSolicitacao = (idSolicitacao: number, modal: boolean) => {
        const solicitacao = solicitacoes?.find((solicitacao: SolicitacaoProps) => solicitacao.id == idSolicitacao);
        if (modal) {
            const solicitacaoModal: SolicitacaoModalProps = {
                descricaoItem: solicitacao?.epi.descricao,
                id: solicitacao?.id,
                status: solicitacao?.status,
                dataSolicitacao: solicitacao?.dataAbertura,
                solicitante: solicitacao?.solicitante,
                quantidade: solicitacao?.qtd,
                codigoEPI: solicitacao?.epi.codigo,
                urgencia: solicitacao?.urgencia,
                dataConclusao: solicitacao?.dataConclusao
            }
            return solicitacaoModal;
        } else {
            return solicitacao;
        }
        
    }

    const generatePDF = (solicitacao: SolicitacaoProps) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Detalhes da Solicitação', 10, 10);

        doc.setFontSize(12);
        doc.text(`ID: ${solicitacao.id}`, 10, 30);
        doc.text(`Item: ${solicitacao.epi.descricao}`, 10, 40);
        doc.text(`Status: ${solicitacao.status}`, 10, 50);
        doc.text(`Código do EPI: ${solicitacao.epi.codigo}`, 10, 60);
        doc.text(`Urgência: ${solicitacao.urgencia}`, 10, 70);

        doc.save(`Solicitacao-${solicitacao.id}.pdf`);
    };


    const columns: GridColDef[] = [
        {
            field: 'open',
            type: 'actions',
            headerName: 'Abrir',
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key={0}
                    icon={<OpenModalIcon />}
                    label="Abrir"
                    onClick={() => openModal(getSolicitacao(params.row, true))}
                />,
            ],
            width: 90,
        },
        { field: 'id', headerName: 'ID', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'descricaoItem', headerName: 'Descrição do Item', width: 280, align: 'center', headerAlign: 'center' },
        { field: 'prioridade', headerName: 'Prioridade', width: 130, align: 'center', headerAlign: 'center'},
        { field: 'status', headerName: 'Status', width: 130, align: 'center', headerAlign: 'center' },
        { field: 'validadeEPI', headerName: 'Validade EPI', width: 150, align: 'center', headerAlign: 'center' },
        { 
            field: 'download',
            type: 'actions',
            headerName: 'Baixar', 
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key={0}
                    icon={<DownloadSoliciIcon />}
                    label="Download"
                    onClick={() => generatePDF(getSolicitacao(params.row, false))}
                />,
            ],
            width: 90,
            align: 'center',
            headerAlign: 'center'
        }
    ];

    const rows = solicitacoes?.map((solicitacao: SolicitacaoProps) => ({
        id: solicitacao.id,
        descricaoItem: solicitacao.epi.descricao,
        prioridade: solicitacao.urgencia,
        status: solicitacao.status,
        validadeEPI: getValidadeEPI(solicitacao.epi.codigo),
    }));

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        if (!value) {
            setFilteredRows(rows);
            return;
        }
        setFilteredRows(
            rows.filter(
                (row) =>
                    row.descricaoItem.toLowerCase().includes(value.toLowerCase()) ||
                    row.id.toString().includes(value)
            )
        );
    };

    return(
        <S.MainStyled>
            {filteredRows.length > 0 || undefined ? (
                <>
                    <Paper sx={{ height: '100%', width: '100%', fontSize: 14, mt: 0 }}>
                        <S.DivBtnSearch>
                            <S.ButtonStyled onClick={() => openModal()}>+ Fazer Solicitação</S.ButtonStyled>
                            <Searchbar value={searchTerm} onSearch={handleSearch} />
                        </S.DivBtnSearch>
                        <DataGrid
                            rows={filteredRows}
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
                    <S.DivLayoutDash>
                        <ModuloNSoliciDash solicitacoes={solicitacoes} />
                        <ModuloNStatSoli solicitacoes={solicitacoes} />
                    </S.DivLayoutDash>
                </>
            ) : (
                <NoDataToShow mainText="Não foram adicionadas solicitações!" />
            )}
            <ReactModal isOpen={isOpen} onRequestClose={closeModal} style={S.stylesModal}>
                <S.MainWrapper>
                    <S.ImageContent onClick={closeModal}>
                        <S.Image src="../../src/assets/svg/Close.svg" />
                    </S.ImageContent>
                    <S.DivWrapper>
                        <InputDisable text={dataSolicitacao} title="Data de Abertura" type="text" />
                        <InputDisable text={dataConclusao} title="Data de Conclusão" type="text" />
                        <InputDisable text={status} title="Status" type="text" />
                        <InputDisable text={id} title="ID da Solicitação" type="text" />
                        <InputDisable text={solicitante} title="Solicitante" type="text" />
                        <InputDisable text={quantidade} title="Quantidade" type="number" />
                        <InputDisable text={descricaoItem} title="Item" type="text" />
                        <InputDisable text={codigoEPI} title="Código" type="text" />
                        <SelectInput disable={true} text={prioridade} title="Prioridade" />
                        <InputDisable text={getCAEPI(codigoEPI)} title="CA" type="text" />
                        <InputDisable text={getValidadeEPI(codigoEPI)} title="Validade do EPI" type="text" />
                    </S.DivWrapper>
                </S.MainWrapper>
            </ReactModal>
        </S.MainStyled>
    )
}