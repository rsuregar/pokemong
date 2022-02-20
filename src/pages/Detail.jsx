
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { colors, types } from '../config/helper';
import { GET_POKEMON, SPECIES } from '../apis/urlApi';
import { fetchData } from '../apis/useApi';
import Loading from '../components/Loading';
import TabsRender from '../components/Tab';
import { useOnlineStatus } from '../utils/NetworkStatusProvider';
import Toast from '../components/Toast';




const Detail = () => {
    const { name } = useParams()

    const [pokemon, setPokemon] = useState({});
    const [species, setSpecies] = useState({});
    const [loading, setLoading] = useState(true);
    const isOnline = useOnlineStatus();


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
                console.log(mapObject(data))
                setSpecies(mapObject(data));
            }, (e) => {
              console.log(e);
            });
        };
        getPokemonSpecies();
        localStorage.setItem('species', JSON.stringify(species));
    }, [name]);

    const getPokemon = async () => {
        await fetchData(`${GET_POKEMON}/${name}`, (data) => {   
            const mapObject = (({ id, name, types, base_experience, height, weight, abilities, stats }) => ({ 
                base_experience,
                id: `#${'000'.substr(id.toString().length)}${id}`,
                name,
                abilities,
                height: height/10,
                weight: weight/10,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                types,
                stats
            })) 
                // console.log(data)
            setPokemon(mapObject(data));
            
            setLoading(false);
        }, (e) => {
          console.log(e);
        });
    }

    useEffect(() => {
        getPokemon();
        localStorage.setItem('pokemons', JSON.stringify(pokemon));
    }, [name]);

    return(<>
        
        {isOnline ? "" : <Toast status="offline" text=""/>}
    
        {loading ? <Loading/> : (
            <>
            
            <div className='flex justify-center mx-auto'>
                <div style={{ backgroundColor:colors[species.color] }} className="max-w-3xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="container flex py-5 ml-5 flex-wrap justify-between items-center mx-auto">
                        <Link to='/' className="flex">
                        <svg fill="#FFFFFF" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/></svg>
                        <span className="self-center text-lg font-semibold text-white whitespace-nowrap dark:text-white ml-3"> Back</span>
                        </Link>
                </div>
                <div className="lg:text-center">
                    <img className="rounded-t-lg" src={pokemon.image} alt={pokemon.name} />
                </div>
                    <div className="p-5">
                            <div style={{ color: species.color == 'white' ? 'black':'' }} className="uppercase tracking-wide text-3xl text-white font-bold">{pokemon.id}</div>
                            <p style={{ color: species.color == 'white' ? 'black':'' }} className=" mb-2 text-3xl leading-8 font-extrabold text-white drop-shadow-sm sm:text-4xl capitalize tracking-wide">{pokemon.name} </p>
                            {pokemon.types.map((item, index) => {
                        return(<span style={{ backgroundColor:types[item.type.name] }} className="capitalize text-white text-xs font-semibold mr-2 px-2.5 py-2 rounded" key={index}>{item.type.name}</span>)
                    })}
                            <TabsRender species={species} pokemon={pokemon}/>
                    </div>
                </div>
            </div>
            </>
            
        )}
        </>);
};

export default Detail;
