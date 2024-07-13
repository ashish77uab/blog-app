import { ErrorMessage } from "formik";
import React from "react";

const TextInput = ({
  className,
  addonRight,
  label,
  error,
  name,
  helperText,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor="">{label}</label>}
      <div className="relative">
        <input
          name={name}
          {...rest}
          className={`input-field  ${className} ${error ? "border-red-500" : "border-zinc-200"
            }`}
        />
        {addonRight ? addonRight : null}
      </div>
      {helperText && <p className="text-gray-600 text-xs">{helperText}</p>}
      {name && <ErrorMessage name={name} component={'div'} className="form-error"></ErrorMessage>}
    </div>
  );
};

export default TextInput;
