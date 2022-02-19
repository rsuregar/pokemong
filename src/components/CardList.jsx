import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { SPECIES } from '../apis/urlApi';
import { fetchData } from '../apis/useApi';


const Cardlist = (pokemonList) => {
    const { id, name } = pokemonList;
    const [species, setSpecies] = useState({});

    useEffect(() => {
        const getPokemonSpecies = async () => {
            await fetchData(`${SPECIES}/${name}`, (data) => {
                const mapObject = (() => ({
                    color: data.color.name,
                    habitat: data.habitat.name,
                    growth_rate: data.growth_rate.name,
                    text: data.flavor_text_entries.filter(x => x.language.name === 'en')[0].flavor_text,
                    happiness: data.base_happiness,
                    capture_rate: data.capture_rate,
                    evolves_from_species: data.evolves_from_species,
                    evolution_chain: data.evolution_chain.url,
                }))
                // console.log(mapObject(data))
                setSpecies(mapObject(data));
                localStorage.setItem('url', data.evolution_chain.url);
            }, (e) => {
              console.log(e);
            });
        };
        getPokemonSpecies();
    }, [name]);
    
    const color = ['blue', 'green', 'red', 'yellow', 'purple', 'orange'];
    return (
        <>
        <Link to={`/${name}`}>
            <div className={`max-w-sm bg-${species.color}-400 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700`} >
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

