import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { MdArrowBack, MdOutlineErrorOutline  } from 'react-icons/md';
import '../RegisterScreen/style.css';

function NotFoundScreen() {
  return (
    <Container className='standard-style'>
      <Card style={{
        backgroundColor: 'rgba(218, 218, 218, 0.8)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        padding: '3%',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '50%',
        border: 'white 1px solid'
      }}>
        <Row className='w-100'>
          <MdOutlineErrorOutline  size={90} />
        </Row>
        
        <Row className='w-100'>
          <h2 className='mb-4'> Oops! Página não encontrada</h2>
        </Row>

        <Row className='w-100'>
          <Col className='d-flex justify-content-center'>
            <Link to='/'>
              <Button variant='primary' className='mx-2' size='lg'>
                <MdArrowBack className='me-2' /> Voltar ao início
              </Button>
            </Link>
          </Col>
        </Row>

      </Card>
    </Container >
  );
}

export default NotFoundScreen