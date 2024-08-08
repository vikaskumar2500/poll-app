import React from "react";
import { Poll } from "@/context/poll-context";

interface ViewResultsProps {
  poll: Poll;
}

export const ViewResults: React.FC<ViewResultsProps> = ({ poll }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <h2 className="block text-gray-700 font-semibold mb-2">
          Question: <span className="font-bold text-lg">{poll.question}</span>
        </h2>
      </div>

      <ul>
        {Object.keys(poll.options).map((key, index) => (
          <li
            key={index}
            className="mb-4 relative flex items-stretch justify-between"
          >
            <div>{key}</div>
            <div className="bg-gray-100 text-xs px-2 py-1 rounded-md w-[3.5rem]">
              {poll.options[key]} {poll.options[key] === 1 ? "vote" : "votes"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
