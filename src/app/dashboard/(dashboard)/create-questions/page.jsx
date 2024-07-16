
import React from 'react'
import CreateQuestionForm from './components/CreateQuestionForm'
import { getGames } from '@/utils/api/games'

const CreateQuestion = async () => {
    const games = await getGames('games/all-games')
    return (
        <div className='px-4 py-2'>
            <h4 className='text-2xl mb-4 font-semibold'>Create Game</h4>
            <CreateQuestionForm games={games?.games}  />
                
             
        </div>
    )
}

export default CreateQuestion