import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggetions from './GptMovieSuggetions'
import { BG_URL } from '../utils/constent'

const GPTSearch = () => {
    return (
        <div>
            <div
                className="absolute inset-0 bg-cover bg-center -z-20">
                <img src={ BG_URL} alt='bgImage' className='w-full h-full object-cover' />
            </div>
            <GptSearchBar />
            <GptMovieSuggetions />
        </div>
    )
}

export default GPTSearch
