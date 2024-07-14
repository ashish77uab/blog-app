'use client'
import TextInput from '@/components/forms/TextInput'
import { taskValidation } from '@/utils/validation'
import { Form, Formik } from 'formik'
import React from 'react'
import { createTasks, updateTasks } from '@/utils/api/tasks'
import ToastMsg from '@/components/toast/ToastMsg'
import { toast } from 'react-toastify'
const TaskForm = ({ task, isEdit }) => {
  const handleSubmit = async (values, actions) => {
    try {
      const { status } = await createTasks(values);
      if (status === 201) {
        toast.success(<ToastMsg title={"Created successfully"} />);
        actions.resetForm();

      }
    } catch (err) {
      console.log(err);
      toast.error(<ToastMsg title={err.message} />);

    }
  };
  const handleUpdate = async (values, actions) => {
    try {
      const { status } = await updateTasks(values);
      if (status === 201) {
        toast.success(<ToastMsg title={"Updated successfully"} />);
        // actions.resetForm();

      }
    } catch (err) {
      console.log(err);
      toast.error(<ToastMsg title={err.message} />);

    }
  };
  return (

    <>
      <Formik
        initialValues={{
          title: isEdit ? task?.title : "",
          body: isEdit ? task?.body : "",
          slug: isEdit ? task?.slug : "",
          isCompleted: isEdit ? task?.isCompleted : false
        }}
        validationSchema={taskValidation}
        onSubmit={isEdit ? handleUpdate : handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          isSubmitting

        }) => (
          <Form
            className="max-w-md min-w-[450px] w-full  bg-white rounded-lg space-y-2 py-6 shadow-lg"
          >
            <header className="py-4 text-center text-3xl font-bold">
              {isEdit ? 'Update' : 'Create'} Task
            </header>
            <div className="px-4 space-y-2">
              <TextInput
                label={"Title"}
                type="text"
                placeholder="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}

              />
              <TextInput
                label={"Description"}
                type="text"
                placeholder="description"
                name="body"
                value={values.body}
                onChange={handleChange}
                onBlur={handleBlur}

              />
            </div>
            <footer className="py-4 text-center font-medium">
              <button type="submit" className="btn-green">
                {isSubmitting ? 'Loading...' : isEdit ? 'Update' : 'Create'}
              </button>
            </footer>
          </Form>
        )}
      </Formik >
    </>
  )
}

export default TaskForm