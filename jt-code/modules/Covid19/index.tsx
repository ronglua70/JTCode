/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState, useMemo} from 'react'

import Image from 'next/image'
import Modal from 'components/Modal';

import ERROR_IMG from 'assets/images/Public/error_api.jpeg'

type Props = {}

const TYPE_SORT = [
  {
    type: 'TotalConfirmed',
    name: 'Confirmed'
  },
  {
    type: 'TotalDeaths',
    name: 'Deaths'
  },
  {
    type: 'TotalRecovered',
    name: 'Recovered'
  }
];

const Covid19 = (props: Props) => {
  const [typeSort, setTypeSort] = useState('TotalConfirmed');
  const [dataCov19, setDataCov19] = useState({Countries: []});

  const [isShowModal, setIsShowModal] = useState(false);
  const [countryDetail, setCountryDetail] = useState([]);

  useEffect(() => {
    fetch('https://api.covid19api.com/summary')
    .then((response) => response.json())
    .then((data) => setDataCov19(data));
  }, []);

  const handleSortCountry = (countries: any, type: string) => {
    if(countries === undefined) return;
    
    let _countries = [...countries];
    for (let i = 0; i < _countries?.length; i++) {
      for (let j = i + 1; j < _countries?.length; j++) {
        if (_countries?.[j]?.[type] > _countries?.[i]?.[type]) {
          let _temp = _countries?.[i];
          _countries[i] = _countries?.[j];
          _countries[j] = _temp;
        }
      }
    }

    return _countries;
  }

  const handleRenderSort = useMemo(() => {
    return <div className='type-sort'>
      {TYPE_SORT?.map((elm, index) => 
        <div 
          key={index}
          className={`${typeSort === elm?.type ? 'active' : ''}`} 
          onClick={() => {setTypeSort(elm?.type)}}
        >
          {elm?.name}
        </div>
      )}
    </div>
  }, [typeSort]);

  const handleFormatNumber = (input: any) => {
    return input?.toLocaleString();
  }

  const handleShowDetail = (item: any) => {
    fetch(`https://restcountries.com/v3.1/alpha?codes=${item?.CountryCode}`)
    .then((response) => response.json())
    .then((data) => setCountryDetail(data));

    setTimeout(() => {setIsShowModal(true);}, 1000);
  };

  const handleRenderItem = () => {
    const dataRender = handleSortCountry(dataCov19?.Countries || [], typeSort)?.slice(0,11);

    return dataRender?.length === 0 ? 
    <div className='error-img'>
      <Image
        src={ERROR_IMG}
        alt="error"
      />
      <div className='title'>An error occurred, please try again in a few minutes</div>
    </div>
    : dataRender?.map((country, index) => {
      return (
        <div className='item' key={index} 
          onClick={() => {handleShowDetail(country)}}
        >
          <div className='title'><b>Top {++index}:</b> {country?.Country}</div>

          <div className='sub-title'>
            <b>Total Confirmed:</b>
          </div>
          <div>
          {handleFormatNumber(country?.TotalConfirmed)}
          </div>

          <div className='sub-title'><b>Total Deaths:</b></div>
          <div>{handleFormatNumber(country?.TotalDeaths)}</div>

          <div className='last-item sub-title'>
            <b>Total Recovered:</b>
          </div>
          <div className='last-item'>
            {handleFormatNumber(country?.TotalRecovered)}
          </div>
        </div>
      )
    });
  }

  return (
    <section className='bk__cov19'>
      {countryDetail.length !== 0 ? (
        <Modal open={isShowModal} onCancel={() => {return setIsShowModal(false)}}>
          <div className='country-detail'>
            <img
              src={countryDetail?.[0]?.['flags']?.['svg']}
              alt="flag"
            />
            <div className='detail'>
              <div>
                Name: {countryDetail?.[0]?.['name']?.['common']}
              </div>
              <div>
                Official: {countryDetail?.[0]?.['name']?.['official']}
              </div>
              <div>
                Population: {handleFormatNumber(countryDetail?.[0]?.['population'])}
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
      
      <h1>List of countries that are most affected by Covid-19:</h1>

      {handleRenderSort}

      <div className='list-country'>
        {handleRenderItem()}
      </div>
    </section>
  )
}

export default Covid19