import { useMemo, useState } from "react";
import ReactModal from "react-modal"
import { ExcluirModal } from "../../../components/ModalExcluir/ExcluirModal";
import * as S from "./DashboardEPI.styles"
import { ToastContainer } from "react-toastify";
import AdicionarEpi from "../../../components/AdicionarEpi/AdicionarEPI";
import { Searchbar } from "../../../components/Searchbar/Searchbar";
import { Box, Modal, Paper } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { EditColabIcon } from "../../../components/EditColabIcon/EditColabIcon";
import { DeleteIcon } from "../../../components/DeleteIcon/DeleteIcon";
import { NoDataToShow } from "../../../components/NoDataToShow/NoDataToShow";
import { ModuloEPIVencProx } from "../../../components/ModuloEPIVencProx/ModuloEPIVencProx";
import { ModuloEPIEstoBaix } from "../../../components/ModuloEPIEstoBaix/ModuloEPIEstoBaix";
import { EPIProps } from "./DashboardEPI.types";
import { DownloadSoliciIcon } from "../../../components/DownloadSoliciIcon/DownloadSoliciIcon";
import jsPDF from "jspdf";

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

    const rows = useMemo(() => {
        return epis.map((epi: EPIProps) => ({
            id: epi.codigo,
            codigo: epi.codigo,
            descricaoItem: epi.descricaoItem,
            certificadoAprovacao: epi.certificadoAprovacao,
            validade: epi.validade,
            estoque: epi.estoque,
            estoqueMinimo: epi.estoqueMinimo,
            linkFoto: epi.linkFoto,
        }));
    }, [epis]);

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
        const updated = epis.filter(epi => epi.codigo !== id);
        setEpis(updated);
        sessionStorage.setItem('EPIsCadastrados', JSON.stringify(updated));
    };

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageClick = (link: string) => {
        setSelectedImage(link);
    };

    const handleClose = () => {
        setSelectedImage(null);
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
            width: 60,
        },
        { field: 'id', headerName: 'Código', width: 70, align: 'center', headerAlign: 'center'},
        {
            field: 'foto',
            headerName: 'Foto',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRowParams) => (
                <S.FotoEPI 
                    onClick={() => handleImageClick(params.row.linkFoto)}
                    src={params.row.linkFoto}
                    alt="EPI"
                />
            )
        },
        { field: 'descricaoItem', headerName: 'Descrição do Item', width: 250, align: 'center', headerAlign: 'center' },
        { field: 'certificadoAprovacao', headerName: 'Certificado de Aprovação', width: 190, align: 'center', headerAlign: 'center' },
        { field: 'validade', headerName: 'Validade', width: 110, align: 'center', headerAlign: 'center'},
        { field: 'estoque', headerName: 'Estoque', width: 110, align: 'center', headerAlign: 'center'},
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
            width: 70,
            align: 'center',
            headerAlign: 'center'
        }
    ];

    const [searchValue, setSearchValue] = useState("");
    const handleSearch = (value: string) => {
        setSearchValue(value);
    };
    const filteredRows = useMemo(() => {
        if (!searchValue) return rows;
        return rows.filter(row =>
            row.id.toLowerCase().includes(searchValue.toLowerCase()) ||
            row.descricaoItem.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [rows, searchValue]);

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

    const generateAllEPIsPDF = () => {
        const doc = new jsPDF();
        let y = 10;

        doc.setFontSize(18);
        doc.text('Lista de EPIs Cadastrados', 10, y);
        y += 10;

        if (EPIList.length === 0) {
            doc.setFontSize(12);
            doc.text('Nenhum EPI cadastrado encontrado.', 10, y);
        } else {
            doc.setFontSize(12);
            EPIList.forEach((epi: EPIProps, index: number) => {
                if (y > 270) {
                    doc.addPage();
                    y = 10;
                }
                doc.text(`EPI #${index + 1}`, 10, y);
                y += 7;
                doc.text(`Descrição: ${epi.descricaoItem}`, 10, y);
                y += 7;
                doc.text(`Código: ${epi.codigo}`, 10, y);
                y += 7;
                doc.text(`Validade: ${epi.validade}`, 10, y);
                y += 7;
                doc.text(`CA: ${epi.certificadoAprovacao}`, 10, y);
                y += 10;
            });
        }

        doc.save('EPIsCadastrados.pdf');
    };

    return(
        <>
            <S.MainStyled>
                {filteredRows.length > 0 ? (
                    <>
                        <Paper sx={{ height: '100%', width: '100%', fontSize: 14, mt: 0 }}>
                            <S.DivBtnSearch>
                                <S.ButtonStyled onClick={() => setModalIsOpenAddEpi(true)} >+ Adicionar EPI</S.ButtonStyled>
                                <Searchbar placeholder="Pesquise pela descrição ou código" onSearch={handleSearch} />
                                <S.DivDownload onClick={generateAllEPIsPDF}>
                                    <DownloadSoliciIcon />
                                    <S.TextDownload>Baixar lista de EPI's</S.TextDownload>
                                </S.DivDownload>
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
                    <div style={{justifyContent: 'flex-start', width: '100%'}}>
                        <S.ButtonStyled onClick={() => setModalIsOpenAddEpi(true)} >+ Adicionar EPI</S.ButtonStyled>
                        <NoDataToShow mainText="Não foram adicionados EPI's!" />
                    </div>
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

            <Modal open={!!selectedImage} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 2,
                        borderRadius: 2,
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}
                >
                    <img src={selectedImage!} alt="EPI Ampliado" style={{ width: '100%', height: 'auto' }} />
                </Box>
            </Modal>
        </>
    )
}