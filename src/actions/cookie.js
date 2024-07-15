'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const setCookies = (key, value) => {
    cookies().set(key, value)
}
export const getCookies = (key) => {
    cookies().get(key)
}
export const getLoggedIn = () => {
    cookies().get('loggedIn')
}
export const  deleteCookie= (name)=> {
    cookies().delete(name)
    redirect('/login')
}