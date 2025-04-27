import ReactModal from "react-modal";
import AdicionarColaborador from "../../../components/AdicionarColaborador/AdicionarColaborador";
import { useEffect, useState } from "react";
import * as S from './DashboardColab.styles';
import { ToastContainer } from "react-toastify";
import { ExcluirModal } from "../../../components/ModalExcluir/ExcluirModal";
import { Searchbar } from "../../../components/Searchbar/Searchbar";
import { Paper } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { EditColabIcon } from "../../../components/EditColabIcon/EditColabIcon";
import { DeleteIcon } from "../../../components/DeleteIcon/DeleteIcon";
import { NoDataToShow } from "../../../components/NoDataToShow/NoDataToShow";

interface ColaboradorProps {
    id: string;
    nome: string; 
    matricula: string;
    setor: string;
    cargo: string;
    email: string;
    hash: string;
    salt: string;
}

export const DashboardColab = () => {
    const [modalIsOpenAddColaborador, setModalIsOpenAddColaborador] = useState(false);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
    const [idColaborador, setIdColaborador] = useState('0');

    const closeModal = () => {
        setModalIsOpenAddColaborador(false);
        setIdColaborador('');
    }

    const openModal = (id: string) => {
        setModalIsOpenAddColaborador(true);
        setIdColaborador(id);
    }

    const openModalDelete = (id: string) => {
        setModalIsOpenDelete(true);
        setIdColaborador(id);
    }

    const handleDeleteColaborador = (id: string) => {
        const updatedColaboradores = colaboradores.filter((colaborador: ColaboradorProps) => colaborador.id !== id);
        sessionStorage.setItem("ColaboradoresCadastrados", JSON.stringify(updatedColaboradores));
        
        setColaboradores(updatedColaboradores);

        setRows(updatedColaboradores.map((colaborador: ColaboradorProps) => ({
            id: colaborador.id,
            matricula: colaborador.matricula,
            nome: colaborador.nome,
            cargo: colaborador.cargo,
            setor: colaborador.setor,
        })));
    };

    const handleAddColaborador = (colaborador: ColaboradorProps) => {
        const storedData = sessionStorage.getItem("ColaboradoresCadastrados");
        const colaboradoresList: ColaboradorProps[] = storedData ? JSON.parse(storedData) : [];
    
        const existingIndex = colaboradoresList.findIndex(c => c.id === colaborador.id);
    
        if (existingIndex !== -1) {
            colaboradoresList[existingIndex] = colaborador;
        } else {
            colaboradoresList.push(colaborador);
        }
    
        setColaboradores(colaboradoresList);
        sessionStorage.setItem("ColaboradoresCadastrados", JSON.stringify(colaboradoresList));
    
        setRows(colaboradoresList.map(c => ({
            id: c.id,
            matricula: c.matricula,
            nome: c.nome,
            cargo: c.cargo,
            setor: c.setor,
        })));
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
                    key={0}
                    icon={<EditColabIcon />}
                    label="Editar"
                    onClick={() => openModal(params.row.id)}
                />,
            ],
            width: 80,
        },
        { field: 'id', headerName: 'Matricula', width: 100, align: 'center', headerAlign: 'center' },
        { field: 'nome', headerName: 'Nome', width: 350, align: 'center', headerAlign: 'center' },
        { field: 'cargo', headerName: 'Cargo', width: 200, align: 'center', headerAlign: 'center'},
        { field: 'setor', headerName: 'Setor', width: 200, align: 'center', headerAlign: 'center' },
        { 
            field: 'deletar',
            type: 'actions',
            headerName: 'Deletar', 
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key={0}
                    icon={<DeleteIcon />}
                    label="Deletar"
                    onClick={() => openModalDelete(params.row.id)}
                />,
            ],
            width: 80,
            align: 'center',
            headerAlign: 'center'
        }
    ];

    const [colaboradores, setColaboradores] = useState(() => {
        const storedData = sessionStorage.getItem("ColaboradoresCadastrados");
        return storedData ? JSON.parse(storedData) : [];
    });

    const [rows, setRows] = useState(() => {
        return colaboradores.map((colaborador: ColaboradorProps) => ({
            id: colaborador.id,
            matricula: colaborador.matricula,
            nome: colaborador.nome,
            cargo: colaborador.cargo,
            setor: colaborador.setor,
        }));
    });

    useEffect(() => {
        setFilteredRows(rows);
    }, [rows, colaboradores]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setFilteredRows(
            rows.filter(row => 
                row.matricula.toLowerCase().includes(value.toLowerCase()) ||
                row.nome.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    return (
        <>
            <S.MainStyled>
                {filteredRows.length > 0 ? (
                    <Searchbar onSearch={handleSearch} placeholder="Pesquise pela matrícula ou nome" />
                ) : ("")}
                <S.ButtonStyled onClick={() => setModalIsOpenAddColaborador(true)}>+ Adicionar Colaborador</S.ButtonStyled>
                {filteredRows.length > 0 ? (
                    <Paper sx={{ height: '100%', width: '100%', fontSize: 14, mt: 2 }}>
                        <DataGrid
                            rows={filteredRows}
                            columns={columns}
                            pageSizeOptions={[5, 10]}
                            sx={{
                                border: 0,
                                '& .MuiDataGrid-cell': { textAlign: 'center' },
                                '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5' },
                            }}
                        />
                    </Paper>
                ) : (
                    <NoDataToShow mainText="Não foram adicionados colaboradores!" />
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
                        <S.Image src="../../src/assets/svg/Close.svg" />
                    </S.ImageContent>
                    <ExcluirModal onDelete={handleDeleteColaborador} setModalIsOpen={setModalIsOpenDelete} Id={idColaborador} tipo="colaborador" />
                </S.MainWrapper>
            </ReactModal>
            <ReactModal
                isOpen={modalIsOpenAddColaborador}
                onRequestClose={() => setModalIsOpenAddColaborador(false)}
                style={customStyles}
            >
                <S.MainWrapper>
                    <S.ImageContent onClick={() => closeModal()}>
                        <S.Image src="../../src/assets/svg/Close.svg" />
                    </S.ImageContent>
                    <AdicionarColaborador modalIsOpen={modalIsOpenAddColaborador} idColab={idColaborador} onAdd={handleAddColaborador} setModalIsOpen={setModalIsOpenAddColaborador} />
                </S.MainWrapper>
            </ReactModal>
        </>
    );
};
