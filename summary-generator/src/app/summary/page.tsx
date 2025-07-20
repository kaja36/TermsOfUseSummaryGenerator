"use client";

import Container from '@/component/container'
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export interface Summary {
  isTermsOfUse: boolean;
  serviceName: string | null;
  companyName: string | null;
  enforcedDate: string | null;
  description: string[];
  features: string[];
  userRequirements: string[];
  prohibitedActions: string[];
  faq: [string, string][];
}

function Page() {
  // htmlで表示する用に変換済み
  const [original, setOriginal] = useState<React.ReactNode>("");
  const [serviceName, setServiceName] = useState("サービス");
  const [companyName, setCompanyName] = useState("");
  const [enforcedDate, setEnforcedDate] = useState("");
  const [description, setDescription] = useState<React.ReactNode>([]);
  const [features, setFeatures] = useState<React.ReactNode>([]);
  const [userRequirements, setUserRequirements] = useState<React.ReactNode>([]);
  const [prohibitedActions, setProhibitedActions] = useState<React.ReactNode>([]);
  const [faq, setFaq] = useState<React.ReactNode>([]);

  const router = useRouter();
  const data = useAppSelector((state) => state.summaryData.summary);
  const originalText = useAppSelector((state) => state.summaryData.original);

  const setReactNode = (content: string[]): React.ReactNode => {
    const list = content.map((item) => {
      return <li className='my-3' key={item}>{item}</li>;
    });
    return <ul className='list-disc list-inside pl-5 font-bold'>{list}</ul>;
  }

  const setReactNodeForFaq = (content: [string, string][]): React.ReactNode => {
    const list = content.map((item) => {
      return (
        <li key={item[0]}>
          <details className='my-4 font-bold'>
            <summary className='my-3 underline underline-offset-3'>{item[0]}</summary>
            <div className='pl-4'>{item[1]}</div>
          </details>
        </li>
      );
    });
    return <ul>{list}</ul>;
  }

  const setReactNodeForOriginalText = (content: string): React.ReactNode => {
    const lines = content.split('\n');
    const formattedLines = lines.map((line, index) => {
      return <p key={index} className='m-3'>{line}</p>;
    });
    return formattedLines;
  }

  useEffect(() => {
    if (!data || data.isTermsOfUse === false) {
      console.error("問題が発生しました。トップへ戻ります。");
      router.push("/");
    }
    if (data?.serviceName)
      setServiceName(data.serviceName);
    if (data?.companyName)
      setCompanyName(data.companyName);
    if (data?.enforcedDate)
      setEnforcedDate(data.enforcedDate);
    if (data?.description)
      setDescription(setReactNode(data.description));
    if (data?.features)
      setFeatures(setReactNode(data.features));
    if (data?.userRequirements)
      setUserRequirements(setReactNode(data.userRequirements));
    if (data?.prohibitedActions)
      setProhibitedActions(setReactNode(data.prohibitedActions));
    if (originalText)
      setOriginal(setReactNodeForOriginalText(originalText));
    if (data?.faq)
      setFaq(setReactNodeForFaq(data.faq));
  }, []);

  return (
    <>
    <Link href={'/'} className="m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-orange-700">＜戻る</Link>
      <div className='my-20'>
        <h1 className='text-4xl sm:text-5xl font-bold text-center my-8'>{serviceName} 利用規約</h1>
        <p className='text-right my-4 mr-15'>{companyName}</p>
        <p className='text-right mb-12 mr-15'>{enforcedDate}</p>
        <hr className='border-gray-400 mx-6'></hr>
      </div>
      <Container title={"やってはいけないこと"} content={prohibitedActions} />
      <Container title={"ユーザに求めること"} content={userRequirements} />
      <Container title={`${serviceName}ってどんなサービス？`} content={description} />
      <Container title={`${serviceName}の特徴`} content={features} />
      <Container title={"よくある質問"} content={faq} />
      <Container title={"原文"} content={original} />
    </>
  )
}

export default Page