import React from 'react'
import TaskForm from '../../components/TaskForm'
import prisma from '@/utils/prisma'

const EditTask = async ({ params }) => {
    const slug = params.slug
    const taskDetail = await prisma.task.findFirst({
        where: { slug }
    })
    return (
        <div className='flex items-center justify-center my-10'>
            <TaskForm task={taskDetail} isEdit />
        </div>
    )
}

export default EditTask