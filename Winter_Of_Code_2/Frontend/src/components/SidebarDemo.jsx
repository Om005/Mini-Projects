import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Editor } from "@monaco-editor/react";
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Link } from "react-router-dom";

const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
  ]

export function SidebarDemo() {
    
    
  return (
    
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-[100vh]"
      )}>
      
      <Dashboard />
    </div>
    
  );
}
// Dummy dashboard component with content
const Dashboard = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('')
    
    const handleChange = (e) => {
        setSelectedLanguage(e.target.value)
      }
  return (
    (<div className="flex flex-1">
      <div
        className="p-2 md:p-3 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2 nunito">
            <div
              className="h-12 w-full rounded-lg  bg-gray100 dar:bg-neutral-800 flex justify-start items-center">
                    <select
        value={selectedLanguage}
        onChange={handleChange}
        className="w-[50%] px-3 py-2 bg-[#171717] text-white border rounded-lg focus:outline-none focus:border-blue-500"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
              </div>
            <div
              className="h-12 w-full rounded-lg  bg-gray100 dak:bg-neutral-800 flex justify-end items-center">
                <button
                  onClick={() => alert(`Running ${selectedLanguage} code...`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none w-full md:w-auto"
                >
                  Run
                </button>
              </div>
            <div
              className="h-12 w-full rounded-lg  bg-gray100 dak:bg-neutral-800 flex justify-end items-center">

                    <select
        value={selectedLanguage}
        onChange={handleChange}
        className="w-[50%] px-3 py-2 bg-[#171717] text-white border rounded-lg focus:outline-none focus:border-blue-500"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>


              </div>
            <div
              className="h-12 w-full rounded-lg  bg-gray100 dak:bg-neutral-800 flex justify-center gap-10 items-center">
                <button
                  onClick={() => alert('Wrap enabled')}
                  className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:outline-none w-full md:w-auto"
                >
                  Enable Wrap
                </button>
                <button
                  onClick={() => alert('Downloading...')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none w-full md:w-auto"
                >
                  Download
                </button>
              </div>
        </div>
        {/* <div className="flex gap-2 flex-1">
            <div
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800">
              <Editor height="90vh" width={"50vw"} defaultLanguage="javascript" theme="vs-dark" defaultValue="// some comment" />
              </div>
            <div
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse">

                <div className="h-1/2 w-full bg-red-50"></div>
                <div className="h-1/2 w-full bg-red-50"></div>
              </div>
        </div> */}

<div className="h-screen w-full bg-background text-foreground">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={50} minSize={30}>
          <div className="bg-[#2c2c2c] rounded-lg">
          <p className="flex text-white nunito gap-2 justify-start items-center text-lg p-1 px-3">
            <img src="./svgs/code.svg" className="w-5" alt="" />Code
          </p>
          <Editor height="90vh" defaultLanguage="javascript" theme="vs-dark" defaultValue="// some comment" />
          </div>
        </Panel>
        <PanelResizeHandle className="w-2 bg-muted hover:bg-[#262626] transition-colors" />
        <Panel minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={60} minSize={30}>
              <div className="w-full h-full flex-col gap-1 border border-slate-800 py-2 rounded-md flex justify-start items-center bg-[#181818]">
                <div className="flex justify-between w-full nunito text-white h-10 mt-2">
                  <span className="ml-8 text-lg">Input</span>

                  <div className="mr-8">
                    <label className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none cursor-pointer">
                      Choose File
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                  
                  
                </div>
                <textarea name="" id="" className="w-[95%] resize-none overflow-scroll custom-scrollbar bg-[#1E1E1E] text-white outline-none rounded-lg p-2 h-[87%]"></textarea>
              </div>
            </Panel>
            <PanelResizeHandle className="h-2 bg-muted hover:bg-[#262626] transition-colors" />
            <Panel minSize={30}>
              {/* <div className="bg-black w-full h-full">

</div> */}
<div className="w-full h-[95%] flex-col gap- border border-slate-800 py-2 rounded-md flex justify-start items-center bg-[#181818]">
  <div className="flex justify-between w-full nunito text-white h-10 mt-1">
    <span className="ml-8 text-lg">Output</span>
  </div>
  <div className="w-[97%] output bg-[#1E1E1E] text-white outline-none rounded-lg p-2 h-[100%] overflow-scroll custom-scrollbar">

</div>

</div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
        {/* <div className="h-10 bg-gray-100 dark:bg-neutral-800 ">
        </div>
        <Editor height="90vh" defaultLanguage="javascript" theme="vs-dark" defaultValue="// some comment" />; */}
      </div>
    </div>)
  );
};
