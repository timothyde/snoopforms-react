import React, { FC, useContext } from "react";
import { SubmissionContext } from "../SnoopForm/SnoopForm";
import { ClassNames } from "../../types";

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
