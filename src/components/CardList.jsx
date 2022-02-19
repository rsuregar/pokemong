import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { SPECIES } from '../apis/urlApi';
import { fetchData } from '../apis/useApi';


const Cardlist = (pokemonList) => {
    const { id, name } = pokemonList;
    const [color, setColor] = useState({});

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
    
    

    return (
        <>
        <Link to={`/${name}`}>
            <div className={`max-w-sm bg-${color.color}-400 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700`} style={{ backgroundColor:color.color }}>
                <img className="rounded-t-lg py-3" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt={name}/>
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">{name}</h5>
                </div>
            </div>
        </Link>
        </>
    );

};

export default Cardlist;

