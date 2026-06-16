import { forwardRef, type SelectHTMLAttributes } from "react";
import "./SelectField.scss";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  labelText: string;
  optionDefaultText: string;
  options: SelectOption[];
  error?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ id, labelText, optionDefaultText, options, error, ...props }, ref) => (
    <div className="select">
      <label className="select__label" htmlFor={id}>
        {labelText}
      </label>
      <div className="select__contain">
        <select className="select__field" id={id} ref={ref} {...props}>
          <option value="0" disabled>
            {optionDefaultText}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error ? <p className="text--error">{error}</p> : null}
    </div>
  )
);

SelectField.displayName = "SelectField";
