import { IFormData } from '../../screens/RegisterScreen/types';

export interface IModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    editedAddress: IFormData;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSaveEdit: () => void;    
}