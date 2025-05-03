import { useEffect, useState, useRef } from "react";
import { BotMessageSquare, X, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { promtAiActions } from "../actions/streakActions";

export const AiResponse = ({ streakId }) => {
  const [show, setShow] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [prevMessageCount, setPrevMessageCount] = useState(0);
  const { loading, success, error, message } = useSelector(
    (state) => state.promtAi
  );
  const dispatch = useDispatch();
  const chatAreaRef = useRef(null);

  const toggleModal = () => {
    setShow(!show);
    if (!show) {
      setHasNewMessages(false);
    }
  };

  useEffect(() => {
    if (streakId) {
      dispatch(promtAiActions(streakId));
    }

  }, [dispatch, streakId]);

  useEffect(() => {
    if (message && Array.isArray(message)) {
      if (message.length > prevMessageCount) {
        setPrevMessageCount(message.length);
        if (!show) {
          setHasNewMessages(true);
        }
      }
    }
  }, [message, prevMessageCount, show]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [message]);


  return (
    <div>
      <div className="fixed bottom-4 sm:bottom-10 right-4 sm:right-10 z-30">
        <button
          className="rounded-full border-2 border-yellow-500 bg-white p-3 transition-all duration-300 hover:scale-110 shadow-md relative"
          onClick={toggleModal}
          aria-label="Open chat"
        >
          <BotMessageSquare className="text-yellow-400" size={30} />

          {hasNewMessages && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-xs">!</span>
            </div>
          )}
        </button>
      </div>

      {show && (
        <div className="fixed bottom-16 sm:bottom-24 right-4 sm:right-10 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-40 border border-gray-200 flex flex-col max-h-[70vh]">
          <div className="flex items-center justify-between bg-yellow-400 text-white p-4 rounded-t-lg">
            <h3 className="font-medium text-sm sm:text-base">
              AI Streak Progress & Benefits
            </h3>
            <button
              onClick={toggleModal}
              className="text-white hover:bg-yellow-500 p-1 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <div
            ref={chatAreaRef}
            className="flex-1 p-4 overflow-y-auto max-h-[40vh] flex flex-col-reverse space-y-4 scrollbar-thin scrollbar-thumb-yellow-200 scrollbar-track-transparent"
          >
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            ) : message && Array.isArray(message) && message.length > 0 ? (
              message.map((aiMess, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex items-start mb-2">
                    <div
                      className={`p-3 rounded-lg rounded-tl-none max-w-[90%] shadow-sm ${
                        index === message.length - 1 &&
                        prevMessageCount < message.length
                          ? "bg-yellow-200"
                          : "bg-yellow-100"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mr-2">
                          <BotMessageSquare className="text-white" size={14} />
                        </div>
                        <span className="text-xs font-medium text-yellow-600">
                          AI Assistant {" "}
                          {aiMess.dateReturn && (
                            <span className="text-xs text-gray-400 mt-1">
                              {new Date(aiMess.dateReturn).toLocaleDateString()}
                            </span>
                          )}
                        </span>
                      </div>

                      <p className="text-gray-700 text-sm">{aiMess.response}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-400 text-center">
                  No messages available. Check back later!
                </p>
              </div>
            )}
          </div>

          <div className="p-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between rounded-b-lg">
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  success
                    ? "bg-green-400"
                    : error
                    ? "bg-red-400"
                    : "bg-gray-400"
                }`}
              ></div>
              <span>
                {success
                  ? "Connected"
                  : error
                  ? "Error loading data"
                  : "Waiting for data..."}
              </span>
            </div>
            <button
              onClick={() => dispatch(promtAiActions(streakId))}
              className="text-yellow-500 hover:text-yellow-600 flex items-center"
              title="Refresh"
            >
              <span className="text-xs mr-1">Refresh</span>
              <RefreshCw size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
