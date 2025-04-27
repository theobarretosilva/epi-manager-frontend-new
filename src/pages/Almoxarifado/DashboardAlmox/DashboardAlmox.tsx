import { Paper } from '@mui/material'
import { Searchbar } from '../../../components/Searchbar/Searchbar'
import * as S from './DashboardAlmox.styles'
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid'
import { OpenModalIcon } from '../../../components/OpenModalIcon/OpenModalIcon'
import { useState } from 'react'
import { NoDataToShow } from '../../../components/NoDataToShow/NoDataToShow'
import ReactModal from 'react-modal'
import { AprovarSolicitacao } from '../../../components/AprovarSolicitacao/AprovarSolicitacao'
import { ExcluirModal } from '../../../components/ModalExcluir/ExcluirModal'
import AdicionarColaborador from '../../../components/AdicionarColaborador/AdicionarColaborador'

interface SolicitacaoProps {
    id: string;
    descricaoItem: string;
    status: string;
    codigoEPI: string;
    prioridade: string;
}
  
interface EPIProps {
    descricaoItem: string;
    codigo: string;
    CA: string;
    validade: string;
}

interface RowProps {
    id: string;
    descricaoItem: string;
    status: string;
    prioridade: string;
    validade: string;
}

export const DashboardAlmox = () => {
    const solicitacoes = JSON.parse(sessionStorage.getItem('Solicitacoes') || '[]');
    const EPIsCadastrados = JSON.parse(sessionStorage.getItem('EPIsCadastrados') || '[]');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [id, setId] = useState('');

    const customStyles = {
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", 
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          padding: "25px",
          borderRadius: "10px",
          backgroundColor: "#FCFCFC",
        },
    };

    const openModal = (id: string) => {
        setModalIsOpen(true);
        setId(id);
    }

    const handleRowsUpdate = (solicitacaoAtualizada: SolicitacaoProps) => {
        const storedData = sessionStorage.getItem("Solicitacoes");
        const solicitacoesList: SolicitacaoProps[] = storedData ? JSON.parse(storedData) : [];
        
        const existingIndex = solicitacoesList.findIndex(solicitacao => solicitacao.id === solicitacaoAtualizada.id);
        
        if (existingIndex !== -1) {
            solicitacoesList[existingIndex] = solicitacaoAtualizada;
        } else {
            solicitacoesList.push(solicitacaoAtualizada);
        }
    
        sessionStorage.setItem("Solicitacoes", JSON.stringify(solicitacoesList));
        
        setRows(solicitacoesList.map((solicitacao: SolicitacaoProps) => ({
            id: solicitacao.id,
            descricaoItem: solicitacao.descricaoItem,
            prioridade: solicitacao.prioridade,
            status: solicitacao.status,
            validadeEPI: getValidadeEPI(solicitacao.codigoEPI),
        })));
    
    };

    const getValidadeEPI = (cod: string) => {
        const epi = EPIsCadastrados.find((epi: EPIProps) => epi.codigo === cod);
        return epi ? epi.validade : 'N/A';
    };

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 6 });
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
                    onClick={() =>  openModal(params.row.id)}
                />
            ],
            width: 80
        },
        { field: 'id', headerName: 'ID', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'descricaoItem', headerName: 'Descrição do Item', width: 300, align: 'center', headerAlign: 'center' },
        { field: 'prioridade', headerName: 'Prioridade', width: 130, align: 'center', headerAlign: 'center'},
        { field: 'status', headerName: 'Status', width: 130, align: 'center', headerAlign: 'center' },
        { field: 'validadeEPI', headerName: 'Validade EPI', width: 150, align: 'center', headerAlign: 'center' }
    ];

    const [rows, setRows] = useState(() => {
        return solicitacoes.map((solicitacao: SolicitacaoProps) => ({
            id: solicitacao.id,
            descricaoItem: solicitacao.descricaoItem,
            prioridade: solicitacao.prioridade,
            status: solicitacao.status,
            validadeEPI: getValidadeEPI(solicitacao.codigoEPI),
        }));
    })

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setFilteredRows(
            rows.filter(row => 
                row.descricaoItem.toLowerCase().includes(value.toLowerCase()) ||
                row.id.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    return(
        <>
            <S.MainStyled>
                {filteredRows.length > 0 ? (
                    <>
                        <Searchbar onSearch={handleSearch} />
                        <Paper sx={{ height: '100%', width: '100%', fontSize: 14, mt: 2 }}>
                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                paginationModel={paginationModel}
                                onPaginationModelChange={setPaginationModel}
                                pageSizeOptions={[6, 10]}
                                sx={{
                                    border: 0,
                                    '& .MuiDataGrid-cell': { textAlign: 'center' },
                                    '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5' },
                                }}
                            />
                        </Paper>
                    </>
                ) : (
                    <NoDataToShow mainText='Não foi feita nenhuma solicitação!' />
                )}
                
            </S.MainStyled>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
            >
                <S.ImageContent onClick={() => setModalIsOpen(false)}>
                    <S.Image src="../../src/assets/svg/Close.svg" />
                </S.ImageContent>
                <AprovarSolicitacao onEdit={handleRowsUpdate} setModalIsOpen={setModalIsOpen} id={id}/>
            </ReactModal>
        </>
    )
}