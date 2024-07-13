
import { getUsersList } from '@/utils/api/users'
import React from 'react'

const UsersDashboardPage = async () => {
    const res = await getUsersList()
    console.log(res, 'res')
    return (
        <div className='flex flex-col gap-1'>
             

        </div>
    )
}

export default UsersDashboardPage