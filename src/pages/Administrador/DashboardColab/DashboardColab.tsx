import ReactModal from "react-modal";
import AdicionarColaborador from "../../../components/AdicionarColaborador/AdicionarColaborador";
import { useEffect, useMemo, useState } from "react";
import * as S from './DashboardColab.styles';
import { ToastContainer } from "react-toastify";
import { ExcluirModal } from "../../../components/ModalExcluir/ExcluirModal";
import { Searchbar } from "../../../components/Searchbar/Searchbar";
import { Paper } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { EditColabIcon } from "../../../components/EditColabIcon/EditColabIcon";
import { DeleteIcon } from "../../../components/DeleteIcon/DeleteIcon";
import { NoDataToShow } from "../../../components/NoDataToShow/NoDataToShow";
import { ModuloColabSetDash } from "../../../components/ModuloColabSetDash/ModuloColabSetDash";
import { ModuloIndicNume } from "../../../components/ModuloIndicNume/ModuloIndicNume";
import { DownloadSoliciIcon } from "../../../components/DownloadSoliciIcon/DownloadSoliciIcon";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ColaboradorProps {
    id: string;
    nome: string; 
    matricula: string;
    setor: string;
    cargo: string;
    email: string;
    hash: string;
    salt: string;
    dataCadastro: string;
    epis: { nome: string; validade: string }[];
}

export const DashboardColab = () => {
    const storedData = sessionStorage.getItem("ColaboradoresCadastrados");
    const mockData: ColaboradorProps[] = [
        {
            id: "1",
            nome: "João Silva",
            matricula: "001",
            setor: "Almoxarifado",
            cargo: "Auxiliar",
            email: "joao@email.com",
            hash: "abc",
            salt: "123",
            dataCadastro: new Date().toISOString(),
            epis: [
                { nome: "Capacete", validade: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString() } // vencido
            ]
        },
        {
            id: "2",
            nome: "Maria Souza",
            matricula: "002",
            setor: "Produção",
            cargo: "Operadora",
            email: "maria@email.com",
            hash: "def",
            salt: "456",
            dataCadastro: new Date().toISOString(),
            epis: [
                { nome: "Luvas", validade: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString() } // vence em 10 dias
            ]
        },
        {
            id: "3",
            nome: "Carlos Lima",
            matricula: "003",
            setor: "Manutenção",
            cargo: "Técnico",
            email: "carlos@email.com",
            hash: "ghi",
            salt: "789",
            dataCadastro: new Date().toISOString(),
            epis: [
                { nome: "Botina", validade: new Date(new Date().setDate(new Date().getDate() + 40)).toISOString() } // vence em 40 dias
            ]
        },
        {
            id: "4",
            nome: "Ana Paula",
            matricula: "004",
            setor: "RH",
            cargo: "Analista",
            email: "ana@email.com",
            hash: "jkl",
            salt: "012",
            dataCadastro: new Date().toISOString(),
            epis: [] // sem EPIs
        }
    ];
    const [modalIsOpenAddColaborador, setModalIsOpenAddColaborador] = useState(false);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
    const [idColaborador, setIdColaborador] = useState<string | null>(null);

    const closeModal = () => {
        setModalIsOpenAddColaborador(false);
        setIdColaborador('');
    }

    const openModal = () => {
        setModalIsOpenAddColaborador(true);
        setIdColaborador(null)
    }

    const openModalEdit = (id: string) => {
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
                    onClick={() => openModalEdit(params.row.id)}
                />,
            ],
            width: 100,
        },
        { field: 'matricula', headerName: 'Matricula', width: 100, align: 'center', headerAlign: 'center' },
        { field: 'nome', headerName: 'Nome', width: 350, align: 'center', headerAlign: 'center' },
        { field: 'cargo', headerName: 'Cargo', width: 210, align: 'center', headerAlign: 'center'},
        { field: 'setor', headerName: 'Setor', width: 210, align: 'center', headerAlign: 'center' },
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
            width: 100,
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

    const [filteredRows, setFilteredRows] = useState(rows);
    const handleSearch = (value: string) => {
        setFilteredRows(
            rows.filter(row => 
                row.matricula.toLowerCase().includes(value.toLowerCase()) ||
                row.nome.toLowerCase().includes(value.toLowerCase())
            )
        );
    };
    
    const hoje = new Date();

    const colaboradoresCadastradosNoMes = useMemo(() => {
        return mockData.filter(colab => {
            const data = new Date(colab.dataCadastro);
            return (
            data.getMonth() === hoje.getMonth() &&
            data.getFullYear() === hoje.getFullYear()
            );
        }).length;
    }, [colaboradores]);

    const colaboradoresComEPIsVencendo = useMemo(() => {
        return mockData.filter(colab =>
            colab.epis.some(epi => new Date(epi.validade) < hoje)
        ).length;
    }, [colaboradores]);

    const colaboradoresComEPIsVencendo30Dias = useMemo(() => {
        const daqui30Dias = new Date();
        daqui30Dias.setDate(hoje.getDate() + 30);

        return mockData.filter(colab =>
            colab.epis.some(epi => {
            const validade = new Date(epi.validade);
            return validade >= hoje && validade <= daqui30Dias;
            })
        ).length;
    }, [colaboradores]);

    const exportarColaboradoresPDF = () => {
        const doc = new jsPDF();

        doc.text("Lista de Colaboradores", 14, 15);

        autoTable(doc, {
            startY: 20,
            head: [["Matrícula", "Nome", "Cargo", "Setor"]],
            body: colaboradores.map(colab => [
                colab.matricula,
                colab.nome,
                colab.cargo,
                colab.setor
            ]),
        });

        doc.save("colaboradores.pdf");
    };
    
    return (
        <>
            <S.MainStyled>
                {filteredRows.length > 0 ? (
                    <Paper sx={{ height: '100%', width: '100%', fontSize: 14, mt: 0 }}>
                        <S.DivBtnSearch>
                            <S.ButtonStyled onClick={() => openModal()}>+ Adicionar Colaborador</S.ButtonStyled>
                            <Searchbar onSearch={handleSearch} placeholder="Pesquise pela matrícula ou nome" />
                            <S.DivDownload onClick={exportarColaboradoresPDF}>
                                <DownloadSoliciIcon />
                                <S.TextDownload>Baixar lista de colaboradores</S.TextDownload>
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
                ) : (
                    <NoDataToShow mainText="Não foram adicionados colaboradores!" />
                )}

                <S.DivLayoutDash>
                    <ModuloColabSetDash />
                    <ModuloIndicNume 
                        total={colaboradores.length}
                        vencendo={colaboradoresComEPIsVencendo}
                        cadastradosMes={colaboradoresCadastradosNoMes}
                        vencendo30dias={colaboradoresComEPIsVencendo30Dias}
                    />
                </S.DivLayoutDash>

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
                    <AdicionarColaborador setIdColab={setIdColaborador} modalIsOpen={modalIsOpenAddColaborador} idColab={idColaborador} onAdd={handleAddColaborador} setModalIsOpen={setModalIsOpenAddColaborador} />
                </S.MainWrapper>
            </ReactModal>
        </>
    );
};
