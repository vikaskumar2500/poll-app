import React, { useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { Form, FormControl, FormItem, FormLabel } from "./ui/form";
import { Controller, UseFormReturn } from "react-hook-form";
import { FormValues } from "./vote-poll";
import { Link } from "react-router-dom";

interface PollOptionsProps {
  options: { [key: string]: number };
  handleVote: (option: string, checked: boolean) => void;
  form: UseFormReturn<
    {
      selectedOption?: string | undefined;
    },
    any,
    undefined
  >;
  onSubmit: (data: FormValues) => void;
}

export const PollOptions: React.FC<PollOptionsProps> = ({
  options,
  handleVote,
  form,
  onSubmit,
}) => {
  useEffect(() => {
    const storedOption = localStorage.getItem("selectedOption");
    if (storedOption) form.setValue("selectedOption", storedOption);
  }, [form]);

  const handleVoteChange = (option: string, checked: boolean) => {
    handleVote(option, checked);
    const selectedOption = checked ? option : null;
    form.setValue("selectedOption", String(selectedOption));
    if (selectedOption) localStorage.setItem("selectedOption", selectedOption);
    else localStorage.removeItem("selectedOption");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ul className=" w-full space-y-2 max-h-[16rem] overflow-y-auto">
          {Object.entries(options).map(([option, count]) => (
            <li key={option} className="w-full">
              <label
                htmlFor={option}
                className="w-full flex flex-row items-center gap-2"
              >
                <Controller
                  name="selectedOption"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value === option}
                          onCheckedChange={(checked: boolean) =>
                            handleVoteChange(option, checked)
                          }
                          className="rounded-full size-5 checked:bg-green-700"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none w-full">
                        <FormLabel>
                          <div className="w-full flex flex-col items-start">
                            <span className="text-lg">{option}</span>
                            <Progress
                              value={
                                (count /
                                  Object.values(options).reduce(
                                    (a, b) => a + b,
                                    0
                                  )) *
                                100
                              }
                              style={{ fill: "green" }}
                              className="h-[0.70rem] w-full"
                              color="green"
                              role="checkbox"
                            />
                          </div>
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </label>
            </li>
          ))}
        </ul>
      </form>
      <div className="flex items-center justify-center">
        <Link
          to={"/view-results"}
          className="text-purple-500 border-gray-200 text-center border px-2 py-1 rounded-md"
        >
          View Results
        </Link>
      </div>
    </Form>
  );
};
