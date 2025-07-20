"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { setJsonData, setOriginal } from '@/lib/features/summary/summarySlice';

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch()
  
  const askgemini = async () => {
    setLoading(true);
    setOutput("");
    dispatch(
      setOriginal(
        
          input
        
      )
    );
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
    if (!response.ok) {
      console.error("Error:", response.statusText);
      setOutput("エラーが発生しました。もう一度お試しください。");
      setLoading(false);
      return;
    }
    const data = await response.json();
    setLoading(false);
    // console.log("Response:", data);
    if(data[0].isTermsOfUse){
      setOutput("要約を作成します...");
      dispatch(
        setJsonData(
          data[0]
        )
      );
      router.push("/summary");
    }
    else {
      setOutput("利用規約を入力してください。");
    }
  }

  return (
    <div className="m-4">
      <h1 className="text-3xl sm:text-4xl py-1.5 font-bold">利用規約をわかりやすく</h1>
      <hr/>
      利用規約を入力すると、ポイントごとに要約が生成されます。<br/>
      <br/>
      <div className="flex gap-5 mb-4">
        <button className="border px-2 py-1 rounded-lg" onClick={() => setInput("")}>リセット</button>
        <button className={`border px-2 py-1 rounded-lg ${loading || !input ? "text-gray-400" : "text-black"}`} onClick={askgemini} disabled={loading || !input}>生成</button>
      </div>
      {loading && <p className="text-gray-500 pl-5 pb-2">生成中...<br/> ---生成に数十秒かかります---</p>}
      <p className='pl-3 pb-2 text-red-400'>{output}</p>
      <textarea className="border size-full h-72" value={input} placeholder='利用規約を貼り付けてください' onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}></textarea>
      <br/>
    </div>
  );
}
