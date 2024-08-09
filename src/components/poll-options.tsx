import React, { useContext, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { Form, FormControl, FormItem, FormLabel } from "./ui/form";
import { UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormValues } from "@/pages/view-polls";
import { PollContext } from "@/context/poll-context";

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
  question: string;
}

export const PollOptions: React.FC<PollOptionsProps> = ({
  question,
  options,
  handleVote,
  form,
  onSubmit,
}) => {
  const { handleAddVote: handleAddVote, vote } = useContext(PollContext);

  useEffect(() => {
    const selectedOption = vote?.[question];
    if (selectedOption) form.setValue("selectedOption", selectedOption);
  }, [question, form]);

  const handleChange = ({
    checked,
    option,
  }: {
    option: string;
    checked: boolean;
  }) => {
    handleVote(option, checked);
    form.setValue("selectedOption", checked ? option : undefined);
    // console.log(checked);
    if (!checked) handleAddVote({ question, option: null });
    else
      handleAddVote({
        question,
        option,
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ul className="w-full space-y-2 max-h-[16rem] overflow-y-auto">
          {Object.entries(options).map(([option, count]) => (
            <li key={option} className="w-full">
              <label
                htmlFor={option}
                className="w-full flex flex-row items-center gap-2"
              >
                <div className="flex w-full flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                  <FormItem className="flex w-full flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        {...form.register("selectedOption")}
                        checked={vote?.[question] === option}
                        onCheckedChange={(checked: boolean) =>
                          handleChange({ checked, option })
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
                            className="h-[0.70rem] w-full"
                            color="green"
                            role="checkbox"
                          />
                        </div>
                      </FormLabel>
                    </div>
                  </FormItem>
                </div>
              </label>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center">
          <Link
            to={"/view-results"}
            className="text-purple-500 border-gray-200 text-center border px-2 py-1 rounded-md"
          >
            View Results
          </Link>
        </div>
      </form>
    </Form>
  );
};
