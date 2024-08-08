import React from 'react';

interface PollResultsProps {
  options: { [key: string]: number };
}

export const PollResults: React.FC<PollResultsProps> = ({ options }) => {
  return (
    <div>
      {Object.entries(options).map(([option, votes]) => (
        <div key={option}>
          {option}: {votes}
        </div>
      ))}
    </div>
  );
};

