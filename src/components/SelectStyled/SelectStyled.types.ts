export interface SelectStyledProps {
    titulo: string;
    value?: string;
    disabled?: boolean;
    options: Array<string>;
    onChange?: (value) => void;
    name: string;
};