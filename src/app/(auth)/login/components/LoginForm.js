'use client'
import TextInput from '@/components/forms/TextInput'
import { login } from '@/utils/api/auth'
import { reactIcons } from '@/utils/icons'
import { loginValidation } from '@/utils/validation'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import ToastMsg from '@/components/toast/ToastMsg'
import { setCookies } from '@/actions/cookie'
const LoginForm = () => {
  const router = useRouter()
  const [toggle, setToggle] = useState(false)
  const handleSubmit = async (values) => {
    try {
      const { status } = await login(values);
      if (status === 201) {
        toast.success(<ToastMsg title={"Login successfully"} />);
        setCookies('loggedIn', true)
        router.push('/')
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (

    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginValidation}
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
              Login
            </header>
            <div className="px-4 space-y-2">
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

              <div>
                <div className="text-muted">
                  <Link
                    href="/forgot-password"
                    className="ml-2 text-blue-500 underline"
                  >
                    Forgot Password
                  </Link>
                </div>{" "}
              </div>
              <div className="text-center">
                <p className="text-muted">
                  Don't have an account?{" "}
                  <Link className="ml-2 text-blue-500 underline" href="/register">
                    Register
                  </Link>
                </p>{" "}
              </div>
            </div>
            <footer className="py-4 text-center font-medium">
              <button
                type="submit"
                className="px-12 py-2 rounded-md bg-green-500 text-white"
              >
                {isSubmitting ? "Loading..." : "Login"}
              </button>
            </footer>
          </Form>
        )}
      </Formik >
    </>
  )
}

export default LoginForm