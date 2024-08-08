import { IoCloseCircleOutline } from "react-icons/io5";

interface FormErrorsProps {
  id: string;
  errors: any;
}

export const FormErrors = ({ id, errors }: FormErrorsProps) => {
  const errorMessage = errors?.message;

  return (
    errorMessage && (
      <div className="flex gap-1 items-center mt-1">
        <IoCloseCircleOutline size={16} className="text-rose-500" />
        <p className="text-xs text-rose-600">{errorMessage}</p>
      </div>
    )
  );
};
