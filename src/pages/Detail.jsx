
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { colors } from '../apis/config/helper';
import { GET_POKEMON, SPECIES } from '../apis/urlApi';
import { fetchData } from '../apis/useApi';
import Loading from '../components/Loading';
import TabsRender from '../components/Tab';


const Detail = () => {
    const { name } = useParams()

    const [pokemon, setPokemon] = useState({});
    const [species, setSpecies] = useState({});
    const [loading, setLoading] = useState(true);

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
                localStorage.setItem('url', data.evolution_chain.url);
            }, (e) => {
              console.log(e);
            });
        };
        getPokemonSpecies();
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
    }, [name]);

    return(<>
    
        {loading ? <Loading/> : (
            <>
            
            <div className='flex justify-center mx-auto'>
                <div style={{ backgroundColor:colors[species.color] }} className="max-w-3xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="lg:text-center">
                    <img className="rounded-t-lg" src={pokemon.image} alt={pokemon.name} />
                </div>
                    <div className="p-5">
                            <div style={{ color: species.color == 'white' ? 'black':'' }} className="uppercase tracking-wide text-3xl text-white font-bold">{pokemon.id}</div>
                            <p style={{ color: species.color == 'white' ? 'black':'' }} className="mt-2 text-3xl leading-8 font-extrabold text-white drop-shadow-sm sm:text-4xl capitalize tracking-wide">{pokemon.name}</p>
                            <TabsRender species={species} pokemon={pokemon}/>
                    </div>
                </div>
            </div>
            </>
            
        )}
        </>);
};

export default Detail;
