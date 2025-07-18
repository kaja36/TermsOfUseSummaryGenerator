import React, { useState } from 'react'
import style from "./container.module.css";

interface ContainerProps {
    title: string;
    content : string;
}
const Container = ({title, content} : ContainerProps) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
    <div className='mx-20 my-7 bg-gray-100 p-5 rounded-3xl shadow-md'>
        <h1 className='text-3xl font-bold text-center mt-4'>{title}</h1>
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

{/* <ul className='list-disc list-inside pl-5'>
    <li>利用規約は、サービスの利用に関するルールを定めたものです。</li>
    <li>ユーザーは、サービスを利用する前に必ず利用規約を確認し、同意する必要があります。</li>
    <li>利用規約には、禁止事項や責任の制限などが含まれています。</li>
    <li>サービス提供者は、利用規約を変更する権利を有します。</li>
</ul> */}