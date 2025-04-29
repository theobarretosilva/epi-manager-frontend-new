import { BarChart } from '@mui/x-charts';
import * as S from './ModuloNSoliciDash.styles'

export const ModuloNSoliciDash = () => {
    const dataset = [
        {
            pendentes: 5,
            concluidas: 22,
        },
    ]

    function valueFormatter(value: number | null) {
        return `${value}`;
    }

    const chartSetting = {
        height: 200,
    };

    return(
        <S.BoxStyled>
            <S.TituloBox>N° de Solicitações</S.TituloBox>
            <S.LinhaStyled> </S.LinhaStyled>
            <BarChart
                dataset={dataset}
                series={[
                    { dataKey: 'pendentes', label: 'Pendentes', valueFormatter },
                    { dataKey: 'concluidas', label: 'Concluidas', valueFormatter }
                ]}
                {...chartSetting}
            />
        </S.BoxStyled>
    )
}