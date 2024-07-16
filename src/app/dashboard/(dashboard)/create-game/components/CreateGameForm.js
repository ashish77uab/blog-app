'use client'
import TextInput from '@/components/forms/TextInput';
import ToastMsg from '@/components/toast/ToastMsg';
import { createGame } from '@/utils/api/games';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

const CreateGameForm = () => {
    const router = useRouter()
    const handleSubmit = async (values) => {
        try {
            const res = await createGame('games/create-game' , values);
            if (res.status === 201) {
                toast.success(<ToastMsg title={"Created successfully"} />);
            }
            console.log(res)
        } catch (err) {
            console.log(err);
            toast.error(<ToastMsg title={err?.message} />);
        }
    };
    return (

        <>
            <Formik
                initialValues={{
                    gameName: "",
                }}
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

                        <div className="px-4 space-y-2">
                            <div className="">
                                <TextInput
                                    label={"Game Name"}
                                    type="text"
                                    placeholder="Game name"
                                    name="gameName"
                                    value={values.gameName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
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

export default CreateGameForm