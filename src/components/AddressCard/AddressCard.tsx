import React, { useState } from 'react';
import { deleteFormData, updateFormData } from '../../services/storageService';
import AddressModal from '../AddressModal/AddressModal';
import { Container, Button, Col, Row, Dropdown, Form } from 'react-bootstrap';
import { MdPlaylistRemove, MdEditNote, MdContentCopy } from 'react-icons/md';
import { IAddressCardProps } from './types';

const AddressCard: React.FC<IAddressCardProps> = ({ address, id, onDelete }) => {
    const lotNumberRegex = /^\d{4}$/;
    const houseNumberRegex = /^\d+$/;

    console.log('AddressCard -> address', address);

    const [showModal, setShowModal] = useState(false);
    const [editedAddress, setEditedAddress] = useState(address);

    const handleEdit = () => {
        setShowModal(true);
    };

    const handleDelete = async () => {
        const userConfirmed = window.confirm(`Tem certeza que deseja remover o endereço ${address.name}?`);
        if (userConfirmed) {
            await deleteFormData(id);
            onDelete(id);
            alert('Endereço removido com sucesso!');
        }
    };

    const handleSaveEdit = async () => {
        await updateFormData(id, editedAddress);
        setShowModal(false);
        alert('Endereço atualizado com sucesso!');
        window.location.reload();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'lotNumber' && !lotNumberRegex.test(value)) {
            alert('O lote deve ser um numeral de 4 dígitos');
            return;
        }
        if (name === 'houseNumber' && !houseNumberRegex.test(value)) {
            alert('O campo deve ser um valor numérico');
            return;
        }
        setEditedAddress(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCopyToClipBoard = () => {
        const isEarth = address.planet === 'Terra';
        const hasOtherInfo = address.otherInfo !== undefined && address.otherInfo !== null;

        const showOtherInfo = hasOtherInfo ? address.otherInfo : '';

        const formattedEarthAddress: string =
            `Planeta ${address.planet} - ${address.street}, ${address.houseNumber} ${showOtherInfo}, Bairro ${address.neighborhood}, CEP: ${address.zipCode} - ${address.city}, ${address.state} - ${address.country}`
                .trim();

        const formattedMarsAddress: string =
            `Planeta ${address.planet} - Fábrica ou local de armazenamento: ${address.factoryName}, Lote número: ${address.lotNumber}`
                .trim();

        navigator.clipboard.writeText(isEarth ? formattedEarthAddress : formattedMarsAddress)
            .then(() => {
                alert('Endereço copiado para a área de transferência!');
            })
            .catch(err => {
                console.error('Erro ao copiar o endereço: ', err);
            });
    };

    return (
        <Container>
            <Row className='mb-2 mt-2' style={{
                border: '1px solid white',
                borderRadius: '10px',
                padding: '10px',
                alignItems: 'center',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            }}>
                <Form.Group as={Col} controlId='formGridCountry'>
                    <Dropdown>
                        <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                            {address.name} - Planeta {address.planet}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item style={{
                                cursor: 'default',
                            }}>
                                {address.planet === 'Terra' && (
                                    <>
                                        <p>{address.street}, {address.houseNumber}</p>
                                        {address.otherInfo
                                            ? <p>{address.otherInfo} - Bairro {address.neighborhood},</p>
                                            : <p>Bairro {address.neighborhood},</p>
                                        }
                                        <p>CEP: {address.zipCode}</p>
                                        <p>{address.city}, {address.state}, {address.country}</p>
                                    </>
                                )}
                                {address.planet === 'Marte' && (
                                    <>
                                        <p>Fábrica ou local de armazenamento: {address.factoryName}</p>
                                        <p>Lote número: {address.lotNumber}</p>
                                    </>
                                )}
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}>
                                <p onClick={() => handleCopyToClipBoard()}>
                                    <MdContentCopy /> Copiar endereço
                                </p>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>

                <Form.Group as={Col}>
                    <Button variant='primary' size='sm' onClick={handleEdit} title='Editar endereço'>
                        <MdEditNote size={25} />
                    </Button>
                    <Button variant='outline-danger' size='sm' onClick={handleDelete} style={{ marginLeft: '5px' }} title='Remover endereço'>
                        <MdPlaylistRemove size={25} />
                    </Button>
                </Form.Group>
            </Row>

            <AddressModal
                showModal={showModal}
                setShowModal={setShowModal}
                editedAddress={editedAddress}
                handleChange={handleChange}
                handleSaveEdit={handleSaveEdit}
            />

        </Container>
    );
}

export default AddressCard;

