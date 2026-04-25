"use client"

import { useEffect, useState } from "react"

const codeSnippets = [
  {
    language: "typescript",
    code: `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
  },
  {
    language: "javascript",
    code: `const fetchData = async () => {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
};

fetchData().then(console.log);`,
  },
  {
    language: "python",
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

print(quicksort([3,6,8,10,1,2,1]))`,
  },
]

export function CodeTypingAnimation() {
  const [displayedCode, setDisplayedCode] = useState("")
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentSnippet = codeSnippets[currentSnippetIndex].code

    if (!isDeleting && charIndex < currentSnippet.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(currentSnippet.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 30)
      return () => clearTimeout(timeout)
    } else if (!isDeleting && charIndex === currentSnippet.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
      return () => clearTimeout(timeout)
    } else if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayedCode(currentSnippet.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, 15)
      return () => clearTimeout(timeout)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setCurrentSnippetIndex((currentSnippetIndex + 1) % codeSnippets.length)
    }
  }, [charIndex, currentSnippetIndex, isDeleting])

  return (
    <div className="w-full h-[280px] bg-[#1e1e1e] rounded-lg border border-[#3a3a3a] overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#3a3a3a] flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-sm text-gray-400 ml-2">{codeSnippets[currentSnippetIndex].language}</span>
      </div>
      <div className="p-6 flex-1 overflow-hidden">
        <pre className="font-mono text-sm text-gray-100">
          <code>{displayedCode}</code>
          <span className="inline-block w-2 h-4 bg-[#D87757] ml-0.5 animate-pulse" />
        </pre>
      </div>
    </div>
  )
}
