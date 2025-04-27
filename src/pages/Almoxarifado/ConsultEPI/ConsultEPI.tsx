import { Paper } from '@mui/material'
import { Searchbar } from '../../../components/Searchbar/Searchbar'
import * as S from './ConsultEPI.styles'
import { DataGrid, GridActionsCellItem, GridColDef, GridDeleteIcon, GridRowParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { NoDataToShow } from '../../../components/NoDataToShow/NoDataToShow'
import ReactModal from 'react-modal'
import AdicionarEpi from '../../../components/AdicionarEpi/AdicionarEPI'
import { EditColabIcon } from '../../../components/EditColabIcon/EditColabIcon'
import { ExcluirModal } from '../../../components/ModalExcluir/ExcluirModal'

interface EPIProps {
    descricaoItem: string;
    codigo: string;
    certificadoAprovacao: string;
    validade: string;
}

export const ConsultEPI = () => {
    const EPIList = JSON.parse(sessionStorage.getItem('EPIsCadastrados') || '[]');
    const [modalIsOpenAddEpi, setModalIsOpenAddEpi] = useState(false);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
    const [idEpi, setIdEpi] = useState('0');
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 6 });

    const [epis, setEpis] = useState(() => {
        const storedData = sessionStorage.getItem("EPIsCadastrados");
        return storedData ? JSON.parse(storedData) : [];
    });

    const columns: GridColDef[] = [
        {
            field: 'editar',
            type: 'actions',
            headerName: 'Editar',
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key={0}
                    icon={<EditColabIcon />}
                    label="Editar"
                    onClick={() => openModal(params.row.id)}
                />,
            ],
            width: 80,
        },
        { field: 'id', headerName: 'Código', width: 100, align: 'center', headerAlign: 'center'},
        { field: 'descricaoItem', headerName: 'Descrição do Item', width: 350, align: 'center', headerAlign: 'center' },
        { field: 'certificadoAprovacao', headerName: 'Certificado de Aprovação', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'validade', headerName: 'Validade', width: 200, align: 'center', headerAlign: 'center'},
        { 
            field: 'deletar',
            type: 'actions',
            headerName: 'Deletar', 
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key={0}
                    icon={<GridDeleteIcon />}
                    label="Deletar"
                    onClick={()=> openModalDelete(params.row.id)}
                />,
            ],
            width: 80,
            align: 'center',
            headerAlign: 'center'
        }
    ];

    const [rows, setRows] = useState(() => {
        return EPIList.map((epi: EPIProps) => ({
            id: epi.codigo,
            codigo: epi.codigo,
            descricaoItem: epi.descricaoItem,
            certificadoAprovacao: epi.certificadoAprovacao,
            validade: epi.validade
        }));
    })

    const openModal = (id: string) => {
        setModalIsOpenAddEpi(true);
        setIdEpi(id);
    }
    const closeModal = () => {
        setModalIsOpenAddEpi(false);
        setIdEpi("")
    }

    const openModalDelete = (id: string) => {
        setModalIsOpenDelete(true);
        setIdEpi(id);
    }
    const handleDeleteEPI = (id: string) => {
        setRows(rows.filter(row => row.id !== id));
    };

    useEffect(() => {
        setFilteredRows(rows);
        sessionStorage.setItem('EPIsCadastrados', JSON.stringify(rows));
    }, [rows]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setFilteredRows(
            rows.filter(
                (row) =>
                    row.codigo.toLowerCase().includes(value.toLowerCase()) ||
                    row.descricaoItem.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

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

    const handleAddEPI = (epi: EPIProps) => {
        const storedData = sessionStorage.getItem("EPIsCadastrados");
        const episList: EPIProps[] = storedData ? JSON.parse(storedData) : [];
        
        const existingIndex = episList.findIndex(e => e.codigo === epi.codigo);
        
        if (existingIndex !== -1) {
            episList[existingIndex] = epi;
        } else {
            episList.push(epi);
        }
        
        setEpis(episList);
        sessionStorage.setItem("EPIsCadastrados", JSON.stringify(episList));
    
        setRows(episList.map((epi: EPIProps) => ({
            id: epi.codigo,
            codigo: epi.codigo,
            descricaoItem: epi.descricaoItem,
            certificadoAprovacao: epi.certificadoAprovacao,
            validade: epi.validade
        })));
    };

    return(
        <S.MainStyled>
            {filteredRows.length > 0 ? (
                <Searchbar placeholder='Pesquise pelo código ou nome' onSearch={handleSearch} />
            ) : ('')}
            <S.ButtonStyled onClick={() => setModalIsOpenAddEpi(true)}>+ Adicionar EPI</S.ButtonStyled>
            {filteredRows.length > 0 ? (                    
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
                            '& .MuiDataGrid-root': { fontSize: '0.875rem' }
                        }}
                    />
                </Paper>
            ) : (
                <NoDataToShow mainText="Não foram adicionados EPI's!"  />
            )}
            <ReactModal
                isOpen={modalIsOpenDelete}
                onRequestClose={() => setModalIsOpenDelete(false)}
                style={customStyles}
            >
                <S.MainWrapper>
                    <S.ImageContent onClick={() => setModalIsOpenDelete(false)}>
                        <S.Image  src="../../src/assets/svg/Close.svg" />
                    </S.ImageContent>
                    <ExcluirModal onDelete={handleDeleteEPI} setModalIsOpen={setModalIsOpenDelete} Id={ idEpi } tipo="epi" /> 
                </S.MainWrapper>
            </ReactModal>
            <ReactModal
                isOpen={modalIsOpenAddEpi}
                onRequestClose={() => setModalIsOpenAddEpi(false)}
                style={customStyles}
            >
                <S.MainWrapper>
                    <S.ImageContent onClick={() => closeModal()}>
                        <S.Image  src="../../src/assets/svg/Close.svg" />
                    </S.ImageContent>
                    <AdicionarEpi modalIsOpen={modalIsOpenAddEpi} idEpi={idEpi} onAdd={handleAddEPI} setModalIsOpen={setModalIsOpenAddEpi} />
                </S.MainWrapper>
            </ReactModal>
        </S.MainStyled>
    )
}