import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Earth from '../img/planet-earth.png';
import { getCountriesDataByCountryCode } from '../app/slices/appSlice';

const Select = ({ data, setCountry, name, getInfo, setCname }) => {
  const [flag, setFlag] = useState(Earth);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    if(e.target.dataset.code === 'worldwide') {
      dispatch(getCountriesDataByCountryCode('Worldwide'))
      setFlag(e.target.children[0].src);
      setCountry('Worldwide');
      setCname('Worldwide');
    } else {
      setCountry(e.target.dataset.code);
      getInfo(e.target.dataset.code);
      setFlag(e.target.children[0].src);
    }
  };

  function render(data) {
    const options =
      data.length > 0 &&
      data.map(({ country, countryInfo: { iso2, flag } }) => (
        <div className="select__children" data-code={iso2} key={country} value={iso2} onClick={handleClick}>
          <img style={{ width: '30px' }} src={flag} alt={country} /> {country} ({iso2})
        </div>
      ));
    return options;
  }

  return (
    <div className="select">
      <div className="select__worldwide">
        <img src={flag} alt="" /> <p>{name}</p>
        <div className="select__container">
          <div className="select__children" data-code="worldwide" onClick={handleClick}>
            <img style={{ width: '30px' }} src={Earth} alt="world wide" /> Worldwide
          </div>
          {render(data)}
        </div>
      </div>
    </div>
  );
};

export default Select;
