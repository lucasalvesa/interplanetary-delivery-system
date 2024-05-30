import { IFormData } from '../../screens/RegisterScreen/types';

export interface IAddressCardProps {
    address: IFormData;
    id: string;
    onDelete: (id: string) => void;
}