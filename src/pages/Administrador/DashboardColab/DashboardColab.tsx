import ReactModal from "react-modal";
import AdicionarColaborador from "../../../components/AdicionarColaborador/AdicionarColaborador";
import { useState } from "react";
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
import { useGetColaboradores } from "../../../hooks/useGetColaboradores";
import { SolicitacaoProps } from "../../../props/solicitacao.props";

export const DashboardColab = () => {
    const { colaboradores } = useGetColaboradores();
    console.log(colaboradores);
    const [modalIsOpenAddColaborador, setModalIsOpenAddColaborador] = useState(false);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
    const [idColaborador, setIdColaborador] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleDownloadSolicitacoes = (
        matricula: string,
        solicitacoes: SolicitacaoProps[]
    ) => {
        const solicitacoesFiltradas = solicitacoes?.filter(
            (sol) => sol.solicitante.matricula === matricula
        );

        if (!solicitacoesFiltradas || solicitacoesFiltradas.length === 0) {
            console.error("Nenhuma solicitação encontrada para este colaborador.");
            return;
        }

        const colaborador = solicitacoesFiltradas[0].solicitante;

        const doc = new jsPDF();
        doc.text(`Solicitações de ${colaborador.nome}`, 14, 15);

        autoTable(doc, {
            startY: 20,
            head: [["Código", "Qtd", "Data Abertura", "Status", "Urgência", "EPI"]],
            body: solicitacoesFiltradas.map((sol) => [
                sol.codigo,
                sol.qtd,
                new Date(sol.dataAbertura).toLocaleDateString(),
                sol.status,
                sol.urgencia,
                sol.epi.descricao,
            ]),
        });

        doc.save(`solicitacoes_${colaborador.nome}.pdf`);
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
            width: 60,
        },
        { field: 'matricula', headerName: 'Matricula', width: 80, align: 'center', headerAlign: 'center' },
        { field: 'nome', headerName: 'Nome', width: 230, align: 'center', headerAlign: 'center' },
        { field: 'cpf', headerName: 'CPF', width: 130, align: 'center', headerAlign: 'center'},
        { field: 'cargo', headerName: 'Cargo', width: 130, align: 'center', headerAlign: 'center'},
        { field: 'setor', headerName: 'Setor', width: 130, align: 'center', headerAlign: 'center' },
        { field: 'permissao', headerName: 'Permissão', width: 125, align: 'center', headerAlign: 'center' },
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
            width: 70,
            align: 'center',
            headerAlign: 'center'
        },
        { 
            field: 'downloadSolicitacoes',
            type: 'actions',
            headerName: 'Baixar solicitações', 
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key={0}
                    icon={<DownloadSoliciIcon />}
                    label="Baixar"
                    onClick={() => handleDownloadSolicitacoes(params.row.matricula)}
                />,
            ],
            width: 140,
            align: 'center',
            headerAlign: 'center'
        },
    ];

    const rows = colaboradores?.map((colaborador) => ({
        matricula: colaborador.matricula,
        nome: colaborador.nome,
        email: colaborador.email,
        cpf: colaborador.cpf,
        cargo: colaborador.cargo,
        setor: colaborador.setor,
        permissao: colaborador.permissao.toLowerCase()
    }));

    const filteredRows = searchTerm
        ? rows?.filter((row) =>
            row.nome.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : rows;

    const exportColabsPDF = () => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });

        doc.text("Lista Completa de Colaboradores", 14, 15);

        autoTable(doc, {
            startY: 20,
            head: [[
                "Matrícula", 
                "Nome", 
                "CPF", 
                "Email", 
                "Cargo", 
                "Setor", 
                "Permissão", 
                "Liderança", 
                "Nome da Liderança", 
            ]],
            body: colaboradores?.map((colab) => [
                colab.matricula,
                colab.nome,
                colab.cpf,
                colab.email,
                colab.cargo,
                colab.setor,
                colab.permissao,
                colab.lideranca ? "Sim" : "Não",
                colab.nome_lideranca || "",
            ]),
            styles: {
                fontSize: 8,
            },
            headStyles: {
                fillColor: [22, 160, 133],
                textColor: 255,
            },
        });

        doc.save("colaboradores.pdf");
    };
    
    return (
        <>
            <S.MainStyled>
                {(filteredRows || []).length > 0 ? (
                    <>
                        <Paper sx={{ height: '100%', width: '100%', fontSize: 14, mt: 0 }}>
                            <S.DivBtnSearch>
                                <S.ButtonStyled onClick={() => openModal()}>+ Adicionar Colaborador</S.ButtonStyled>
                                <Searchbar onSearch={setSearchTerm} placeholder="Pesquise pela matrícula ou nome" value={searchTerm} />
                                <S.DivDownload onClick={exportColabsPDF}>
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
                                getRowId={(row) => row.matricula}
                            />
                        </Paper>
                        <S.DivLayoutDash>
                            <ModuloColabSetDash />
                            <ModuloIndicNume />
                        </S.DivLayoutDash>
                    </>
                ) : (
                    <>
                        <S.ButtonStyled onClick={() => openModal()}>+ Adicionar Colaborador</S.ButtonStyled>
                        <NoDataToShow mainText="Não foram adicionados colaboradores!" />
                    </>
                )}
            </S.MainStyled>
            <ToastContainer position="top-right" />
            <ReactModal
                isOpen={modalIsOpenDelete}
                onRequestClose={() => setModalIsOpenDelete(false)}
                style={S.modalStyle}
            >
                <S.MainWrapper>
                    <S.ImageContent onClick={() => setModalIsOpenDelete(false)}>
                        <S.Image src="../../src/assets/svg/Close.svg" />
                    </S.ImageContent>
                    <ExcluirModal setModalIsOpen={setModalIsOpenDelete} id={idColaborador} tipo="colaborador" />
                </S.MainWrapper>
            </ReactModal>
            <ReactModal
                isOpen={modalIsOpenAddColaborador}
                onRequestClose={() => setModalIsOpenAddColaborador(false)}
                style={S.modalStyle}
            >
                <S.MainWrapper>
                    <S.ImageContent onClick={() => closeModal()}>
                        <S.Image src="../../src/assets/svg/Close.svg" />
                    </S.ImageContent>
                    <AdicionarColaborador setIdColab={setIdColaborador} modalIsOpen={modalIsOpenAddColaborador} idColab={idColaborador} setModalIsOpen={setModalIsOpenAddColaborador} />
                </S.MainWrapper>
            </ReactModal>
        </>
    );
};
