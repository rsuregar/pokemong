import React, {useState, useEffect} from "react";
import { colors } from "../config/helper";
import { TYPE } from "../apis/urlApi";
import { fetchData } from "../apis/useApi";
import EvolutionCard from "./EvolutionCard";



const Tabs = ({ color, data, evo, weakness, strength}) => {
  const [openTab, setOpenTab] =useState(1);
  const { species, pokemon } = data;
  
//   console.table(props);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                About
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                 Stats
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                 Evolution
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <div className="py-12 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="lg:text-center">
                            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Habitats in {species.habitat}</h2>
                            {/* <p className="mt-2 text-3xl leading-8 font-extrabold text-gray-900 sm:text-4xl capitalize tracking-wide">{pokemon.name}</p> */}
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">{species.text}</p>
                            </div>

                            <div className="mt-10">
                            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                                <div className="relative">
                                <dt>
                                    
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Base Stats</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                        Base Happiness : {species.happiness}<br/>
                                        Capture Rate : {species.capture_rate}<br/>
                                        Base Exp : {pokemon.base_experience}<br/>
                                        Height : {((pokemon.height) * 3.2808).toFixed(1)} ft ({(pokemon.height)} m )<br/>
                                        Weight : {((pokemon.weight) *2.20462).toFixed(1)} lbs ({pokemon.weight} kg)<br/>
                                </dd>
                                </div>
                                <div className="relative">
                                
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                <h5>Abilities <br/>{pokemon.abilities.map((item, index) => {
                                                return(<span className="capitalize bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800" key={index}>{(item.ability.name).replace('-', ' ')}</span>)
                                            })}</h5>
                                <h5 className="mt-2">Types <br/>{pokemon.types.map((item, index) => {
                                    return(<span className="capitalize bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800" key={index}>{item.type.name}</span>)
                                })}</h5>
                                </dd>
                                </div>
                            </dl>
                            </div>
                        </div>
                    </div>


                  
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <div className="lg:text-center">
                <span className="text-transparent">{species.text}</span>
                </div>
                    <div className='grid xl:grid-cols-2 gap-5 -mt-10'>
                        <div className='flex flex-col'>
                        {pokemon.stats.map(({stat, base_stat}) => (
                        <>
                            <div key={stat.name}>
                                <div className="flex justify-between mb-1">
                                    <span className={`text-base font-medium text-gray-700 dark:text-white capitalize`}>{(stat.name).replace('-', ' ')}</span>
                                    <span className={`text-sm font-medium text-gray-700 dark:text-white`}>{base_stat}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3.5 mb-3 dark:bg-gray-700">
                                    <div className={`bg-blue-600 h-3.5 rounded-full`} style={{ width: base_stat + '%' }}></div>
                                </div>
                            </div>
                        </>
                        ))}
                        </div>
                        <div className='flex flex-col'>
                            <h5 className="text-lg font-bold mb-3 text-gray-700">Weakness 
                                {weakness.map((item, index) => {
                                    return(<p className="capitalize mb-2 mt-3 bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-800" key={index}>{item.name}</p>)
                                })}
                            </h5>

                            <h5 className="text-lg font-bold mb-3 text-gray-700">Strength 
                                {strength.map((item, index) => {
                                    return(<p className="capitalize mb-2 mt-3 bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800" key={index}>{item.name}</p>)
                                })}
                            </h5>
                        </div>
                    </div>
                    
                </div>
                <div className={(openTab === 3 ? "block" : "hidden")} id="link3">
                <div className="lg:text-center">
                <span className="text-transparent">{species.text}</span>
                </div>
                <div className='grid xl:grid-cols-3 gap-4 -mt-10'>
                    
                    <EvolutionCard 
                    color={pokemon.name === evo.species ? colors['slate']:"" }
                    id={evo.url} 
                    name={evo.species}
                    level={evo.chain != null && evo.chain.evolution_details[0].min_level}
                    />
                    {evo.chain != null && (
                        <>
                            <EvolutionCard 
                            color={pokemon.name === evo.chain.species.name ? colors['slate']:"" }
                                id={parseInt(evo.chain.species.url.match(/\/(\d+)\//)[1])} 
                                name={evo.chain.species.name}
                                level={evo.chain.evolves_to.length > 0 && evo.chain.evolves_to[0].evolution_details[0].min_level}
                            />
                            {evo.chain.evolves_to.length > 0 && (
                                <>
                                 <EvolutionCard 
                                    color={pokemon.name === evo.chain.evolves_to[0].species.name ? colors['slate']:"" }
                                    id={parseInt(evo.chain.evolves_to[0].species.url.match(/\/(\d+)\//)[1])} 
                                    name={evo.chain.evolves_to[0].species.name}
                                    level={null}
                                />
                                </>
                            )}
                        </>
                    )}
                    
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function TabsRender(props) {
    // console.log(props)
    const { species, pokemon } = props;
    const [evolutionChain, setEvolutionChain] = useState({});
    const [weakness, setWeakness] = useState([]);
    const [strength, setStrength] = useState([]);

    useEffect(() => {
    //    console.log(pokemon.types[0].type.name)
        const getWeaknesses = async () => {
            await fetchData(`${TYPE}/${pokemon.types[0].type.name}`, (data) => {
                setWeakness(data.damage_relations.double_damage_from);
            }, (e) => {
            console.log(e);
            });
        };
        getWeaknesses();

        const strength = async () => {
            await fetchData(`${TYPE}/${pokemon.types[0].type.name}`, (data) => {
                setStrength(data.damage_relations.double_damage_to);
            }, (e) => {
            console.log(e);
            });
        };
        strength();

    }, [pokemon.types[0].type.name]);

    useEffect(() => {
        // console.log(species.evolution_chain)  
        const getEvolution = async () => {
            await fetchData(`${species.evolution_chain}`, (data) => {
                const mapObject = (() => ({
                    chain: data.chain.evolves_to[0],
                    species: data.chain.species.name,
                    url: parseInt(data.chain.species.url.match(/\/(\d+)\//)[1])
                }))
            // console.log(mapObject(data))
            setEvolutionChain(mapObject(data));
            }, (e) => {
            console.log(e);
            });
        };
        getEvolution();
    }, [species.evolution_chain]);
  return (
    <>
      <Tabs color="blue" data={props} evo={evolutionChain} weakness={weakness} strength={strength}/>
    </>
  );
}