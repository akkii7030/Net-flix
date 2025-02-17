import React from 'react'
import lang from '../utils/language'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang)
    return (
        <div className='pt-20'>
            <form className='flex justify-center items-center space-x-2 '>
                <input type='text' placeholder={lang[langKey].gptSearchPlaceholder} className='border-2 bg-white border-black-600 rounded-lg p-2 text-white-400' />
                <button className='bg-purple-800 rounded-lg text-white py-1 px-4'>{lang[langKey].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar
