import { createContext, useState, useEffect, ReactNode, FC } from "react";

// Define types for Poll and Context
export interface Poll {
  id: string;
  question: string;
  options: { [key: string]: number };
  userVotes: { [userId: string]: string };
}

export interface PollContextType {
  polls: Poll[];
  setPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
  selectedPoll: string | null;
  setSelectedPoll: React.Dispatch<React.SetStateAction<string | null>>;
}

export const PollContext = createContext<PollContextType>({
  polls: [],
  setPolls: () => {},
  selectedPoll: null,
  setSelectedPoll: () => {},
});

const PollProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);

  useEffect(() => {
    // Fetch initial polls data from an API or local storage
    const fetchPolls = async () => {
      // Placeholder for actual API call
      // const fetchedPolls = await api.fetchPolls();
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

  console.log("polls", polls);

  return (
    <PollContext.Provider
      value={{ polls, setPolls, selectedPoll, setSelectedPoll }}
    >
      {children}
    </PollContext.Provider>
  );
};

export default PollProvider;
