import React, { FC, useContext } from "react";
import { SubmissionContext } from "../SnoopForm/SnoopForm";

interface ClassNames {
  label?: string;
  element?: string;
  button?: string;
}

interface Props {
  label?: string;
  classNames?: ClassNames;
}

export const Submit: FC<Props> = ({ classNames, label }) => {
  const { submission, setSubmission } = useContext(SubmissionContext);
  return (
    <button type="submit" className={classNames?.button}>
      {label || "Submit"}
    </button>
  );
};
