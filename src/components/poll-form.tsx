import React, { ChangeEvent, useEffect } from "react";
import { FormInput } from "./form/form-input";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { PollOption } from "./create-poll";
import { toast } from "sonner";

interface PollFormProps {
  pollQuestion: string;
  pollOptions: PollOption[];
  handleCreatePoll: (data: any) => void;
}

const FormSchema = z.object({
  pollQuestion: z.string().min(1, "Poll question is required"),
  pollOptions: z
    .array(
      z.object({
        option: z.string(),
      })
    )
    .min(2, "At least two options are required"),
});

type FieldTypes = z.infer<typeof FormSchema>;
const ErrorToastClassNames = {
  toast: "bg-blue-400 flex item-center justify-center p-2 gap-1",
  title: "text-red-400 text-sm",
  description: "text-red-400",
  actionButton: "bg-zinc-400",
  cancelButton: "bg-orange-400 px-2",
  closeButton: "bg-lime-400",
  icon: "my-auto",
};

export const PollForm: React.FC<PollFormProps> = ({
  pollQuestion,
  pollOptions,
  handleCreatePoll,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FieldTypes>({
    resolver: zodResolver(FormSchema),
    mode: "all",
    defaultValues: {
      pollQuestion,
      pollOptions,
    },
  });

  let { fields, append, remove } = useFieldArray<any>({
    control,
    name: "pollOptions",
  });

  const onSubmit = (data: FieldTypes) => {
    const { pollOptions } = data;
    const filteredData = pollOptions.filter((option) => {
      if (option.option != "") return option;
    });

    const uniqueOptions = new Set(filteredData.map((value) => value.option));
    if (filteredData.length < 2) {
      return toast.error("The poll should have atleast two unique options", {
        cancel: {
          label: <IoCloseOutline size={20} />,
          onClick: () => null,
        },
        unstyled: true,
        classNames: ErrorToastClassNames,
      });
    } else if (uniqueOptions.size !== filteredData.length)
      return toast.error("All poll option need to be unique", {
        cancel: {
          label: <IoCloseOutline size={20} />,
          onClick: () => null,
        },
        unstyled: true,
        classNames: ErrorToastClassNames,
      });

    handleCreatePoll({ ...data, pollOptions: filteredData });
    reset({ pollQuestion: "", pollOptions: [{ option: "" }, { option: "" }] });
  };

  const handleRemove = (index: number) => {
    if (index === 0 || index === 1) return;
    remove(index);
  };
  const watchOptions = useWatch({
    name: "pollOptions",
    control,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      watchOptions.length > 0 &&
      watchOptions[watchOptions.length - 1].option.length > 0
    ) {
      append({ option: "" }, { focusIndex: watchOptions.length - 1 });
    }
  };

  useEffect(() => {}, [watchOptions]);

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <h2 className="block text-gray-700 font-semibold mb-2">Question</h2>
        <FormInput
          id="pollQuestion"
          type="text"
          placeholder="Type poll question"
          {...register("pollQuestion")}
          errors={errors.pollQuestion}
        />
      </div>

      <div className="flex flex-col">
        <h2 className="block text-gray-700 font-semibold mb-2">Options</h2>
        <ul>
          {fields.map((field, index) => (
            <li key={field.id} className="mb-4 relative">
              <FormInput
                id={`pollOptions.${index}.option`}
                placeholder="+ Add option"
                {...register(`pollOptions.${index}.option`, {
                  onChange: (e) => handleChange(e),
                })}
                errors={errors.pollOptions && errors.pollOptions[index]?.option}
              />
              {index !== 0 && index !== 1 && (
                <div className="absolute right-0 top-0">
                  <Button
                    type="button"
                    onClick={() => handleRemove(index)}
                    variant="transparent"
                    size={"sm"}
                    className="hover:font-bold hover:text-xl hover:scale-125"
                  >
                    <IoCloseOutline size={16} />
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {errors.pollOptions?.message && (
        <div className="text-red-500 text-sm mt-2">
          {errors.pollOptions.message}
        </div>
      )}
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
      >
        Create Poll
      </button>
    </form>
  );
};
