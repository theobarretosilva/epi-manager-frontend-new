import { BarChart } from '@mui/x-charts'
import * as S from './ModuloNStatSoli.styles'

type Solicitacao = {
    id: string;
    solicitante: string;
    status: string;
    descricaoItem: string;
    codigoEPI: string;
    prioridade: string;
};

type Props = {
    solicitacoes: Solicitacao[];
};

export const ModuloNStatSoli = ({ solicitacoes }: Props) => {
    function contarSolicitacoes() {
        let altas = 0;
        let medias = 0;
        let baixas = 0;

        solicitacoes.forEach((s) => {
            const prioridade = s.prioridade.toLowerCase();
            if (prioridade === 'alta') {
                altas += 1;
            } else if (prioridade === 'média') {
                medias += 1;
            } else if (prioridade === 'baixa') {
                baixas += 1;
            }
        });

        return { altas, medias, baixas };
    }

    const { altas, medias, baixas } = contarSolicitacoes();

    const dataset = [
        {
            Prioridade: 'Solicitações',
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
            <S.TituloBox>N° e Prioridade de Solicitações</S.TituloBox>
            <S.LinhaStyled />
            <BarChart
                dataset={dataset}
                xAxis={[{ dataKey: 'Prioridade', scaleType: 'band' }]}
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