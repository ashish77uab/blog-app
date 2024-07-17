
import prisma from '@/utils/prisma'
import Image from 'next/image'
import React from 'react'
import PlayGameArea from '../components/PlayGameArea'

const PlayGame = async ({ params }) => {
    const gameId = params.gameId
    const games = await prisma.game.findFirst({
        where: { id: gameId },
        include: {
            questions: true,
        },
    })
    console.log(games, 'games')
    return (
        <div className='h-screen w-full'>
            <div className="w-full h-full  absolute top-0 left-0 z-[1]">
                <Image fill src="/images/bg.jpg" alt="kaunbanega" className='' />
            </div>
            <div className="w-full h-full absolute bg-gradient-to-r from-black/40 to-black/100  top-0 left-0 z-[2]">
            </div>
            <PlayGameArea games={games} />
            

        </div>
    )
}

export default PlayGame