
import React, { useEffect, useState } from 'react';
import { GET_POKEMON } from '../apis/urlApi';
import { fetchData } from '../apis/useApi';
import Cardlist from '../components/CardList';
import Loading from '../components/Loading';

const Home = () => {

    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0);
	  const [limit, setLimit] = useState(350);
    const [loading, setLoading] = useState(true);
  

    const getPokemons = async () => {
        await fetchData(`${GET_POKEMON}?offset=${offset}&limit=${limit}`, (data) => {
            const mapResults = (({ results }) => results.map(({ url, name }) => ({
                url,
                name,
                id: parseInt(url.match(/\/(\d+)\//)[1])
              })))
            setCount(data.count);
            setData(mapResults(data));
            setLoading(false);
        }, (e) => {
          console.log(e);
        });
    }
    
    useEffect(() => {
        getPokemons();
	}, []);


    return(
    <>
    {loading ? <Loading loop={4} /> : (
      <div className='grid xl:grid-cols-4 gap-4 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-2'>
          {data.map(({id, name}) => (<Cardlist key={id} id={id} name={name}/>))}
      </div>
    )}
    </>
    );
};

export default Home;
