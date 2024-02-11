"use client"

import { useEffect, useRef, useState } from "react"
import { chatAnswer } from "./actions"
import {IconLoader2, IconSend} from "@tabler/icons-react"

type ChatProps = {
    id: string,
    text: string,
    sender: "user" | "system"
}

export default function Chat({firstMessage, language} : {firstMessage: string, language: "es" | "en"}) {
    const [chat, setChat] = useState<ChatProps[]>([{id: crypto.randomUUID(), text: firstMessage, sender: "system"}])
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        
        if(loading) return;

        setLoading(true)
        setChat((prevChat) => [...prevChat, {id: crypto.randomUUID(), text: message, sender: "user"}])
        setMessage("")

        const response = await chatAnswer(message)
        setChat((prevChat) => [...prevChat, {id: crypto.randomUUID(), text: response, sender: "system"}])
        setLoading(false)
    }

    const chatContainer = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if(chatContainer) {
            chatContainer.current?.scrollTo(0, chatContainer.current?.scrollHeight)
        }
    }, [chat])


  return (
    <div className="flex flex-col gap-4 w-full border rounded-md border-slate-900 p-2 h-96 justify-between">
      <div className="flex flex-col gap-4 overflow-y-auto" ref={chatContainer}>
        {chat.map((message, i) => (
          <div key={i} className={`flex flex-col gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"} items-${message.sender === "user" ? "end" : "start"}`}>
            <div className={`${message.sender === "user" ? "bg-slate-200" : "bg-blue-200"} dark:${message.sender === "user" ? "bg-slate-900" : "bg-blue-900"} p-3 rounded-lg ${message.sender === "user" ? "rounded-br-none" : "rounded-bl-none"} w-[75%] ${message.sender === "user" ? "items-end" : "justify-end"}
            `}>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-row gap-4 w-full">
        <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} className="w-full p-4 rounded-md bg-slate-200 dark:bg-slate-900" />
        <button type="submit" aria-label={language === "es" ? "Enviar" : "Send"} disabled={loading} className="p-4 rounded-md bg-blue-200 dark:bg-blue-900">
            {loading ? <IconLoader2 className="animate-rotate-360 animate-iteration-count-infinite"/> : <IconSend />}
        </button>
      </form>
    </div>
)
}