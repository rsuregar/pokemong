import React from 'react';
import { Link } from 'react-router-dom';

const Layout =({home, children}) =>{
    return(
        <>
        <div className='md:container md:mx-auto'>

            {!home && (
                <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                    <div className="container flex flex-wrap justify-between items-center mx-auto">
                        <Link to='/' className="flex">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/></svg>
                        <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white ml-3"> Back</span>
                        </Link>
                    </div>
                </nav>
            )}

            <main>{children}</main>
        </div>
        </>
    )
}

export default Layout;