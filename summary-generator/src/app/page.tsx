"use client";

import { useRouter } from 'next/navigation';
import Container from "@/component/container";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const askgemini = async () => {
    setLoading(true);
    setOutput("");
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
    console.log("Response:", data);
    if(data[0].isTermsOfUse){
      setOutput("要約を作成します...");
      router.push("/summary");
    }
    else {
      setOutput("利用規約を入力してください。");
    }
  }

  return (
    <div className="m-4">
      <h1 className="text-4xl py-1.5 font-bold">利用規約を要約したい！！！</h1>
      <hr/><br/>
      <textarea className="border size-full" value={input} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}></textarea>
      <br/>
      <div className="flex gap-5 mt-2">
        <button className="border px-2 py-1 rounded-lg" onClick={() => setInput("")}>リセット</button>
        <button className={`border px-2 py-1 rounded-lg ${loading || !input ? "text-gray-400" : "text-black"}`} onClick={askgemini} disabled={loading || !input}>生成</button>
      </div>
      {loading && <p className="text-gray-500">生成中...</p>}
      {output}
      <Container title={""} content={""}/>
      <Container title={""} content={""}/>
    </div>
  );
}
