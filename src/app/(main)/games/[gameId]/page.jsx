
import React from 'react'

const PlayGame = async ({params}) => {
    const gameId = params.gameId
    const games = await prisma.game.findFirst({
        where: { id: gameId },
        include: {
            questions: true,
        },
    })
    console.log(games,'games here')
    return (
        <div className='px-4 py-2'>
               Play games
             
        </div>
    )
}

export default PlayGame