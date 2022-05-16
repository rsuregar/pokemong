import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { colors, types } from '../config/helper';
import { GET_POKEMON, SPECIES } from '../apis/urlApi';
import { fetchData } from '../apis/useApi';


const Cardlist = (pokemonList) => {
    const { id, name } = pokemonList;
    const [colour, setColor] = useState({});
    const [type, setType] = useState([]);
    

    useEffect(() => {
        const getColor = async () => {
            await fetchData(`${SPECIES}/${name}`, (data) => {
                const mapObject = (() => ({
                    color: data.color.name
                }))
                setColor(mapObject(data));
            }, (e) => {
              console.log(e);
            });
        };
        getColor();
    }, [name]);
    
    useEffect(() => {
        const getType = async () => {
            await fetchData(`${GET_POKEMON}/${name}`, (data) => {
                const mapObject = (() => (data.types.map(x => x.type.name)))
                setType(mapObject(data));
                // console.log(mapObject(data))
            }, (e) => {
              console.log(e);
            });
        };
        getType();
    }, [name]);

    return (
        <>
        <Link to={`/${name}`}>
            <div className={`max-w-sm rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700`} style={{ backgroundColor:colors[colour.color] }}>
                <img className="rounded-t-lg py-3 grayscale hover:grayscale-0" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt={name}/>
                <div className="p-5">
              
                    <h5 style={{color:colour.color === 'white' ? '#708090':''}} className="mb-2 text-2xl font-bold tracking-wide text-white drop-shadow-md dark:text-white capitalize">{name}</h5>
                    {type.map((item, index) => {
                        return(<span style={{ backgroundColor:types[item] }} className="capitalize text-white text-xs font-semibold mr-2 px-2.5 py-2 rounded" key={index}>{item}</span>)
                    })}
                </div>
            </div>
        </Link>
        </>
    );

};

export default Cardlist;

