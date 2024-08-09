import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ViewResults } from "@/components/view-results";
import { PollContext } from "@/context/poll-context";
import { useContext } from "react";

const ViewResultsPage = () => {
  const { polls, setSelectedPoll, selectedPoll } = useContext(PollContext);

  const poll = selectedPoll ? polls.find((p) => p.id === selectedPoll) : null;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-sm w-full mx-auto flex flex-col gap-5">
      {polls.length !== 0 ? (
        <div>
          <Label htmlFor="poll-vote" className="block text-lg font-bold mb-2">
            Choose A Poll To See Results
          </Label>
          <Select
            onValueChange={(val: string) => setSelectedPoll(val)}
            value={selectedPoll || ""}
            name="view-results"
          >
            <SelectTrigger className="w-[250px]  outline-none border border-gray-300 rounded-lg">
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
      {poll && <ViewResults poll={poll} />}
    </div>
  );
};

export default ViewResultsPage;
