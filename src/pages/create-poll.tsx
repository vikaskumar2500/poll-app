import { CreatePoll } from "@/components/create-poll";

const CreatePollPage = () => {
  return (
    <div className="shadow-md rounded bg-white p-6 max-w-sm w-full mx-auto flex flex-col gap-5">
      <h1 className="font-semibold text-lg">Create a Poll</h1>
      <CreatePoll />
    </div>
  );
};

export default CreatePollPage;
