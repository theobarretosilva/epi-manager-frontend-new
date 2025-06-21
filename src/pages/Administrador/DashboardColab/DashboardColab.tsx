import ReactModal from "react-modal";
import AdicionarColaborador from "../../../components/AdicionarColaborador/AdicionarColaborador";
import { useMemo, useState } from "react";
import * as S from './DashboardColab.styles';
import { toast, ToastContainer } from "react-toastify";
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
import { useGetSolicitacoes } from "../../../hooks/useGetSolicitacoes";
import EditarColaboradorModal from "../../../components/EditarColaboradorModal/EditarColaboradorModal";

export const DashboardColab = () => {
    const { colaboradores } = useGetColaboradores();
    const [modalIsOpenAddColaborador, setModalIsOpenAddColaborador] = useState(false);
    const [modalIsOpenEditarColaborador, setModalIsOpenEditarColaborador] = useState(false);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
    const [idColaborador, setIdColaborador] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { solicitacoes } = useGetSolicitacoes();

    const closeModalAdd = () => {
        setModalIsOpenAddColaborador(false);
        setIdColaborador(null);
    };
    const closeModalEdit = () => {
        setModalIsOpenEditarColaborador(false);
        setIdColaborador(null);
    };
    const openModalAdd = () => {
        setModalIsOpenAddColaborador(true);
        setIdColaborador(null);
    };
    const openModalEdit = (id: number) => {
        setModalIsOpenEditarColaborador(true);
        setIdColaborador(id);
    };
    const openModalDelete = (id: number) => {
        setModalIsOpenDelete(true);
        setIdColaborador(id);
    };

    const handleDownloadSolicitacoes = (id: number) => {
        const solicitacoesFiltradas = solicitacoes?.filter(
            (sol) => sol.solicitante.id === id
        );

        if (!solicitacoesFiltradas || solicitacoesFiltradas.length === 0) {
            toast.error("Nenhuma solicitação encontrada para este colaborador.");
            return;
        }

        const colaborador = solicitacoesFiltradas[0].solicitante;

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });

        doc.text(`Solicitações de ${colaborador.nome}`, 14, 15);

        autoTable(doc, {
            startY: 20,
            head: [[
                "ID",
                "Qtd",
                "Data Abertura",
                "Status",
                "Urgência",
                "Entrega",
                "Data Conclusão",
                "Equipamento (Descrição)",
                "CA",
                "Código EPI",
                "Validade",
            ]],
            body: solicitacoesFiltradas.map((sol) => [
                sol.id ?? '',
                sol.qtd ?? '',
                new Date(sol.dataAbertura).toLocaleDateString() ?? '',
                sol.status ?? '',
                sol.urgencia ?? '',
                sol.entrega ? 'Sim' : 'Não',
                sol.dataConclusao ? new Date(sol.dataConclusao).toLocaleDateString() : 'N/A',
                sol.equipamento?.descricao ?? '',
                sol.equipamento?.ca ?? '',
                sol.equipamento?.codigo ?? '',
                sol.equipamento?.data_validade ? new Date(sol.equipamento.data_validade).toLocaleDateString() : '',
            ]),
            styles: {
                fontSize: 7,
            },
            headStyles: {
                fillColor: [22, 160, 133],
                textColor: 255,
            },
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
            width: 58,
        },
        { field: 'id', headerName: 'ID', width: 20, align: 'center', headerAlign: 'center' },
        { field: 'matricula', headerName: 'Matricula', width: 90, align: 'center', headerAlign: 'center' },
        { field: 'nome', headerName: 'Nome', width: 220, align: 'center', headerAlign: 'center' },
        { field: 'cpf', headerName: 'CPF', width: 121, align: 'center', headerAlign: 'center'},
        { field: 'cargo', headerName: 'Cargo', width: 120, align: 'center', headerAlign: 'center'},
        { field: 'setor', headerName: 'Setor', width: 120, align: 'center', headerAlign: 'center' },
        { field: 'permissao', headerName: 'Permissão', width: 110, align: 'center', headerAlign: 'center' },
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
            width: 67,
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
                    onClick={() => {handleDownloadSolicitacoes(params.row.id);}}
                />,
            ],
            width: 139,
            align: 'center',
            headerAlign: 'center'
        },
    ];

    const rows = useMemo(() => 
        colaboradores?.filter((colab) => colab.status_uso.toLowerCase() === "ativo")
        .map((colaborador) => ({
            id: colaborador.id,
            nome: colaborador.nome,
            cpf: colaborador.cpf,
            cargo: colaborador.cargo,
            setor: colaborador.setor,
            permissao: colaborador.permissao.toLowerCase(),
            matricula: colaborador.matricula
        })) ?? [], [colaboradores]
    );

    const filteredRows = searchTerm
        ? rows?.filter((row) =>
            row.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.matricula.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
                "Cargo", 
                "Setor", 
                "Permissão", 
                "Liderança", 
                "Nome da Liderança",
                "Email"
            ]],
            body: colaboradores?.map((colab) => [
                colab.id,
                colab.nome,
                colab.cpf,
                colab.cargo,
                colab.setor,
                colab.permissao,
                colab.lideranca ? "Sim" : "Não",
                colab.nome_lideranca || "",
                colab.email,
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
                                <S.ButtonStyled onClick={() => openModalAdd()}>+ Adicionar Colaborador</S.ButtonStyled>
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
                                getRowId={(row) => row.id}
                            />
                        </Paper>
                        <S.DivLayoutDash>
                            <ModuloColabSetDash />
                            <ModuloIndicNume />
                        </S.DivLayoutDash>
                    </>
                ) : (
                    <>
                        <S.ButtonStyled onClick={() => openModalAdd()}>+ Adicionar Colaborador</S.ButtonStyled>
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
                    <ExcluirModal 
                        setModalIsOpen={setModalIsOpenDelete} 
                        id={idColaborador} 
                        tipo="colaborador"
                    />
                </S.MainWrapper>
            </ReactModal>
            <ReactModal
                isOpen={modalIsOpenAddColaborador}
                onRequestClose={closeModalAdd}
                style={S.modalStyle}
            >
                <S.MainWrapper>
                    <S.ImageContent onClick={closeModalAdd}>
                        <S.Image src="../../src/assets/svg/Close.svg" />
                    </S.ImageContent>
                    <AdicionarColaborador 
                        setIdColab={setIdColaborador}
                        modalIsOpen={modalIsOpenAddColaborador}
                        idColab={idColaborador}
                        setModalIsOpen={setModalIsOpenAddColaborador}
                    />
                </S.MainWrapper>
            </ReactModal>

            <ReactModal
                isOpen={modalIsOpenEditarColaborador}
                onRequestClose={closeModalEdit}
                style={S.modalStyle}
            >
                <S.MainWrapper>
                    <S.ImageContent onClick={closeModalEdit}>
                        <S.Image src="../../src/assets/svg/Close.svg" />
                    </S.ImageContent>
                    {idColaborador && (
                        <EditarColaboradorModal
                            idColab={idColaborador}
                            modalIsOpen={modalIsOpenEditarColaborador}
                            setModalIsOpen={setModalIsOpenEditarColaborador}
                        />
                    )}
                </S.MainWrapper>
            </ReactModal>
        </>
    );
};
