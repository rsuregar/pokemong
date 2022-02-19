import React, {useState} from "react";

const Tabs = ({ color, data }) => {
  const [openTab, setOpenTab] =useState(1);
  const { species, pokemon } = data;

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
                    <h5>Base Happiness: {species.happiness}</h5>
                    <h5>Capture Rate: {species.capture_rate}</h5>
                    <h5>Base Experience : {pokemon.base_experience}</h5>
                    <h5>Abilities {pokemon.abilities.map((item, index) => {
                        return(<span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800" key={index}>{item.ability.name}</span>)
                    })}</h5>
                    <h5>Types {pokemon.types.map((item, index) => {
                        return(<span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800" key={index}>{item.type.name}</span>)
                    })}</h5>

                    <h5>Height : {((pokemon.height) * 3.2808).toFixed(1)} ft ({(pokemon.height)} m )</h5>
                    <h5>Weight : {((pokemon.weight) *2.20462).toFixed(1)} lbs ({pokemon.weight} kg)</h5>
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
                  <p>
                    Efficiently unleash cross-media information without
                    cross-media value. Quickly maximize timely deliverables for
                    real-time schemas.
                    <br />
                    <br /> Dramatically maintain clicks-and-mortar solutions
                    without functional solutions.
                  </p>
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
  return (
    <>
      <Tabs color="blue" data={props}/>
    </>
  );
}