import React, { useEffect, useState } from 'react';
import { GET_POKEMON } from '../apis/urlApi';
import { fetchData } from '../apis/useApi';
import Cardlist from '../components/CardList';
import Loading from '../components/Loading';
import { useOnlineStatus } from '../utils/NetworkStatusProvider';
import Toast from '../components/Toast';



const Home = () => {

    let offset = 0;
    const [pokemon, setPokemon] = useState([]);
    const [count, setCount] = useState(0);
	  const [limit, setLimit] = useState(8);
    const [loading, setLoading] = useState(true);
    const isOnline = useOnlineStatus();


    const getPokemons = async () => {
        await fetchData(`${GET_POKEMON}?offset=${offset}&limit=${limit}`, (data) => {
            const mapResults = (({ results }) => results.map(({ url, name }) => ({
                url,
                name,
                id: parseInt(url.match(/\/(\d+)\//)[1])
              })))
            setCount(data.count);
            setPokemon((pokemon) => [...pokemon, ...mapResults(data)]);
            setLoading(false);
            offset += 10;
        }, (e) => {
          console.log(e);
        });
    }

    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = Math.ceil(
        e.target.documentElement.scrollTop + window.innerHeight
      );
      if (currentHeight + 1 >= scrollHeight) {
        getPokemons();
      }
    };
    
    useEffect(() => {
        getPokemons();
        window.addEventListener("scroll", handleScroll);
	}, []);

    return(
    <>
    {isOnline ? "" : <Toast status="offline" text=""/>}
    {loading ? <Loading loop={4} /> : (
        <>
        <div>
          <span className="mb-2 text-2xl font-bold inline-block py-1 px-2 rounded-full text-pink-600 bg-pink-200">
            Pokedex ({count})
          </span>
        </div>
        <div className='grid xl:grid-cols-4 gap-4 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-2'>
          {pokemon.map(({id, name}) => (<Cardlist key={id} id={id} name={name}/>))}
        </div>
      </>
    )}
    </>
    );
};

export default Home;
