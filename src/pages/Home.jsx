import React, { useEffect, useState } from 'react';
import { GET_POKEMON } from '../apis/urlApi';
import { fetchData } from '../apis/useApi';
import Cardlist from '../components/CardList';
import Loading from '../components/Loading';
import axios from 'axios';



const Home = () => {

    let offset = 0;
    const [pokemon, setPokemon] = useState([]);
    const [count, setCount] = useState(0);
	  const [limit, setLimit] = useState(8);
    const [loading, setLoading] = useState(true);


    // const getPokemons = async () => {
    //     const limitPokemon = [];
    //     await fetchData(`${GET_POKEMON}?offset=${offset}&limit=${limit}`, (data) => {
    //         const mapResults = (({ results }) => results.map(({ url, name }) => ({
    //             url,
    //             name,
    //             id: parseInt(url.match(/\/(\d+)\//)[1])
    //           })))
    //         setCount(data.count);
    //         setData((data) => [...data, ...mapResults(data)]);
    //         setLoading(false);
    //     }, (e) => {
    //       console.log(e);
    //     });
    // }

    const getPokemons = () => {
        const limitPokemon = [];
        axios.get(`${GET_POKEMON}?offset=${offset}&limit=${limit}`)
        .then(({ data }) => {
          data.results.forEach((p) => limitPokemon.push({
            url: p.url,
            name: p.name,
            id: parseInt(p.url.match(/\/(\d+)\//)[1])
          }));
          setPokemon((pokemon) => [...pokemon, ...limitPokemon]);
          setCount(data.count);
        });
        setLoading(false);
        offset += 10;

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
