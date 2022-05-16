import React, { useEffect, useState } from 'react';
import { GET_POKEMON } from '../apis/urlApi';
import { fetchData } from '../apis/useApi';
import Cardlist from '../components/CardList';
import Loading from '../components/Loading';
import { useOnlineStatus } from '../utils/NetworkStatusProvider';
import Toast from '../components/Toast';
import InfiniteScroll from 'react-infinite-scroll-component';

const LIMIT = 8;

const HomeWithInfinityScrollLib = () => {
    const [pokemon, setPokemon] = useState([]);
    const [count, setCount] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const isOnline = useOnlineStatus();

    const getPokemons = async () => {
        await fetchData(`${GET_POKEMON}?offset=${offset}&limit=${LIMIT}`, (data) => {
            const mapResults = (({ results }) => results.map(({ url, name }) => ({
                url,
                name,
                id: parseInt(url.match(/\/(\d+)\//)[1])
              })))
            setCount(data.count);
            setPokemon(mapResults(data));
            setOffset(offset + 10);
        }, (e) => {
          console.log(e);
        });
    }

    useEffect(() => {
        getPokemons();
    }, []);


    const fetchMoreData = async () => {
      await fetchData(`${GET_POKEMON}?offset=${offset}&limit=${LIMIT}`, (data) => {
        const mapResults = (({ results }) => results.map(({ url, name }) => ({
            url,
            name,
            id: parseInt(url.match(/\/(\d+)\//)[1])
          })));
        
          setPokemon([...pokemon, ...mapResults(data)]);
          if (mapResults(data).length === 0) {
            setHasMore(false);
          }
          setOffset(offset + 10);
        console.log(offset);
    }, (e) => {
      console.log(e);
    });
    }


    return (
        <>
        {isOnline ? "" : <Toast status="offline" text=""/>}
        <InfiniteScroll
            dataLength={pokemon.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loading loop={4} />}
            endMessage={<div className='text-center text-lg text-red-500'>No more pokemon</div>}
        >
             <div>
          <span className="mb-2 text-2xl font-bold inline-block py-1 px-2 rounded-full text-pink-600 bg-pink-200">
            Pokedex ({count})
          </span>
        </div>
        <div className='grid xl:grid-cols-4 gap-4 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-2'>
          {pokemon.map(({id, name}) => (<Cardlist key={id} id={id} name={name}/>))}
        </div>
        </InfiniteScroll>
        </>
    );


};

export default HomeWithInfinityScrollLib;