import { useMemo, useState } from "react";
import ReactModal from "react-modal"
import { ExcluirModal } from "../../../components/ModalExcluir/ExcluirModal";
import * as S from "./DashboardEPI.styles"
import { ToastContainer } from "react-toastify";
import AdicionarEpi from "../../../components/AdicionarEPI/AdicionarEPI";
import { Searchbar } from "../../../components/Searchbar/Searchbar";
import { Box, Modal, Paper } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";
import { EditColabIcon } from "../../../components/EditColabIcon/EditColabIcon";
import { DeleteIcon } from "../../../components/DeleteIcon/DeleteIcon";
import { NoDataToShow } from "../../../components/NoDataToShow/NoDataToShow";
import { ModuloEPIVencProx } from "../../../components/ModuloEPIVencProx/ModuloEPIVencProx";
import { ModuloEPIEstoBaix } from "../../../components/ModuloEPIEstoBaix/ModuloEPIEstoBaix";
import { DownloadSoliciIcon } from "../../../components/DownloadSoliciIcon/DownloadSoliciIcon";
import jsPDF from "jspdf";
import { EPIProps } from "../../../props/episProps";
import { useGetEPIS } from "../../../hooks/useGetEPIS";
import { EditarEPIModal } from "../../../components/EditarEPIModal/EditarEPIModal";

ReactModal.setAppElement('#root');

export const DashboardEPI = () => {
    const { epis } = useGetEPIS();
    const [modalIsOpenAddEpi, setModalIsOpenAddEpi] = useState(false);
    const [modalIsOpenEditarEpi, setModalIsOpenEditarEpi] = useState(false);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
    const [idEpi, setIdEpi] = useState<number | null>(null);

    const rows = useMemo(() => 
        epis?.filter((epi) => epi.status_uso.toLowerCase() === "ativo")
        .map((epi: EPIProps) => ({
            foto: epi.foto,
            id: epi.id,
            codigo: epi.codigo,
            descricao: epi.descricao,
            preco: epi.preco,
            qtd: epi.qtd,
            ca: epi.ca,
            data_validade: new Date(epi.data_validade).toLocaleDateString('pt-BR')
        })) ?? [], [epis]
    );

    const closeModalAdd = () => {
        setModalIsOpenAddEpi(false);
        setIdEpi(0);
    }
    const closeModalEdit = () => {
        setModalIsOpenEditarEpi(false);
        setIdEpi(0);
    }
    const openModalAdd = () => {
        setModalIsOpenAddEpi(true);
        setIdEpi(0);
    }
    const openModalEdit = (id: number) => {
        setModalIsOpenEditarEpi(true);
        setIdEpi(id);
    }
    const openModalDelete = (id: number) => {
        setModalIsOpenDelete(true);
        setIdEpi(id);
    }

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

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageClick = (link: string) => {
        setSelectedImage(link);
    };

    const handleClose = () => {
        setSelectedImage(null);
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
                    onClick={() => openModalEdit(params.row.id)}
                />,
            ],
            width: 70,
        },
        {
            field: 'foto',
            headerName: 'Foto',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams) => (
                <S.FotoEPI 
                    onClick={() => handleImageClick(params.row.foto)}
                    src={params.row.foto}
                    alt="EPI"
                />
            )
        },
        { field: 'id', headerName: 'ID', width: 80, align: 'center', headerAlign: 'center'},
        { field: 'codigo', headerName: 'Código', width: 80, align: 'center', headerAlign: 'center'},
        { field: 'descricao', headerName: 'Descrição do Item', width: 280, align: 'center', headerAlign: 'center' },
        { field: 'preco', headerName: 'Preço', width: 100, align: 'center', headerAlign: 'center' },
        { field: 'qtd', headerName: 'Quantidade', width: 100, align: 'center', headerAlign: 'center' },
        { field: 'ca', headerName: 'CA', width: 100, align: 'center', headerAlign: 'center' },
        { field: 'data_validade', headerName: 'Validade', width: 100, align: 'center', headerAlign: 'center'},
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
        if (!searchValue) return rows ?? [];
        return (rows ?? []).filter(row =>

            row.id?.toString().includes(searchValue.toLowerCase()) ||
            row.descricao?.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [rows, searchValue]);

    const generateAllEPIsPDF = () => {
        const doc = new jsPDF();
        let y = 10;

        doc.setFontSize(18);
        doc.text('Lista de EPIs Cadastrados', 10, y);
        y += 10;

        if (!epis || epis.length === 0) {
            doc.setFontSize(12);
            doc.text('Nenhum EPI cadastrado encontrado.', 10, y);
        } else {
            doc.setFontSize(12);
            epis.forEach((epi: EPIProps, index: number) => {
                if (y > 270) {
                    doc.addPage();
                    y = 10;
                }

                doc.text(`EPI #${index + 1}`, 10, y);
                y += 6;
                doc.text(`Descrição: ${epi.descricao ?? '---'}`, 10, y);
                y += 6;
                doc.text(`Código: ${epi.codigo}`, 10, y);
                y += 6;
                doc.text(`Preço: R$ ${epi.preco ?? '---'}`, 10, y);
                y += 6;
                doc.text(`Quantidade: ${epi.qtd ?? '---'}`, 10, y);
                y += 6;
                doc.text(`CA: ${epi.ca ?? '---'}`, 10, y);
                y += 6;
                doc.text(`Validade: ${new Date(epi.data_validade).toLocaleDateString('pt-BR')}`, 10, y);
                y += 10;
            });
        }

        doc.save('EPIsCadastrados.pdf');
    };

    return(
        <>
            <S.MainStyled>
                {filteredRows?.length > 0 ? (
                    <>
                        <Paper sx={{ height: '100%', width: '100%', fontSize: 14, mt: 0 }}>
                            <S.DivBtnSearch>
                                <S.ButtonStyled onClick={() => openModalAdd()} >+ Adicionar EPI</S.ButtonStyled>
                                <Searchbar placeholder="Pesquise pela descrição ou código" onSearch={handleSearch}  value={searchValue}/>
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
                        <S.ButtonStyled onClick={() => openModalAdd()} >+ Adicionar EPI</S.ButtonStyled>
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
                    <ExcluirModal
                        setModalIsOpen={setModalIsOpenDelete}
                        id={ idEpi as number}
                        tipo="epi"
                    /> 
                </S.MainWrapper>
            </ReactModal>

            <ReactModal
                isOpen={modalIsOpenAddEpi}
                onRequestClose={closeModalAdd}
                style={customStyles}
            >
                <S.MainWrapper>
                    <S.ImageContent onClick={closeModalAdd}>
                        <S.Image  src="../../src/assets/svg/Close.svg" />
                    </S.ImageContent>
                    <AdicionarEpi
                        modalIsOpen={modalIsOpenAddEpi}
                        idEpi={idEpi as number}
                        setModalIsOpen={setModalIsOpenAddEpi}
                        setIdEpi={setIdEpi}
                    />
                </S.MainWrapper>
            </ReactModal>

            <ReactModal
                isOpen={modalIsOpenEditarEpi}
                onRequestClose={closeModalEdit}
                style={customStyles}
            >
                <S.MainWrapper>
                    <S.ImageContent onClick={closeModalEdit}>
                        <S.Image src="../../src/assets/svg/Close.svg" />
                    </S.ImageContent>
                    <EditarEPIModal 
                        modalIsOpen={modalIsOpenEditarEpi}
                        idEpi={idEpi}
                        setIdEpi={setIdEpi}
                        setModalIsOpen={setModalIsOpenEditarEpi}
                    />
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