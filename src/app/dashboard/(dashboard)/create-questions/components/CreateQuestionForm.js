'use client'
import SelectField from '@/components/forms/SelectField';
import TextInput from '@/components/forms/TextInput';
import ToastMsg from '@/components/toast/ToastMsg';
import { createQuestions } from '@/utils/api/games';
import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';
const levelOptions = Array(20).fill(2).map((item, index) => (
    { label: `Level ${index + 1}`, value: index + 1 }
))
const answerOptions = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
]
const CreateQuestionForm = ({ games }) => {
    const router = useRouter()
    const handleSubmit = async (values) => {
        try {
            const formData= values.questions.map((question) => {
                    return {
                        questionName: question.questionName,
                        options: [question.option1,question.option2,question.option3,question.option4],
                        correctAnswer: question.correctAnswer,
                        level: Number(question.level),
                        gameId:values.gameId
                    }
                })
            
            
            const res = await createQuestions('games/create-questions', formData);
            if (res.status === 201) {
                toast.success(<ToastMsg title={"Created successfully"} />);
            }
            console.log(res)
        } catch (err) {
            console.log(err);
            toast.error(<ToastMsg title={err?.message} />);
        }
    };
    const gameOptions = games?.map((item) => (
        { label: item.gameName, value: item.id }
    ))
    
    return (

        <>
            <Formik
                initialValues={{
                    gameId: '',
                    questions: [{
                        questionName: "",
                        option1: '',
                        option2: '',
                        option3: '',
                        option4: '',
                        correctAnswer: '',
                        level: '',
                    }
                    ]

                }}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    isSubmitting

                }) => {
                    console.log(values,'values')
                    return (
                    <Form
                        className="w-full  bg-white rounded-lg space-y-2 py-6 shadow-lg"
                    >

                        <div className="px-4 space-y-2">

                            <SelectField
                              firstOption={ { label: 'Select Game', value: '' }}
                                label={'Select game'}
                                options={gameOptions}
                                name='gameId'
                                value={values.gameId}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <FieldArray
                                name="questions"
                                render={arrayHelpers => (
                                    <div className='flex flex-col gap-2  my-4'>
                                        <div className='flex flex-col gap-2 flex-grow'>
                                            {values.questions.map((question, index) => (
                                                <div key={index} className='space-y-2 my-4'>
                                                    <TextInput
                                                        label={"Question"}
                                                        type="text"
                                                        placeholder="Write Question"
                                                        name={`questions[${index}].questionName`}
                                                        value={question.questionName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <TextInput
                                                        label={"Option 1"}
                                                        type="text"
                                                        placeholder="Option 1"
                                                        name={`questions[${index}].option1`}
                                                        value={question.option1}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <TextInput
                                                        label={"Option 2"}
                                                        type="text"
                                                        placeholder="Option 2"
                                                        name={`questions[${index}].option2`}
                                                        value={question.option2}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <TextInput
                                                        label={"Option 3"}
                                                        type="text"
                                                        placeholder="Option 3"
                                                        name={`questions[${index}].option3`}
                                                        value={question.option3}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <TextInput
                                                        label={"Option 4"}
                                                        type="text"
                                                        placeholder="Option 4"
                                                        name={`questions[${index}].option4`}
                                                        value={question.option4}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <SelectField
                                                        label={'Select Answer'}
                                                        options={answerOptions}
                                                        name={`questions[${index}].correctAnswer`}
                                                        value={question.correctAnswer}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <SelectField
                                                       firstOption={ { label: 'Select Answer', value: '' }}
                                                        label={'Select Level'}
                                                        options={levelOptions}
                                                        name={`questions[${index}].level`}
                                                        value={question.level}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />

                                                    <div className="flex gap-2">
                                                        <button className='btn-primary' type="button" onClick={() => arrayHelpers.remove(index)}>
                                                            Remove Question
                                                        </button>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className='btn-primary'
                                            onClick={() => arrayHelpers.push({
                                                questionName: "",
                                                option1: '',
                                                option2: '',
                                                option3: '',
                                                option4: '',
                                                correctAnswer: '',
                                                level: '',
                                            })}
                                        >
                                            Add More Question
                                        </button>

                                    </div>
                                )}
                            />


                        </div>
                        <footer className="py-4 text-center font-medium">
                            <button type="submit" className="btn-green">
                                {isSubmitting ? 'Loading...' : 'Submit'}
                            </button>
                        </footer>
                    </Form>
                )}}
            </Formik >
        </>
    )
}

export default CreateQuestionForm