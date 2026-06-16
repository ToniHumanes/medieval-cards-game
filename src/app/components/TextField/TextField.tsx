import { forwardRef, type InputHTMLAttributes } from "react";
import "./TextField.scss";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, labelText, error, ...props }, ref) => (
    <div className="input">
      <label className="input__label" htmlFor={id}>
        {labelText}
      </label>
      <input className="input__field" id={id} ref={ref} {...props} />
      {error ? <p className="text--error">{error}</p> : null}
    </div>
  )
);

TextField.displayName = "TextField";
