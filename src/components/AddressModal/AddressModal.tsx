import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { MdPlaylistAddCheck, MdOutlineDoNotTouch } from 'react-icons/md';
import { IModalProps } from './types';

const AddressModal: React.FC<IModalProps> = ({
    showModal,
    setShowModal,
    editedAddress,
    handleChange,
    handleSaveEdit
}) =>
(
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Editar endereço</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {editedAddress.planet === 'Terra' ? (
                <>
                    <Form.Group controlId='formName'>
                        <label>Nome:</label>
                        <Form.Control
                            type='text'
                            name='name'
                            value={editedAddress.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='formCountry'>
                        <label>País:</label>
                        <Form.Control
                            type='text'
                            name='country'
                            value={editedAddress.country}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='formState'>
                        <label>Estado:</label>
                        <Form.Control
                            type='text'
                            name='state'
                            value={editedAddress.state}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='formCity'>
                        <label>Cidade:</label>
                        <Form.Control
                            type='text'
                            name='city'
                            value={editedAddress.city}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='formZipCode'>
                        <label>CEP:</label>
                        <Form.Control
                            type='text'
                            name='zipCode'
                            value={editedAddress.zipCode}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='formStreet'>
                        <label>Rua:</label>
                        <Form.Control
                            type='text'
                            name='street'
                            value={editedAddress.street}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='formHouseNumber'>
                        <label>Número da Casa:</label>
                        <Form.Control
                            type='text'
                            name='houseNumber'
                            value={editedAddress.houseNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='formNeighborhood'>
                        <label>Bairro:</label>
                        <Form.Control
                            type='text'
                            name='neighborhood'
                            value={editedAddress.neighborhood}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='formOtherInfo'>
                        <label>Outras Informações:</label>
                        <Form.Control
                            type='text'
                            name='otherInfo'
                            value={editedAddress.otherInfo}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </>
            ) : (
                <>
                    <Form.Group controlId='formFactoryName'>
                        <label>Nome da Fábrica:</label>
                        <Form.Control
                            type='text'
                            name='factoryName'
                            value={editedAddress.factoryName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='formLotNumber'>
                        <label>Número do Lote:</label>
                        <Form.Control
                            type='text'
                            name='lotNumber'
                            value={editedAddress.lotNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </>
            )}
        </Modal.Body>

        <Modal.Footer>
            <Button variant='outline-danger' onClick={() => setShowModal(false)} title='Cancelar'>
                <MdOutlineDoNotTouch size={25} />
            </Button>
            <Button variant='primary' onClick={handleSaveEdit} title='Salvar'>
                <MdPlaylistAddCheck size={25} />
            </Button>
        </Modal.Footer>
    </Modal>
)

export default AddressModal;