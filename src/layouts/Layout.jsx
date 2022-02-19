import React from 'react';

const Layout =({children}) =>{
    return(
        <>
        <div className='md:container md:mx-auto'>
            <main>{children}</main>
        </div>
        </>
    )
}

export default Layout;