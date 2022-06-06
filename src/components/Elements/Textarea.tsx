import React, { FC, useContext } from "react";
import { SubmissionContext } from "../SnoopForm/SnoopForm";

interface ClassNames {
  label?: string;
  element?: string;
}

interface Props {
  name: string;
  placeholder?: string;
  rows?: number;
  classNames: ClassNames;
  required: boolean;
}

export const Textarea: FC<Props> = ({
  name,
  classNames,
  placeholder,
  rows,
  required,
}) => {
  const { submission, setSubmission } = useContext(SubmissionContext);
  return (
    <textarea
      rows={rows}
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
