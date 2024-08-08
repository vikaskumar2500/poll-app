import { forwardRef } from "react";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import { FormErrors } from "./form-errors";

interface FormInputProps extends InputProps {
  label?: string;
  id: string;
  name?: string;
  errors?: any;
  type?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, id, errors, name, type = "text", ...props }, ref) => {
    return (
      <div>
        <div className="flex flex-col gap-1">
          {label ? <Label className="">{label}</Label> : null}
          <Input ref={ref} type={type} id={id} name={id || name} {...props} />
        </div>
        {errors ? <FormErrors id={id} errors={errors} /> : null}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
