import React, { useState } from 'react'
import style from "./container.module.css";

interface ContainerProps {
    title: string;
    content : React.ReactNode; // contentをReact要素型に定義
}
const Container = ({title, content} : ContainerProps) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
    <div className='mx-4 my-7 bg-gray-100 py-5 rounded-3xl shadow-md sm:mx-20 sm:p-5'>
        <h1 className='text-2xl sm:text-3xl font-bold text-center mt-4 px-3'>{title}</h1>
        <div className={style.read_more_1}>
            <div>
                {content}
            </div>
            <label>
                <input type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsChecked(e.target.checked)}/>
                {isChecked ? "閉じる" : "...続きを読む"}
            </label>
        </div>
    </div>
  )
}

export default Container
