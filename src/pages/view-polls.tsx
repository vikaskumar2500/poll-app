import { useContext } from "react";
import { PollContext } from "@/context/poll-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PollOptions } from "@/components/poll-options";

const FormSchema = z.object({
  selectedOption: z.string().optional(),
});

export type FormValues = z.infer<typeof FormSchema>;

const ViewPollsPage = () => {
  const { selectedPoll, polls, setSelectedPoll } = useContext(PollContext);
  const userId = "vikaskumar2500"; // dummy user
  const { setPolls } = useContext(PollContext);

  const poll = polls.find((poll) => poll.id === selectedPoll);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("data", data);
  };

  const handlePollVote = (option: string, checked: boolean) => {
    setPolls((prevPolls) =>
      prevPolls.map((p) => {
        if (p.id !== poll?.id) return p;

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
    <div className="bg-white shadow-md rounded-xl p-6 max-w-sm w-full mx-auto flex flex-col gap-5">
      {polls.length !== 0 ? (
        <div>
          <Label htmlFor="poll-vote" className="block text-xl font-bold mb-2">
            CHOOSE A POLL TO VOTE
          </Label>

          <Select
            onValueChange={(val: string) => setSelectedPoll(val)}
            value={selectedPoll || ""}
            name="view-results"
          >
            <SelectTrigger className="w-[250px] outline-none border border-gray-300 rounded-lg">
              <SelectValue defaultChecked={true} placeholder="Select A Poll" />
            </SelectTrigger>
            <SelectContent>
              {polls.map((poll) => (
                <SelectItem key={poll.id} value={poll.id}>
                  {poll.question}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <p className="text-gray-600">Please add a poll</p>
      )}
      {selectedPoll && poll ? (
        <>
          <h2 className="text-xl font-semibold text-gray-700">
            {poll?.question}
          </h2>
          <div className="flex gap-2 items-center">
            <IoCheckmarkSharp
              size={12}
              color="gray"
              className="bg-green-400 rounded-full ring-1 ring-green-600"
            />
            <p className="text-xs text-pretty">Select one</p>
          </div>
          <PollOptions
            question={poll.question}
            onSubmit={onSubmit}
            form={form}
            options={poll?.options!}
            handleVote={handlePollVote}
          />
        </>
      ) : null}
    </div>
  );
};

export default ViewPollsPage;
