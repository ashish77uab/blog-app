
import { getUsersList } from '@/utils/api/users'
import React from 'react'

const UsersDashboardPage = async () => {
    const users = await getUsersList()
    return (
        <div className='px-4 py-2'>
            <h4 className='text-2xl mb-4 font-semibold'>Users</h4>
            <table>
                <thead>
                    <th>
                        Sr.No
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Email
                    </th>
                </thead>
                <tbody>
                    {users?.data?.map((user,index) => (
                        <tr key={user.id}>
                            <td>
                                {index+1}
                            </td>
                            <td>
                                {user.fullName}
                            </td>
                            <td>
                                {user.email}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
             

        </div>
    )
}

export default UsersDashboardPage