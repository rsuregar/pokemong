import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Cardlist = (pokemonList) => {
    const { id, name } = pokemonList;
    return (
        <>
        <Link to={`/${name}`}>
            <div className="flex flex-wrap justify-center">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}/>
            <div className='text-blue-300' key={id}>
                {name}
            </div>
            </div>
        </Link>
        </>
    );

};

export default Cardlist;

