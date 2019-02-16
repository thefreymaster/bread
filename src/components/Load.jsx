import React from 'react';
import Loader from 'react-loader-spinner'

function Load() {
    const inline = {
        loader: {
            height: window.innerHeight,
            width: window.innerWidth,
        }
    }
    return (
        <div style={inline.loader} className={'flex flex-center'}>
            <Loader
                type="Bars"
                color="#000000a6"
                height="30"
                width="30"
            />
        </div>

    )
}
export default Load;