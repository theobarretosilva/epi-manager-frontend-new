export interface SelectInputProps {
    text: string; 
    title: string; 
    disable: boolean;
    handle?: (event: React.ChangeEvent<HTMLInputElement>) => void
};