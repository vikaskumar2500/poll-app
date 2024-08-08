import { useContext } from "react";
import { VotePoll } from "@/components/vote-poll";
import { PollContext } from "@/context/poll-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ViewPollsPage = () => {
  const { selectedPoll, polls, setSelectedPoll } = useContext(PollContext);
  const selectedPollData = polls.find((poll) => poll.id === selectedPoll);
  return (
    <div className="bg-white shadow-md rounded p-6 max-w-sm w-full mx-auto flex flex-col gap-5">
      {polls.length !== 0 ? (
        <div>
          <Label htmlFor="poll-vote" className="block text-xl font-bold mb-2">
            CHOOSE A POLL TO VOTE
          </Label>
          <Select
            onValueChange={(val: string) => setSelectedPoll(val)}
            value={selectedPoll || "Select a poll"}
            name="poll-vote"
            defaultValue="Select A Poll"
          >
            <SelectTrigger className="w-[250px] border border-gray-300 rounded-lg">
              <SelectValue placeholder="Select a poll" />
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
      {selectedPoll ? (
        <VotePoll userId={"abcededfhg"} poll={selectedPollData!} />
      ) : null}
    </div>
  );
};

export default ViewPollsPage;
