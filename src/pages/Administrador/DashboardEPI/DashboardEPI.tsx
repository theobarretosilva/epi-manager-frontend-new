import { useEffect, useState } from "react";
import ReactModal from "react-modal"
import { ExcluirModal } from "../../../components/ModalExcluir/ExcluirModal";
import * as S from "./DashboardEPI.styles"
import { ToastContainer } from "react-toastify";
import AdicionarEpi from "../../../components/AdicionarEpi/AdicionarEPI";
import { Searchbar } from "../../../components/Searchbar/Searchbar";
import { Paper } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { EditColabIcon } from "../../../components/EditColabIcon/EditColabIcon";
import { DeleteIcon } from "../../../components/DeleteIcon/DeleteIcon";
import { NoDataToShow } from "../../../components/NoDataToShow/NoDataToShow";
import { ModuloEPIVencProx } from "../../../components/ModuloEPIVencProx/ModuloEPIVencProx";
import { ModuloEPIEstoBaix } from "../../../components/ModuloEPIEstoBaix/ModuloEPIEstoBaix";
import { EPIProps } from "./DashboardEPI.types";

ReactModal.setAppElement('#root');

export const DashboardEPI = () => {
    const EPIList = JSON.parse(sessionStorage.getItem('EPIsCadastrados') || '[]');
    const [modalIsOpenAddEpi, setModalIsOpenAddEpi] = useState(false);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
    const [idEpi, setIdEpi] = useState('0');
    
    const [epis, setEpis] = useState(() => {
        const storedData = sessionStorage.getItem("EPIsCadastrados");
        return storedData ? JSON.parse(storedData) : [];
    });

    const [rows, setRows] = useState(() => {
        return EPIList.map((epi: EPIProps) => ({
            id: epi.codigo,
            codigo: epi.codigo,
            descricaoItem: epi.descricaoItem,
            certificadoAprovacao: epi.certificadoAprovacao,
            validade: epi.validade,
            estoque: epi.estoque,
            estoqueMinimo: epi.estoqueMinimo
        }));
    })

    const openModal = (id: string) => {
        setModalIsOpenAddEpi(true);
        setIdEpi(id);
    }
    const closeModal = () => {
        setModalIsOpenAddEpi(false);
        setIdEpi("");
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

    const columns: GridColDef[] = [
        {
            field: 'editar',
            type: 'actions',
            headerName: 'Editar',
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key={`editar-${params.row.id}`}
                    icon={<EditColabIcon />}
                    label="Editar"
                    onClick={() => openModal(params.row.id)}
                />,
            ],
            width: 80,
        },
        { field: 'id', headerName: 'Código', width: 90, align: 'center', headerAlign: 'center'},
        { field: 'descricaoItem', headerName: 'Descrição do Item', width: 270, align: 'center', headerAlign: 'center' },
        { field: 'certificadoAprovacao', headerName: 'Certificado de Aprovação', width: 190, align: 'center', headerAlign: 'center' },
        { field: 'validade', headerName: 'Validade', width: 120, align: 'center', headerAlign: 'center'},
        { field: 'estoque', headerName: 'Estoque', width: 120, align: 'center', headerAlign: 'center'},
        { field: 'estoqueMinimo', headerName: 'Estoque Mínimo', width: 130, align: 'center', headerAlign: 'center'},
        { 
            field: 'deletar',
            type: 'actions',
            headerName: 'Deletar', 
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key={`deletar-${params.row.id}`}
                    icon={<DeleteIcon />}
                    label="Deletar"
                    onClick={()=> openModalDelete(params.row.id)}
                />,
            ],
            width: 80,
            align: 'center',
            headerAlign: 'center'
        }
    ];

    const [filteredRows, setFilteredRows] = useState(rows);
    const handleSearch = (value: string) => {
        setFilteredRows(
            rows.filter(
                (row) =>
                    row.id.toLowerCase().includes(value.toLowerCase()) ||
                    row.descricaoItem.toLowerCase().includes(value.toLowerCase())
            )
        );
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
            validade: epi.validade,
            estoque: epi.estoque,
            estoqueMinimo: epi.estoqueMinimo,
        })));
    };

    return(
        <>
            <S.MainStyled>
                {filteredRows.length > 0 ? (
                    <>
                        <Paper sx={{ height: '100%', width: '100%', fontSize: 14, mt: 2 }}>
                            <S.DivBtnSearch>
                                <S.ButtonStyled onClick={() => setModalIsOpenAddEpi(true)} >+ Adicionar EPI</S.ButtonStyled>
                                <Searchbar placeholder="Pesquise pela descrição ou código" onSearch={handleSearch} />
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
                            <ModuloEPIVencProx />
                            <ModuloEPIEstoBaix />
                        </S.DivLayoutDash>
                    </>
                    
                ) : (
                    <>
                        <S.ButtonStyled onClick={() => setModalIsOpenAddEpi(true)} >+ Adicionar EPI</S.ButtonStyled>
                        <NoDataToShow mainText="Não foram adicionados EPI's!" />
                    </>
                )}
            </S.MainStyled>
            <ToastContainer position="top-right" />
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
        </>
    )
}