export interface SelectStyledProps {
    titulo: string;
    value?: string;
    disabled?: boolean;
    options: Array<string>;
    onChange?: (value: string) => void;
    name?: string;
};