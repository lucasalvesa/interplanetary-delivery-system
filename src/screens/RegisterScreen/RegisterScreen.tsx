import { useEffect, useReducer } from 'react'
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { MdFormatListBulletedAdd, MdFormatListBulleted } from 'react-icons/md';
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';
import { saveFormData } from '../../services/storageService';
import { IFormData } from './types';
import './style.css'

const initialState = {
    selectedPlanet: '',
    selectedCountry: '',
    selectedState: '',
    selectedCity: '',
    countries: [] as ICountry[],
    statesFromSelectedCountry: [] as IState[],
    citiesFromSelectedState: [] as ICity[],
};

type State = typeof initialState;

type Action =
    | { type: 'SET_SELECTED_PLANET'; payload: string }
    | { type: 'SET_SELECTED_COUNTRY'; payload: string }
    | { type: 'SET_SELECTED_STATE'; payload: string }
    | { type: 'SET_SELECTED_CITY'; payload: string }
    | { type: 'SET_COUNTRIES'; payload: ICountry[] }
    | { type: 'SET_STATES_FROM_SELECTED_COUNTRY'; payload: IState[] }
    | { type: 'SET_CITIES_FROM_SELECTED_STATE'; payload: ICity[] };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_SELECTED_PLANET':
            return { ...state, selectedPlanet: action.payload };
        case 'SET_SELECTED_COUNTRY':
            return { ...state, selectedCountry: action.payload };
        case 'SET_SELECTED_STATE':
            return { ...state, selectedState: action.payload };
        case 'SET_SELECTED_CITY':
            return { ...state, selectedCity: action.payload };
        case 'SET_COUNTRIES':
            return { ...state, countries: action.payload };
        case 'SET_STATES_FROM_SELECTED_COUNTRY':
            return { ...state, statesFromSelectedCountry: action.payload };
        case 'SET_CITIES_FROM_SELECTED_STATE':
            return { ...state, citiesFromSelectedState: action.payload };
        default:
            return state;
    }
};

function RegisterScreen() {
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(reducer, initialState);

    const { register, handleSubmit, control, formState: { errors } } = useForm<IFormData>();

    const watchPlanet = useWatch({ control, name: 'planet' });
    const watchCountry = useWatch({ control, name: 'country' });
    const watchState = useWatch({ control, name: 'state' });
    const watchCity = useWatch({ control, name: 'city' });

    const disableSubmitButton = !state.selectedPlanet;

    const onSubmit = async (data: IFormData) => {
        await saveFormData(data);
        alert('Endereço cadastrado com sucesso!');
        navigate('/list');
    };

    useEffect(() => {
        if (watchPlanet === 'Selecione...') {
            dispatch({ type: 'SET_SELECTED_PLANET', payload: '' });
        } else {
            dispatch({ type: 'SET_SELECTED_PLANET', payload: watchPlanet });
        }

        if (watchCountry === 'Selecione...') {
            dispatch({ type: 'SET_SELECTED_COUNTRY', payload: '' });
        } else {
            const country = state.countries.find(country => country.name === watchCountry);
            if (country) {
                dispatch({ type: 'SET_SELECTED_COUNTRY', payload: country.isoCode });
            }
        }

        if (watchState === 'Selecione...') {
            dispatch({ type: 'SET_SELECTED_STATE', payload: '' });
        } else {
            const stateObj = state.statesFromSelectedCountry.find(state => state.name === watchState);
            if (stateObj) {
                dispatch({ type: 'SET_SELECTED_STATE', payload: stateObj.isoCode });
            }
        }

        if (watchCity === 'Selecione...') {
            dispatch({ type: 'SET_SELECTED_CITY', payload: '' });
        } else {
            dispatch({ type: 'SET_SELECTED_CITY', payload: watchCity ?? '' });
        }
    }, [watchPlanet, watchCountry, watchState, watchCity, state.countries, state.statesFromSelectedCountry]);

    useEffect(() => {
        if (state.countries.length > 0) return;
        const fetchCountries = async () => {
            try {
                const countriesPoluted = Country.getAllCountries();
                const listOfTreatedCountries = await Promise.all(countriesPoluted.map(async (country) => {
                    const states = State.getStatesOfCountry(country.isoCode);
                    if (states.length === 0) return null;
                    const cities = City.getCitiesOfState(country.isoCode, states[0].isoCode);
                    if (cities.length === 0) return null;
                    return country;
                }));
                dispatch({ type: 'SET_COUNTRIES', payload: listOfTreatedCountries.filter((country): country is ICountry => country !== null) });
            } catch (error) {
                console.error('Falha no tratamento dos países sem estados e cidades.', error);
            }
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        if (!state.selectedCountry) return;
        const states = State.getStatesOfCountry(state.selectedCountry);
        dispatch({ type: 'SET_STATES_FROM_SELECTED_COUNTRY', payload: states });
    }, [state.selectedCountry]);

    useEffect(() => {
        if (!state.selectedCountry || !state.selectedState) return;
        const cities = City.getCitiesOfState(state.selectedCountry, state.selectedState);
        dispatch({ type: 'SET_CITIES_FROM_SELECTED_STATE', payload: cities });
    }, [state.selectedCountry, state.selectedState]);

    const renderEarthInputs = () => (
        <>
            <Row className='mb-2 mt-2'>
                <Form.Group as={Col} controlId='formGridCountry'>
                    <label>País:</label>
                    <Form.Select
                        className={errors?.country && 'input-error'}
                        {...register('country', { required: true })}>
                        <option>Selecione...</option>
                        {state.countries.map((country, index) => (
                            <option key={index} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </Form.Select>
                    {errors.country?.type === 'required' && <p className='text-danger' style={{ fontSize: '12px' }}>Campo obrigatório</p>}
                </Form.Group>

                <Form.Group as={Col} controlId='formGridState'>
                    <label>Estado:</label>
                    <Form.Select
                        className={errors?.state && 'input-error'}
                        disabled={!state.selectedCountry}
                        {...register('state', { required: true })}>
                        <option>Selecione...</option>
                        {state.statesFromSelectedCountry.map((state, index) => (
                            <option key={index} value={state.name}>
                                {state.name}
                            </option>
                        ))}
                    </Form.Select>
                    {errors.state?.type === 'required' && <p className='text-danger' style={{ fontSize: '12px' }}>Campo obrigatório</p>}
                </Form.Group>
            </Row>

            <Row className='mb-2 mt-2'>
                <Form.Group as={Col} controlId='formGridCity'>
                    <label>Cidade:</label>
                    <Form.Select
                        className={errors?.city && 'input-error'}
                        disabled={!state.selectedState}
                        {...register('city', { required: true })}>
                        <option>Selecione...</option>
                        {state.citiesFromSelectedState.map((city, index) => (
                            <option key={index} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </Form.Select>
                    {errors.city?.type === 'required' && <p className='text-danger' style={{ fontSize: '12px' }}>Campo obrigatório</p>}
                </Form.Group>

                <Form.Group as={Col} controlId='formGridZip'>
                    <label>CEP / Zip Code:</label>
                    <Form.Control
                        className={errors?.zipCode && 'input-error'}
                        type='text'
                        placeholder='00000-000'
                        disabled={!state.selectedCity}
                        {...register('zipCode', { required: true })} />
                    {errors.zipCode?.type === 'required' && <p className='text-danger' style={{ fontSize: '12px' }}>Campo obrigatório</p>}
                </Form.Group>
            </Row>

            <Row className='mb-2 mt-2'>
                <Form.Group as={Col} controlId='formGridStreet'>
                    <label>Logradouro:</label>
                    <Form.Control
                        className={errors?.street && 'input-error'}
                        type='text'
                        placeholder='Rua / Avenida Tom Jobim'
                        disabled={!state.selectedCity}
                        {...register('street', { required: true })} />
                    {errors.street?.type === 'required' && <p className='text-danger' style={{ fontSize: '12px' }}>Campo obrigatório</p>}
                </Form.Group>

                <Form.Group as={Col} controlId='formGridNumber'>
                    <label>Número:</label>
                    <Form.Control
                        className={errors?.houseNumber && 'input-error'}
                        type='text'
                        placeholder='123'
                        disabled={!state.selectedCity}
                        {...register('houseNumber', { required: true, pattern: /^\d+$/ })} />
                    {errors.houseNumber?.type === 'required' && <p className='text-danger' style={{ fontSize: '12px' }}>Campo obrigatório</p>}
                    {errors.houseNumber?.type === 'pattern' && <p className='text-danger' style={{ fontSize: '12px' }}>O campo deve ser um valor numérico</p>}
                </Form.Group>
            </Row>

            <Row className='mb-2 mt-2'>
                <Form.Group as={Col} controlId='formGridNeighborhood'>
                    <label>Bairro:</label>
                    <Form.Control
                        className={errors?.neighborhood && 'input-error'}
                        type='text'
                        placeholder='Leblon'
                        disabled={!state.selectedCity}
                        {...register('neighborhood', { required: true })} />
                    {errors.neighborhood?.type === 'required' && <p className='text-danger' style={{ fontSize: '12px' }}>Campo obrigatório</p>}
                </Form.Group>

                <Form.Group as={Col} controlId='formGridOtherInfo'>
                    <label>Complemento:</label>
                    <Form.Control type='text' placeholder='Ap. 101' disabled={!state.selectedCity} {...register('otherInfo')} />
                </Form.Group>
            </Row>
        </>
    );

    const renderMarsInputs = () => (
        <>
            <Row className='mb-2 mt-2'>
                <Form.Group as={Col} controlId='formGridFactoryName'>
                    <label>Fábrica ou local de armazenamento:</label>
                    <Form.Control
                        className={errors?.factoryName && 'input-error'}
                        type='text'
                        placeholder='Galpões ACME'
                        {...register('factoryName', { required: true })} />
                    {errors.factoryName?.type === 'required' && <p className='text-danger' style={{ fontSize: '12px' }}>Campo obrigatório</p>}
                </Form.Group>

                <Form.Group as={Col} controlId='formGridLotNumber'>
                    <label>Lote número:</label>
                    <Form.Control
                        className={errors?.lotNumber && 'input-error'}
                        type='text'
                        placeholder='1234'
                        {...register('lotNumber', { required: true, pattern: /^[0-9]{4}$/ })} />
                    {errors.lotNumber?.type === 'required' && <p className='text-danger' style={{ fontSize: '12px' }}>Campo obrigatório</p>}
                    {errors.lotNumber?.type === 'pattern' && <p className='text-danger' style={{ fontSize: '12px' }}>O lote deve ser um numeral de 4 dígitos</p>}
                </Form.Group>
            </Row>
        </>
    );

    return (
        <Container className='standard-style'>
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
                <h1>Cadastrar novo endereço</h1>
                <Row className='mb-2 mt-2'>
                    <Form.Group as={Col}>
                        <label>Selecione seu planeta:</label>
                        <Form.Select {...register('planet', { required: true })}>
                            <option>Selecione...</option>
                            <option value='Terra'>Terra</option>
                            <option value='Marte'>Marte</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <label>Nome desse endereço:</label>
                        <Form.Control
                            className={errors?.name && 'input-error'}
                            type='text'
                            placeholder='Casa / Trabalho / Outro'
                            disabled={!state.selectedPlanet}
                            {...register('name', { required: true })} />
                        {errors.name?.type === 'required' && <p className='text-danger' style={{ fontSize: '12px' }}>Campo obrigatório</p>}
                    </Form.Group>
                </Row>

                {state.selectedPlanet === 'Terra' && renderEarthInputs()}
                {state.selectedPlanet === 'Marte' && renderMarsInputs()}

                <Row className='mt-4'>
                    <Col className='d-flex justify-content-center'>
                        <Button
                            variant={disableSubmitButton ? 'secondary' : 'primary'}
                            className='mx-2'
                            size='lg'
                            disabled={disableSubmitButton}
                            onClick={() => handleSubmit(onSubmit)()}
                        >
                            <MdFormatListBulletedAdd size={25} /> Cadastrar
                        </Button>
                    </Col>
                    <Col className='d-flex justify-content-center'>
                        <Link to='/list'>
                            <Button
                                variant='outline-primary'
                                className='mx-2'
                                size='lg'
                            >
                                <MdFormatListBulleted size={25} /> Listar endereços
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Card>
        </Container >
    );
}

export default RegisterScreen
