import React, { FC, useContext } from "react";
import { SubmissionContext } from "../SnoopForm/SnoopForm";

interface ClassNames {
  label?: string;
  element?: string;
}

interface Props {
  name: string;
  placeholder?: string;
  classNames: ClassNames;
  required: boolean;
}

export const Text: FC<Props> = ({
  name,
  classNames,
  placeholder,
  required,
}) => {
  const { submission, setSubmission } = useContext(SubmissionContext);
  return (
    <input
      type="text"
      name={name}
      id={`input-${name}`}
      className={classNames.element}
      placeholder={placeholder}
      onChange={(e) =>
        setSubmission((submission: any) => ({
          ...submission,
          [name]: e.target.value,
        }))
      }
      required={required}
    />
  );
};
