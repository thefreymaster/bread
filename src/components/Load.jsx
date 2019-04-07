import React from 'react';
import Loader from 'react-loader-spinner'
import Logo from './Logo';

function Load() {
    const inline = {
        loader: {
            height: window.innerHeight,
            width: window.innerWidth,
        }
    }
    return (
        <div style={inline.loader} className={'flex flex-center flex-column'}>
            <Logo />
            <Loader
                type="Oval"
                color="#000000a6"
                height="80"
                width="80"
            />
        </div>

    )
}
export default Load;