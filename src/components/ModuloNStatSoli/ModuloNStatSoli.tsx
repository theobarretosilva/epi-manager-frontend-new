import { BarChart } from '@mui/x-charts'
import * as S from './ModuloNStatSoli.styles'
import { SolicitacaoProps } from '../../props/solicitacao.props';

type Props = {
    solicitacoes: SolicitacaoProps[];
};

export const ModuloNStatSoli = ({ solicitacoes }: Props) => {
    function contarSolicitacoes() {
        let altas = 0;
        let medias = 0;
        let baixas = 0;

        solicitacoes.forEach((s) => {
            const urgencia = s.urgencia.toLowerCase();
            if (urgencia === 'alta') {
                altas += 1;
            } else if (urgencia === 'media') {
                medias += 1;
            } else if (urgencia === 'baixa') {
                baixas += 1;
            }
        });

        return { altas, medias, baixas };
    }

    const { altas, medias, baixas } = contarSolicitacoes();

    const dataset = [
        {
            urgencia: 'Solicitações',
            altas,
            medias,
            baixas
        },
    ];

    function valueFormatter(value: number | null) {
        return `${value}`;
    }

    const chartSetting = {
        height: 200,
    };
    
    return(
        <S.BoxStyled>
            <S.TituloBox>N° e Urgência de Solicitações</S.TituloBox>
            <S.LinhaStyled />
            <BarChart
                dataset={dataset}
                xAxis={[{ dataKey: 'urgencia', scaleType: 'band' }]}
                series={[
                { dataKey: 'altas', label: 'Altas', valueFormatter },
                { dataKey: 'medias', label: 'Médias', valueFormatter },
                { dataKey: 'baixas', label: 'Baixas', valueFormatter },
                ]}
                {...chartSetting}
            />
        </S.BoxStyled>
    )
}