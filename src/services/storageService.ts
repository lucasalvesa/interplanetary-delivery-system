import localforage from 'localforage';
import { IFormData } from '../screens/RegisterScreen/types';

const formDataStore = localforage.createInstance({
    name: 'formDataStore',
    storeName: 'formData',
});

export const saveFormData = async (data: IFormData) => {
    const id = new Date().getTime().toString();
    await formDataStore.setItem(id, data);
    return id;
};

export const getAllFormData = async (): Promise<{ id: string, data: IFormData }[]> => {
    const keys = await formDataStore.keys();
    const items = await Promise.all(keys.map(async key => {
        const data: IFormData = await formDataStore.getItem(key) as IFormData;
        return { id: key, data };
    }));
    return items;
};

export const updateFormData = async (id: string, data: IFormData) => {
    await formDataStore.setItem(id, data);
};

export const deleteFormData = async (id: string) => {
    await formDataStore.removeItem(id);
};
