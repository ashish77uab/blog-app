import { ErrorMessage } from "formik";
import React from "react";

const SelectField = ({
  className,
  addonRight,
  label,
  error,
  name,
  helperText,
  options,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor="">{label}</label>}
      <div className="relative">
        <select 
        name={name}
          {...rest} className={`input-field  ${className} ${error ? "border-red-500" : "border-zinc-200"
            }`}>
              {
                options?.map((option)=>(
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))
              }
            </select>
        
        {addonRight ? addonRight : null}
      </div>
      {helperText && <p className="text-gray-600 text-xs">{helperText}</p>}
      {name && <ErrorMessage name={name} component={'div'} className="form-error"></ErrorMessage>}
    </div>
  );
};

export default SelectField;
