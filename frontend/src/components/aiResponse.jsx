import { useState } from "react";
import { BotMessageSquare, X } from "lucide-react";

export const AiResponse = () => {
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow(!show);
  };

  return (
    <div>
      {/* Chat button */}
      <div className="fixed bottom-10 right-10 z-30">
        <button
          className="rounded-full border-2 border-yellow-500 bg-white p-3 transition-all duration-300 hover:scale-110 shadow-md"
          onClick={toggleModal}
          aria-label="Open chat"
        >
          <BotMessageSquare className="text-yellow-400" size={42} />
        </button>
      </div>

      {/* Chat modal */}
      {show && (
        <div className="fixed bottom-24 right-10 w-80 md:w-96 bg-white rounded-lg shadow-xl z-40 border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-yellow-400 text-white p-4">
            <h3 className="font-medium">Streak Assistant</h3>
            <button 
              onClick={toggleModal}
              className="text-white hover:bg-yellow-500 p-1 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Chat area */}
          <div className="flex-1 p-4 overflow-y-auto h-64">
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-400 text-center">Chat interface will appear here</p>
            </div>
          </div>
          
          {/* Input area */}
          <div className="border-t border-gray-200 p-3 flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:border-yellow-400"
              disabled
            />
            <button 
              className="ml-2 bg-yellow-400 rounded-full p-2 text-white transition-colors cursor-not-allowed opacity-70"
              disabled
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Optional backdrop */}
      {show && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-10 z-20 md:hidden"
          onClick={toggleModal}
        />
      )}
    </div>
  );
};