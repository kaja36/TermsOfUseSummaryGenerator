"use client";

import gemini from "@/api/gemini";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const askgemini = () => {
    gemini(input);
  }

  return (
    <div>
      <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}></textarea>
      <br/>
      <button onClick={askgemini}>生成</button>
    </div>
  );
}
