import { createContext, useState, useEffect, ReactNode, FC } from "react";

export interface Poll {
  id: string;
  question: string;
  options: { [key: string]: number };
  userVotes: { [userId: string]: string };
}
export type Vote = {
  [key: string]: string|null;
};

export interface PollContextType {
  polls: Poll[];
  setPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
  selectedPoll: string | null;
  setSelectedPoll: React.Dispatch<React.SetStateAction<string | null>>;
  vote: Vote | null;
  handleAddVote: (vote: { question: string; option: string|null }) => void;
}

export const PollContext = createContext<PollContextType>({
  polls: [],
  setPolls: () => {},
  selectedPoll: null,
  setSelectedPoll: () => {},
  vote: null,
  handleAddVote: () => {},
});

const PollProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);
  const [vote, setVote] = useState<Vote | null>(null);

  const handleAddVote = ({
    question,
    option,
  }: {
    question: string;
    option: string|null;
  }) => {
    setVote((prev) => ({
      ...prev,
      [question]: option,
    }));
  };

  useEffect(() => {
    const fetchPolls = async () => {
      const fetchedPolls: Poll[] = [
        {
          id: "sjdlkfjjaslkdjf0923",
          question: "vikaskumar",
          options: { kumar: 0, vikas: 0, sugandhi: 0 },
          userVotes: {},
        },
      ];
      setPolls(fetchedPolls);
    };

    fetchPolls();
  }, []);

  return (
    <PollContext.Provider
      value={{
        polls,
        setPolls,
        selectedPoll,
        setSelectedPoll,
        vote,
        handleAddVote,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

export default PollProvider;
