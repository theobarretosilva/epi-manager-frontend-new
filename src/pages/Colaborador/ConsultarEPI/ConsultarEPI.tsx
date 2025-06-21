import { useEffect, useMemo, useState } from "react";
import { useGetEPIS } from "../../../hooks/useGetEPIS"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import * as S from './ConsultarEPI.styles'
import { Box, Modal, Paper } from "@mui/material";
import { Searchbar } from "../../../components/Searchbar/Searchbar";
import { NoDataToShow } from "../../../components/NoDataToShow/NoDataToShow";

export function ConsultarEPI() {
    const { epis } = useGetEPIS();
    const [filteredRows, setFilteredRows] = useState<typeof rows>([]);
    
    const rows = useMemo(() =>
        epis?.filter((epi) => epi.status_uso.toLowerCase() === "ativo")
        .map((epi) => ({
            foto: epi.foto,
            id: epi.id,
            codigo: epi.codigo,
            descricao: epi.descricao,
            qtd: epi.qtd,
            ca: epi.ca,
            data_validade: new Date(epi.data_validade).toLocaleDateString("pt-BR"),
        })) ?? [],
        [epis]
    );

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const handleImageClick = (link: string) => {
        setSelectedImage(link);
    };
    const handleClose = () => {
        setSelectedImage(null);
    };

    const columns: GridColDef[] = [
        {
            field: 'foto',
            headerName: 'Foto',
            width: 130,
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
        { field: 'id', headerName: 'ID', width: 120, align: 'center', headerAlign: 'center'},
        { field: 'codigo', headerName: 'Código', width: 120, align: 'center', headerAlign: 'center'},
        { field: 'descricao', headerName: 'Descrição do Item', width: 300, align: 'center', headerAlign: 'center' },
        { field: 'qtd', headerName: 'Quantidade', width: 130, align: 'center', headerAlign: 'center' },
        { field: 'ca', headerName: 'CA', width: 130, align: 'center', headerAlign: 'center' },
        { field: 'data_validade', headerName: 'Validade', width: 130, align: 'center', headerAlign: 'center'},
    ];

    useEffect(() => {
        setFilteredRows(rows);
    }, [rows]);

    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (value: string) => {
        setSearchValue(value);

        if (!value) {
        setFilteredRows(rows);
        return;
        }

        const normalized = (text: string | undefined) =>
        (text ?? "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

        const searchNormalized = normalized(value);

        const filtered = rows?.filter((row) => {
            return (
                row.id?.toString().includes(searchNormalized) ||
                normalized(row.descricao).includes(searchNormalized) ||
                normalized(row.codigo?.toString()).includes(searchNormalized)
            );
        });

        setFilteredRows(filtered);
    };

    return(
        <>
            <S.MainStyled>
                {filteredRows?.length > 0 ? (
                    <Paper sx={{ height: '100%', width: '100%', fontSize: 14, mt: 0 }}>
                        <Searchbar placeholder="Pesquise pela descrição ou código" onSearch={handleSearch}  value={searchValue}/>
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
                    <div style={{justifyContent: 'flex-start', width: '100%'}}>
                        <NoDataToShow mainText="Não foram adicionados EPI's!" />
                    </div>
                )}
            </S.MainStyled>
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