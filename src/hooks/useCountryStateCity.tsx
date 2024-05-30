import { useEffect, useReducer } from 'react';
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';

const initialState = {
    countries: [] as ICountry[],
    statesFromSelectedCountry: [] as IState[],
    citiesFromSelectedState: [] as ICity[],
    selectedCountry: '',
    selectedState: '',
    selectedCity: '',
};

type State = typeof initialState;

type Action =
    | { type: 'SET_SELECTED_COUNTRY'; payload: string }
    | { type: 'SET_SELECTED_STATE'; payload: string }
    | { type: 'SET_SELECTED_CITY'; payload: string }
    | { type: 'SET_COUNTRIES'; payload: ICountry[] }
    | { type: 'SET_STATES_FROM_SELECTED_COUNTRY'; payload: IState[] }
    | { type: 'SET_CITIES_FROM_SELECTED_STATE'; payload: ICity[] };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
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

const useCountryStateCity = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

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

    const setSelectedCountry = (country: string) => {
        dispatch({ type: 'SET_SELECTED_COUNTRY', payload: country });
    };

    const setSelectedState = (state: string) => {
        dispatch({ type: 'SET_SELECTED_STATE', payload: state });
    };

    const setSelectedCity = (city: string) => {
        dispatch({ type: 'SET_SELECTED_CITY', payload: city });
    };

    const { countries, statesFromSelectedCountry, citiesFromSelectedState, selectedCountry, selectedState, selectedCity } = state;

    return {
        state: {
            countries,
            statesFromSelectedCountry,
            citiesFromSelectedState,
            selectedCountry,
            selectedState,
            selectedCity,
        },
        setSelectedCountry,
        setSelectedState,
        setSelectedCity,
    };
};

export default useCountryStateCity;
