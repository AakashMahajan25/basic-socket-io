"use client"
import io from "socket.io-client";
import React, { useEffect, useState } from 'react'

const socket = io("https://basic-socket-io-seven.vercel.app");

const Client = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    })

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4 h-[300px] overflow-y-auto border rounded p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="p-2 border rounded"
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Client
