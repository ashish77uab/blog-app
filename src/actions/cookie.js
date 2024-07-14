'use server'

import { cookies } from 'next/headers'

export const setCookies = (key, value) => {
    cookies().set(key, value)
}
export const getCookies = (key) => {
    cookies().get(key)
}
export const getLoggedIn = () => {
    cookies().get('loggedIn')
}