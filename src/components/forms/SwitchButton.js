import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function SwitchButton({ checked, onChange }) {

    return (

        <Switch
            checked={checked}
            onChange={onChange}
            className={`${checked ? 'bg-amber-600' : 'bg-gray-600'}
          relative inline-flex h-[32px] w-[68px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`${checked ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>

    )
}
