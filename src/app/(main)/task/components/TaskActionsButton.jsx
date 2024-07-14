'use client'
import ToastMsg from '@/components/toast/ToastMsg';
import { deleteTask, updateTaskStatus } from '@/utils/api/tasks';
import { reactIcons } from '@/utils/icons'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Link from 'next/link'
import SwitchButton from '@/components/forms/SwitchButton';
const TaskActionsButton = ({ task }) => {
    const [checked, setChecked] = useState(task?.isCompleted)
    const handleDeleteTask = async (slug) => {
        try {
            const { status } = await deleteTask({ slug });
            if (status === 201) {
                toast.success(<ToastMsg title={"Deleted successfully"} />);
            }
        } catch (err) {
            console.log(err);
            toast.error(<ToastMsg title={err.message} />);

        }
    };
    const handleUpdateStatus = async (value, slug) => {
        try {
            const { status } = await updateTaskStatus({ slug, status: !task?.isCompleted });
            if (status === 201) {
                toast.success(<ToastMsg title={"Updated successfully"} />);
                setChecked(value)
            }
        } catch (err) {
            console.log(err);
            toast.error(<ToastMsg title={err.message} />);

        }
    };
    return (
        <div className='flex-shrink-0 flex items-center gap-2'>
            <SwitchButton checked={checked} onChange={(value) => {
                handleUpdateStatus(value, task.slug)
                setChecked(value)
            }} />
            <span className='font-semibold'>Mark Completed</span>
            <Link href={`/task/edit-task/${task.slug}`} className='w-10 h-10 rounded-md bg-slate-200 text-xl text-slate-800 flex-center'>{reactIcons.edit}</Link>
            <button onClick={() => handleDeleteTask(task.slug)} className='w-10 h-10 rounded-md bg-red-200 text-red-600 text-xl flex-center'>{reactIcons.trash}</button>

        </div>
    )
}

export default TaskActionsButton