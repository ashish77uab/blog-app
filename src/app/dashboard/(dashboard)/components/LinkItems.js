import Link from 'next/link'
import React from 'react'

const LinkItems = () => {
    const linkArr = [
        {
            title:'Dashboard',
            path:'/dashboard'
        },
        {
            title:'Create Game',
            path:'/dashboard/create-game'
        },
        {
            title:'Create Questions',
            path:'/dashboard/create-questions'
        },
        {
            title:'Go to games',
            path:'/games-list'
        }
    ]
  return (
    <div className='flex flex-col gap-2 my-4'>
        {
              linkArr?.map((item)=> (
                  <Link className='py-3 px-4 hover:underline bg-white rounded-md font-semibold' key={item?.path} href={item.path}>
                      {item.title}
                  </Link>
              ))
        }
        
    </div>
  )
}

export default LinkItems