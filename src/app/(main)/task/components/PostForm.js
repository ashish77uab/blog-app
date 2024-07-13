'use client'
import TextInput from '@/components/forms/TextInput'
import { register } from '@/utils/api/auth'
import { reactIcons } from '@/utils/icons'
import { registerValidation } from '@/utils/validation'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React, { useState } from 'react'

const PostForm = () => {
  const handleSubmit = async (values) => {
    try {
      const res = await register(values);
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  };
  return (

    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={registerValidation}
        onSubmit={handleSubmit}
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
              Create Task
            </header>
            <div className="px-4 space-y-2">
              <div className="flex items-start gap-4">
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
                  label={"body"}
                  type="text"
                  placeholder="description"
                  name="body"
                  value={values.body}
                  onChange={handleChange}
                  onBlur={handleBlur}

                />
              </div>
              <TextInput
                label={"Email"}
                type="email"
                placeholder="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}

              />

              <div>
                <p className="text-muted">
                  Already have an account?{" "}
                  <Link className="ml-2 text-blue-500 underline" href="/login">
                    Login
                  </Link>
                </p>{" "}
              </div>
            </div>
            <footer className="py-4 text-center font-medium">
              <button type="submit" className="btn-green">
                {isSubmitting ? 'Loading...' : 'Register'}
              </button>
            </footer>
          </Form>
        )}
      </Formik >
    </>
  )
}

export default PostForm