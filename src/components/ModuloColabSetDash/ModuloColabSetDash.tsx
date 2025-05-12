import { PieChart } from '@mui/x-charts'
import * as S from './ModuloColabSetDash.styles'

export const ModuloColabSetDash = () => {
    return (
        <S.BoxStyled>
            <S.TituloBox>Distribuição por cargo</S.TituloBox>
            <S.LinhaStyled> </S.LinhaStyled>
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'Colaboradores' },
                            { id: 1, value: 15, label: 'Almoxarifado' },
                            { id: 2, value: 20, label: 'Administradores' },
                        ],
                    },
                ]}
                width={200}
                height={200}
            />
        </S.BoxStyled>
    )
}