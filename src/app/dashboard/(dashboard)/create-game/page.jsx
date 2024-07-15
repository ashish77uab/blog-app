
import React from 'react'
import CreateGameForm from './components/CreateGameForm'

const CreateGame = async () => {
    return (
        <div className='px-4 py-2'>
            <h4 className='text-2xl mb-4 font-semibold'>Create Game</h4>
            <CreateGameForm/>
             
        </div>
    )
}

export default CreateGame