import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Card, CardContent } from '@material-ui/core';
import {
  getCountriesData,
  getCountriesDataByCountryCode,
  getHistoricalData,
  setCoordinates,
} from '../app/slices/appSlice';
import Virus from '../img/coronavirus_img.png';
import Grave from '../img/grave.png';
import HealthCare from '../img/healthcare.png';
import Covid from '../img/virus.png';
import InfoBox from './InfoBox';
import Map from './Map';
import Select from './Select';
import Table from './Table';
import LineGraph from './LineGraph';

function App() {
  const { loading, error, covidData } = useSelector((state) => state.covid);
  const { todayCases, cases, todayDeaths, deaths, todayRecovered, recovered } = useSelector(
    (state) => state.covid.countryData
  );

  const dispatch = useDispatch();

  const [country, setCountry] = useState('Worldwide');
  const [cName, setCName] = useState('Worldwide');
  const [casesType, setCasesType] = useState('cases');

  const showCountry = (e) => {
    const container = e.currentTarget.children[0].children[0].children[2];
    container.classList.toggle('show');
  };

  const getContryName = (code) => {
    const countryNameByCode = covidData.find(({ countryInfo: { iso2 } }) => iso2 === code);
    setCName(countryNameByCode?.country);
  };

  useEffect(() => {
    dispatch(getCountriesData());
    dispatch(getHistoricalData('all', casesType));
  }, []);

  useEffect(() => {
    dispatch(getHistoricalData('all', casesType));
  }, [casesType]);

  // get countrydata by country code changes
  useEffect(() => {
    dispatch(getCountriesDataByCountryCode(country));
    dispatch(setCoordinates(getCountryCoordinates(country)));
  }, [country]);

  const getCountryCoordinates = (code) => {
    if(!code || code === 'Worldwide') return;

    if (covidData?.length > 0) {
      const coordinates = covidData.find(({ countryInfo: { iso2 } }) => iso2 === code);
      const {
        countryInfo: { lat, long },
      } = coordinates;

      return {lat, lng: long, zoom: 5}
    }
  };

  return (
    <div className="app">
      {loading && (
        <div className="spinningicon">
          <img src={Virus} alt="covid-19" />
        </div>
      )}
      {error && (
        <div>
          <h1>No data. Check your internet connection</h1>
        </div>
      )}

      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown" onClick={showCountry}>
            <Select data={covidData} setCountry={setCountry} setCname={setCName} name={cName} getInfo={getContryName} />
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            img={Covid}
            title="Coronavirus cases"
            total={cases?.toLocaleString()}
            cases={todayCases?.toLocaleString()}
            casestype={setCasesType}
            type={'cases'}
            active={casesType === 'cases'}
          />
          <InfoBox
            img={HealthCare}
            title="Recovered"
            total={recovered?.toLocaleString()}
            cases={todayRecovered?.toLocaleString()}
            casestype={setCasesType}
            type={'recovered'}
            active={casesType === 'recovered'}
          />
          <InfoBox
            img={Grave}
            title="Deaths"
            total={deaths?.toLocaleString()}
            cases={todayDeaths?.toLocaleString()}
            casestype={setCasesType}
            type={'deaths'}
            active={casesType === 'deaths'}
          />
        </div>

        <Map casesType={casesType} />
      </div>

      <Card className="app__right">
        <CardContent className="card-right">
          <h3>Live Cases by Country</h3>
          <Table countries={covidData} />
          <h3>Worldwide New {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
