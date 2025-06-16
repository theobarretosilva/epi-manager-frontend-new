import { useMemo } from "react";
import { ColaboradorProps } from "../props/colaboradorProps";

export const useGetColabsCadastradosMes = (colaboradores: ColaboradorProps[] | undefined) => {
    const colaboradoresCadastradosNoMes = useMemo(() => {
        const hoje = new Date();
        return colaboradores?.filter(colab => {
            const data = new Date(colab.dataCadastro);
            return (
                data.getMonth() === hoje.getMonth() &&
                data.getFullYear() === hoje.getFullYear()
            );
        }).length;
    }, [colaboradores]);

    return colaboradoresCadastradosNoMes;
};
