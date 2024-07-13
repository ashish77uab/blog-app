'use client'
import TextInput from '@/components/forms/TextInput'
import { register } from '@/utils/api/auth'
import { reactIcons } from '@/utils/icons'
import { registerValidation } from '@/utils/validation'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React, { useState } from 'react'

const RegisterForm = () => {
  const [toggle, setToggle] = useState(false)
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
              Register
            </header>
            <div className="px-4 space-y-2">
              <div className="flex items-start gap-4">
                <TextInput
                  label={"First Name"}
                  type="text"
                  placeholder="first name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}

                />
                <TextInput
                  label={"Last Name"}
                  type="text"
                  placeholder="last name"
                  name="lastName"
                  value={values.lastName}
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
              <TextInput
                label={"Password"}
                type={toggle ? "text" : "password"}
                placeholder="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                addonRight={
                  <span
                    onClick={() => setToggle(!toggle)}
                    className="w-8 h-8 ay-center cursor-pointer right-2 flex-center rounded-md hover:bg-white/80 text-lg text-gray-600"
                  >
                    {toggle ? reactIcons.eye : reactIcons.eyeslash}
                  </span>
                }
              />
              <TextInput
                label={"Confirm Password"}
                type={toggle ? "text" : "password"}
                placeholder="confirm password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                addonRight={
                  <span
                    onClick={() => setToggle(!toggle)}
                    className="w-8 h-8 ay-center cursor-pointer right-2 flex-center rounded-md hover:bg-white/80 text-lg text-gray-600"
                  >
                    {toggle ? reactIcons.eye : reactIcons.eyeslash}
                  </span>
                }
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

export default RegisterForm