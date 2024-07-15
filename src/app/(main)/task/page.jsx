import React from 'react'
import prisma from '@/utils/prisma'
import TaskActionsButton from './components/TaskActionsButton'
import Link from 'next/link'
export const dynamic = 'force-dynamic'
const Task = async () => {
  const tasks = await prisma.task.findMany()
  return (
    <div className='container'>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <Link href={'/task/create-task'} className='btn-primary'>Create Task</Link>
        </div>
        <ul className='space-y-2 mt-4'>
          {tasks.map(task => (
            <li key={task.id} className={` border bg-white border-slate-400 flex items-center gap-4 rounded-xl p-4 `}>
              <div className='flex-grow'>
                <h6 className='font-semibold'>
                  {task.title}
                </h6>
                <div className='opacity-75'>{task.body}</div>
              </div>
              <TaskActionsButton task={task} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Task