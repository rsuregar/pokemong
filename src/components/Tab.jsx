import React, {useState, useEffect} from "react";
import { TYPE } from "../apis/urlApi";
import { fetchData } from "../apis/useApi";


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
                  <p>
                    {species.text}
                  </p>
                    <h5>Color: {species.color}</h5>
                    <h5 className="capitalize">Habitat: {(species.habitat).replace('-', ' ')}</h5>
                    <h5>Base Happiness: {species.happiness}</h5>
                    <h5>Capture Rate: {species.capture_rate}</h5>
                    <h5>Base Experience : {pokemon.base_experience}</h5>
                    <h5>Abilities {pokemon.abilities.map((item, index) => {
                        return(<span className="capitalize bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800" key={index}>{(item.ability.name).replace('-', ' ')}</span>)
                    })}</h5>
                    <h5>Types {pokemon.types.map((item, index) => {
                        return(<span className="capitalize bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800" key={index}>{item.type.name}</span>)
                    })}</h5>

                    <h5>Height : {((pokemon.height) * 3.2808).toFixed(1)} ft ({(pokemon.height)} m )</h5>
                    <h5>Weight : {((pokemon.weight) *2.20462).toFixed(1)} lbs ({pokemon.weight} kg)</h5>
                    
                    <h5>Weakness {weakness.map((item, index) => {
                        return(<span className="capitalize bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800" key={index}>{item.name}</span>)
                    })}</h5>

                    <h5>Strength {strength.map((item, index) => {
                        return(<span className="capitalize bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800" key={index}>{item.name}</span>)
                    })}</h5>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
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
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <h5>{evo.species}</h5>
                  <h5>{evo.chain != null && (
                      <div>
                          <p>Required level {'>'}{evo.chain.evolution_details[0].min_level}</p>
                          <p>{evo.chain.species.name}</p>
                          {evo.chain.evolves_to.length > 0 && (
                              <>
                              <p>Required level {'>'}{evo.chain.evolves_to[0].evolution_details[0].min_level}</p>
                              <p>{evo.chain.evolves_to[0].species.name}</p>
                              {evo.chain.evolves_to[0].evolves_to.length > 0 && (
                                  <>
                                  <p>Required level {'>'}{evo.chain.evolves_to[0].evolution_details[0].min_level}</p>
                                  <p>{evo.chain.evolves_to[0].species.name}</p>
                                  </>
                              )}
                              </>
                          )}
                          
                          
                      </div>
                  )}</h5>
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