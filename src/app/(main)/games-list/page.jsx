
import React from 'react'
import { getGames } from '@/utils/api/games'
import Link from 'next/link'

const CreateGame = async () => {
    const games = await getGames('games/all-games')
    return (
        <div className='px-4 py-2'>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Games List</h2>
                      
                    </div>
                    <ul className='space-y-2 mt-4 min-w-[1000px]'>
                    {games?.games?.map((game,index) => (
                            <li key={game.id} className={` border bg-white shadow-sm border-gray-200 flex items-center gap-4 rounded-md p-8 `}>
                                <div className='flex-grow'>
                                    <h6 className='font-semibold'>
                                       {index+1}. {game.gameName}
                                    </h6>
                                </div>
                                <div>
                                    <Link className='btn-primary' href={`/games/${game.id}`} >Play game</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
             
        </div>
    )
}

export default CreateGame