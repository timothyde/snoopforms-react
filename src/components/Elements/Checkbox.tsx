import { RadioGroup } from "@headlessui/react";
import React, { FC, useContext, useState } from "react";
import { setSubmissionValue } from "../../lib/elements";
import { SubmissionContext } from "../SnoopForm/SnoopForm";
import { PageContext } from "../SnoopPage/SnoopPage";
import { ClassNames } from "../../types";

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  options: Option[] | string[];
  placeholder?: string;
  classNames: ClassNames;
  required: boolean;
}

export const Checkbox: FC<Props> = ({
  name,
  options,
  classNames,
  required,
}) => {
  const [checked, setChecked] = useState<string[]>([]);
  const { submission, setSubmission }: any = useContext(SubmissionContext);
  const pageName = useContext(PageContext);

  return (
    <div>
      {options.map((option) => (
        <div
          className=""
          key={typeof option === "object" ? option.value : option}
        >
          <div className="">
            <input
              id={typeof option === "object" ? option.value : option}
              name={typeof option === "object" ? option.value : option}
              type="checkbox"
              className={classNames.element}
              checked={
                typeof option === "object"
                  ? checked.includes(option.value)
                  : checked.includes(option)
              }
              onChange={(e) => {
                const newChecked: string[] = [...checked];
                const value =
                  typeof option === "object" ? option.value : option;
                if (e.target.checked) {
                  newChecked.push(value);
                } else {
                  const idx = newChecked.findIndex((v) => v === value);
                  if (idx >= 0) {
                    newChecked.splice(idx, 1);
                  }
                }
                setChecked(newChecked);
                setSubmissionValue(
                  newChecked,
                  pageName,
                  name,
                  submission,
                  setSubmission
                );
              }}
            />
          </div>
          <div>
            <label
              htmlFor={typeof option === "object" ? option.value : option}
              className={classNames.elementLabel}
            >
              {typeof option === "object" ? option.label : option}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};
