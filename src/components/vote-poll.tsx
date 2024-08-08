import { Poll, PollContext } from "@/context/poll-context";
import React, { useContext } from "react";
import { PollOptions } from "./poll-options";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface VotePollProps {
  poll: Poll;
  userId: string;
}
const FormSchema = z.object({
  selectedOption: z.string().optional(),
});

export type FormValues = z.infer<typeof FormSchema>;

export const VotePoll: React.FC<VotePollProps> = ({ poll, userId }) => {
  const { setPolls } = useContext(PollContext);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: FormValues) => {
    if (data.selectedOption) {
      // handlePollVote(data.selectedOption);
      form.reset();
    }
  };

  const handlePollVote = (option: string, checked: boolean) => {
    setPolls((prevPolls) =>
      prevPolls.map((p) => {
        if (p.id !== poll.id) return p;

        const userVote = p.userVotes[userId];
        const updatedOptions = { ...p.options };

        if (checked && userVote !== option) {
          if (userVote !== undefined) updatedOptions[userVote] -= 1;
          updatedOptions[option] += 1;
          p.userVotes[userId] = option;
        } else if (!checked && userVote === option) {
          updatedOptions[option] -= 1;
          delete p.userVotes[userId];
        }

        return {
          ...p,
          options: updatedOptions,
          userVotes: p.userVotes,
        };
      })
    );
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-700">{poll.question}</h2>
      <div className="flex gap-2 items-center">
        <IoCheckmarkSharp
          size={12}
          color="gray"
          className="bg-green-400 rounded-full ring-1 ring-green-600"
        />
        <p className="text-xs text-pretty">Select one</p>
      </div>
      <PollOptions
        onSubmit={onSubmit}
        form={form}
        options={poll?.options}
        handleVote={handlePollVote}
      />
    </>
  );
};
