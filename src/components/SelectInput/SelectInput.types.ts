export interface SelectInputProps {
    text: string; 
    title: string; 
    disable?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};