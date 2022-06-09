import React, { FC, useContext } from "react";
import { setSubmissionValue } from "../../lib/elements";
import { SubmissionContext } from "../SnoopForm/SnoopForm";
import { PageContext } from "../SnoopPage/SnoopPage";
import { ClassNames } from "../../types";

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
  const pageName = useContext(PageContext);
  return (
    <textarea
      rows={rows}
      name={name}
      id={`input-${name}`}
      className={classNames.element}
      placeholder={placeholder}
      onChange={(e) =>
        setSubmissionValue(
          e.target.value,
          pageName,
          name,
          submission,
          setSubmission
        )
      }
      required={required}
    />
  );
};
