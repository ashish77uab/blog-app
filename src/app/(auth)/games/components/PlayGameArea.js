'use client'
import { formatNumber } from '@/utils/helpers';
import React, { useEffect, useRef, useState } from 'react'
import Option from './Option';
import useSound from "use-sound";

const priceArray = [
    "1000",
    "5000",
    "10000",
    "25000",
    "100000",
    "500000",
    "2500000",
    "5000000",
    "10000000",
    "70000000",
]
export const LIFELINES = {
    FIFTY_FIFTY: '50-50',
    FLIP: 'Flip',
    PHONE_A_FRIEND: 'Phone A Friend',
    AUDIENCE_POLL: 'Audience Poll'
};
const PlayGameArea = ({ games }) => {
    let intervalId;
    const [lifeline, setLifeline] = useState(null);
    const [completedLifelines, setCompletedLifelines] = useState([]);
    const [isContinue, setIsContinue] = useState(false);

    const handleLifeline = (type) => {
        setLifeline(type);
        if (type===LIFELINES.PHONE_A_FRIEND){
            clearInterval(intervalId);
            setTimer(timer)
            setIsContinue(true)
        }
      
    };
    const [earned, setEarned] = useState(0)
    const [letsPlaySound] = useSound('/play.mp3');
    const [correctAnswerSound] = useSound('/correct.mp3');
    const [wrongAnswerSound] = useSound('/wrong.mp3');
    const [animate, setAnimate] = useState(false)
    const [stopGame, setStopGame] = useState(false)
    const [answer, setAnswer] = useState('')
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false)
    const [isWrong, setIsWrong] = useState(false)
    const [timer, setTimer] = useState(1000);
    useEffect(() => {
        letsPlaySound()
    }, [letsPlaySound, games])
    const handleAnswer = (correctAnswer, answer) => {
        setAnswer(answer)
        setAnimate(true)
        setTimeout(() => {
            if (answer === correctAnswer) {
                setIsCorrect(true)
                setCompletedLifelines(prev => [...prev, lifeline])
            } else {
                setIsWrong(true)
            }

        }, 3000)
        setTimeout(() => {
            if (answer === correctAnswer) {
                correctAnswerSound()
                setTimeout(() => {
                    if (currentQuestion < priceArray?.length - 1) {
                        setCurrentQuestion(prev => prev + 1)
                        setAnimate(false)
                        setAnswer('')
                        setIsCorrect(false)
                        setIsWrong(false)
                        setLifeline(null)
                    } else {
                        setAnimate(false)
                        setAnswer('')
                        setIsCorrect(false)
                        setIsWrong(false)
                        setStopGame(true)
                        setLifeline(null)
                    }
                }, 2000);

            } else {
                wrongAnswerSound()
                setTimeout(() => {
                    setStopGame(true)

                }, 2000);
            }

        }, 6000)

    }

    useEffect(() => {
        if (currentQuestion > 0) {
            setEarned(priceArray[currentQuestion - 1]);
        }
    }, [currentQuestion, priceArray]);
    useEffect(() => {
        if (answer) {
            setEarned(priceArray[currentQuestion - 1]);
              clearInterval(intervalId);
              setTimer(timer)
        }
    }, [answer]);


    useEffect(() => {
        if (timer === 0) return setStopGame(true);
        intervalId = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timer, setStopGame]);

    useEffect(() => {
        setTimer(1000);
    }, [currentQuestion]);
    const flipQuestion =
    {
        questionName: 'What is the default port for a React application started with create-react-app?',
        options: [
            '3000',
            '8080',
            '5000',
            '8000'
        ],
        correctAnswer: 'A',
        level: 1,
        isFlipQuestion: false
    }
    const questions = [...games?.questions]
    if(lifeline===LIFELINES.FLIP){
        questions[currentQuestion] = flipQuestion
    }
    const currentQuestionData = questions[currentQuestion]


    return (
        <>
            {stopGame ?
                <div className='relative font-medium  z-[10] flex text-xl justify-center items-center gap-4 text-white h-full w-full '>
                    You won: <span className='font-semibold text-2xl'>Rs. {formatNumber(earned)}</span>
                </div> :
                <div className="relative  z-[10] flex items-center gap-4 text-white h-full w-full">
                    <div className='flex-grow flex items-center gap-4 flex-col'>
                        <div className="flex justify-end w-full items-center gap-4">
                            <span className='font-semibold'>Lifelines</span>
                            {Object.values(LIFELINES)?.map((item) => {
                                const isCompleted = completedLifelines?.includes(item)
                                return <button disabled={isCompleted||lifeline} onClick={() => {
                                    handleLifeline(item)
                                }} className={`btn-sm border-2 border-violet-500  rounded-md ${lifeline === item && 'bg-violet-500 '} ${isCompleted && 'bg-violet-500'}`}>{item}</button>

                            })}

                        </div>
                        <div className="flex-center w-14 h-14 rounded-full font-semibold text-2xl bg-indigo-800 text-white ">
                            {timer}
                        </div>
                        <div className="font-semibold py-4 mb-4">
                            Q{currentQuestion + 1}. {currentQuestionData?.questionName}
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            {currentQuestionData?.options.map((option, index) => (
                                <Option
                                    lifeline={lifeline}
                                    isCorrect={isCorrect}
                                    isWrong={isWrong}
                                    handleAnswer={handleAnswer}
                                    answer={answer}
                                    key={index}
                                    correctAnswer={currentQuestionData?.correctAnswer}
                                    option={option}
                                    index={index}
                                    animate={animate} />
                            ))}
                        </div>

                    </div>
                    <div className="flex flex-col-reverse  gap-2 py-8 px-4 flex-shrink-0">
                        {priceArray?.map((price, index) => (
                            <div key={price} className={`text-center text-lg px-8 py-2 font-semibold gap-2 rounded-md ${index === currentQuestion && 'text-white bg-yellow-600'} `}>
                                <span>Rs. {formatNumber(price)} </span>
                            </div>
                        ))}

                    </div>
                </div>
            }
        </>
    )
}

export default PlayGameArea