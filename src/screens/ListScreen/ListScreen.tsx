import { useEffect, useState } from 'react';
import { Button, Container, Row, Card, Col } from 'react-bootstrap';
import AddressCard from '../../components/AddressCard/AddressCard';
import { getAllFormData } from '../../services/storageService';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { IDataFetched } from './types';
import './style.css';

function ListScreen() {
  const [addresses, setAddresses] = useState<IDataFetched[]>();

  const adressListIsEmpty = addresses?.length === 0;

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getAllFormData();
      setAddresses(allData);
    };
    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    setAddresses(addresses?.filter((address: IDataFetched) => address.id !== id));
  };

  return (
    <Container className='list-style'>
      <Card style={{
        backgroundColor: 'rgba(218, 218, 218, 0.8)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '50%',
        border: 'white 1px solid'
      }}>

        <Row className='mb-2 mt-2'>
          <h1>Lista de endereços</h1>
          {adressListIsEmpty && <h5>Nenhum endereço cadastrado</h5>}
          {addresses?.map((address) => (
            <AddressCard key={address.id} id={address.id} address={address.data} onDelete={handleDelete} />
          ))}
        </Row>

        <Row className='w-100'>
          <Col className='d-flex justify-content-center'>
            <Link to='/'>
              <Button variant='outline-primary' className='mx-2' size='lg'>
                <MdArrowBack className='me-2' /> Voltar ao início
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>

    </Container >
  );
}

export default ListScreen