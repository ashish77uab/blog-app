import React from 'react'
import { twMerge } from 'tailwind-merge'
const Option = ({
  animate,
  option,
  index,
  isCorrect,
  isWrong,
  answer,
  correctAnswer,
  handleAnswer,
}) => {
  const answerIndex = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D'
  }
  const normalClass = `min-h-[50px] cursor-pointer font-semibold text-center  flex justify-center text-sm min-w-[350px] option   py-4 px-8 items-center gap-2  bg-indigo-900`

  return (
    <div className='relative flex-center'>
      <div onClick={() => handleAnswer(correctAnswer, answerIndex[index])} key={option} className={
        twMerge(
          normalClass,
          answer === answerIndex[index] && 'bg-yellow-500 text-black',
          isCorrect && answer === answerIndex[index] && 'bg-green-900 text-white',
          isWrong && answer === answerIndex[index] && 'bg-red-900 text-white',
          animate && isCorrect && answer === answerIndex[index] && 'animate-correct',
          animate && isWrong && answer === answerIndex[index] && 'animate-wrong',
        )}
      >
        {answerIndex[index]}. {option}
      </div>
    </div>
  )
}

export default Option