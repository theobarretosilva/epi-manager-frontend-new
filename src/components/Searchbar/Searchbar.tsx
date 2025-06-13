import * as S from './Searchbar.styles';

interface SearchbarProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    value: string;
}

export const Searchbar = ({ placeholder = "Pesquise sua solicitação...", onSearch, value }: SearchbarProps) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onSearch) {
            onSearch(event.target.value);
        }
    };

    return (
        <S.DivInput>
            <S.SearchInputStyled 
                type="text" 
                placeholder={placeholder} 
                onChange={handleInputChange} 
                aria-label="Barra de Pesquisa"
                value={value}
            />
        </S.DivInput>
    );
};
