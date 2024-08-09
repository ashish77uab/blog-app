'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import gsap from 'gsap';
const LevelSwiper = () => {
    const [initialSlide, setInitialSlide] = useState(0)
    const [swiper, setSwiper] = useState({})
    const [level, setLevel] = useState(3)
    const widthOfCard = swiper?.slidesSizesGrid?.[0]
    const widthOfCardTranslate = swiper?.snapGrid?.[initialSlide]
    const marginValue = swiper?.marginRight
    const leftVal = widthOfCard * level + (level - 1) * marginValue
    const translateX = widthOfCardTranslate

    console.log(translateX, 'outisde')
    useLayoutEffect(() => {
        console.log(document.querySelector('.car'), 'car useLayoutEffect')
    }, [])
    useEffect(()=>{
        console.log(document.querySelector('.car'), 'car useEffect')
    },[])

    return (
        <div className='  py-20 px-4 overflow-hidden '>
            <div className='relative mx-auto  px-20' >
                <Swiper

                    onInit={(swiper) => {
                        const widthOfCard = swiper?.slidesSizesGrid?.[0]
                        const element = document.querySelector('.swiper-slide')
                        const style = window.getComputedStyle(element)
                        const marginRight = style.getPropertyValue('margin-right');
                        const marginValue = String(marginRight).split('px')[0]
                        const leftVal = widthOfCard * level + (level - 1) * marginValue
                        gsap.fromTo(".car", { left: 0 }, { left: leftVal, duration: 1, delay: 0.1, ease: 'none' });
                        gsap.fromTo(".progress", { width: 0 }, { width: leftVal, duration: 1, delay: 0.1, ease: 'none' });
                        setSwiper({ ...swiper, marginRight: marginValue })
                    }}
                    pagination={{
                        clickable: true,

                    }}
                    navigation={{
                        prevEl: '.upperPrevBonus',
                        nextEl: '.upperNextBonus',
                    }}
                    slidesPerView={4}
                    spaceBetween={64}
                    modules={[Navigation]}
                    onSlideChange={(swiper) => {
                        setInitialSlide(swiper.activeIndex)

                    }}
                    initialSlide={initialSlide}
                    >
                    {Array(10).fill(2).map((item, index) => (
                        <SwiperSlide >
                            <div className='relative' >
                                <img className='w-full' src={`/images/level.png`} alt="" />
                                <div className='absolute top-0 right-0 w-12 h-12 bg-gray-50 flex-center text-2xl '>{index + 1}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div style={{ width: swiper?.virtualSize, transform: `translateX(-${translateX}px)` }} className="flex pb-[10px] min-h-[116px] relative mt-10 overflow-x-hidden transition-transform duration-300">

                        <div style={{ left: leftVal }} className={`absolute bottom-[4px] car  transition-[left]   `}>
                            <img src="/images/car.png" alt="" />
                        </div>
                        <div className="border absolute h-[16px] bottom-0 border-dashed w-full">
                            <div style={{ width: leftVal }} className="h-full progress transition-[width]  bg-pink-500"></div>
                        </div>
                    </div>
                </Swiper>
                {/* <div className="ay-center left-0 flex justify-between z-[10] w-full">
                    <ArrowStyled left={true} className={'upperPrevBonus'} />
                    <ArrowStyled className={'upperNextBonus'} />
                </div> */}
                <button className='bg-red-500 px-10 py-4 text-white text-lg font-semibold rounded-md flex-center' onClick={() => setLevel(prev => prev + 1)}> Increase Level</button>


            </div>



        </div>
    )
}

export default LevelSwiper