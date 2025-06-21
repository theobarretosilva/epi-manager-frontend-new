import { Paper } from '@mui/material'
import { Searchbar } from '../../../components/Searchbar/Searchbar'
import * as S from './ConsultColab.styles'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { NoDataToShow } from '../../../components/NoDataToShow/NoDataToShow'
import { useGetColaboradores } from '../../../hooks/useGetColaboradores'
import { ModuloColabSetDash } from '../../../components/ModuloColabSetDash/ModuloColabSetDash'
import { ModuloIndicNume } from '../../../components/ModuloIndicNume/ModuloIndicNume'

export const ConsultColab = () => {
    const { colaboradores } = useGetColaboradores();
    const [searchTerm, setSearchTerm] = useState("");

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100, align: 'center', headerAlign: 'center'},
        { field: 'matricula', headerName: 'Matrícula', width: 100, align: 'center', headerAlign: 'center' },
        { field: 'nome', headerName: 'Nome', width: 300, align: 'center', headerAlign: 'center' },
        { field: 'cargo', headerName: 'Cargo', width: 200, align: 'center', headerAlign: 'center'},
        { field: 'setor', headerName: 'Setor', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'permissao', headerName: 'Permissão', width: 180, align: 'center', headerAlign: 'center' },
    ];

    const rows = colaboradores
        ?.filter((colab) => colab.status_uso.toLowerCase() === "ativo")
        .map((colaborador) => ({
            id: colaborador.id,
            nome: colaborador.nome,
            cargo: colaborador.cargo,
            setor: colaborador.setor,
            permissao: colaborador.permissao.toLowerCase(),
            matricula: colaborador.matricula
        })
    );

    const filteredRows = searchTerm
        ? rows?.filter((row) =>
            row.nome.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : rows;

    return(
        <>
            <S.MainStyled>
                {(filteredRows || []).length > 0 ? (
                    <>
                        <Paper sx={{ height: '100%', width: '100%', fontSize: 14, mt: 0 }}>
                            <Searchbar value={searchTerm} placeholder='Pesquise pela matricula ou nome' onSearch={setSearchTerm} />
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
                    <NoDataToShow mainText='Não foram adicionados colaboradores!' />
                )}
                
            </S.MainStyled>
        </>
    )
}