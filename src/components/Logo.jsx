import React from 'react';
import Loader from 'react-loader-spinner'
import LOAF from './../assets/loaf.svg';

const Logo = () => {
    return (
        <div className={'flex flex-center'}>
            <img src={LOAF} className='logo-loading' />
        </div>
    )
}
export default Logo;