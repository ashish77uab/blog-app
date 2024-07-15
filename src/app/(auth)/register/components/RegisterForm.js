'use client'
import SelectField from '@/components/forms/SelectField'
import TextInput from '@/components/forms/TextInput'
import ToastMsg from '@/components/toast/ToastMsg'
import { register } from '@/utils/api/auth'
import { reactIcons } from '@/utils/icons'
import { registerValidation } from '@/utils/validation'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from "react-toastify";
const ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  SUPERADMIN: 'SUPERADMIN',
}
const RegisterForm = () => {
  const router = useRouter()
  const [toggle, setToggle] = useState(false)
  const handleSubmit = async (values) => {
    try {
      const { status } = await register(values);
      if (status === 201) {
        toast.success(<ToastMsg title={"Register successfully"} />);
        router.push('/login')
      }
    } catch (err) {
      console.log(err);
      toast.error(<ToastMsg title={err?.message} />);
    }
  };
  const roleOptions = Object.keys(ROLE)?.map(role => (
    { label: role, value: role }
  ))
  return (

    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: ROLE.USER
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
              <SelectField
              label={'Select Role Of User'}
                options={roleOptions}
                name='role'
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur} />
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