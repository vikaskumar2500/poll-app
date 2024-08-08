import { PollContext } from "@/context/poll-context";
import { useState, useContext } from "react";
import { PollForm } from "./poll-form";
import { createId } from "@paralleldrive/cuid2";

export interface PollOption {
  option: string;
}

export const CreatePoll = () => {
  const { setPolls } = useContext(PollContext);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<PollOption[]>([
    { option: "" },
    { option: "" },
  ]);

  const handleCreatePoll = (data: {
    pollQuestion: string;
    pollOptions: PollOption[];
  }) => {
    const newPoll = {
      id: createId(),
      question: data.pollQuestion,
      options: data.pollOptions.reduce((acc, option) => {
        acc[option.option] = 0;
        return acc;
      }, {} as { [key: string]: number }),
      userVotes: {},
    };

    setPolls((prevPolls) => [...prevPolls, newPoll]);
    setPollQuestion("");
    setPollOptions([{ option: "" }, { option: "" }]);
  };

  return (
    <PollForm
      pollQuestion={pollQuestion}
      pollOptions={pollOptions}
      handleCreatePoll={handleCreatePoll}
    />
  );
};
