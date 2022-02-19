import React from 'react';
import { Link } from 'react-router-dom';
import { imgUrl } from '../apis/useApi';


const EvolutionCard = (props) => {
    const { id, name, level } = props;
    return (
        <>
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/${name}`}>
                <img className="h-48" src={`${imgUrl(id)}`} alt={name} />
            </Link>
            <div className="p-5 text-center">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">{name}</h5>
                {level !=null && (
                    <>
                    <span className="inline-flex items-center py-2 px-3 text-sm font-medium text-center bg-blue-200 rounded-lg text-blue-600">
                    Level ({level})
                    <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </span>
                    </>
                )}
                
            </div>
        </div>
        </>
    );
}

export default EvolutionCard;