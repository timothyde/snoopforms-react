import { RadioGroup } from "@headlessui/react";
import React, { FC, useContext } from "react";
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

export const Radio: FC<Props> = ({ name, options, classNames, required }) => {
  const { submission, setSubmission }: any = useContext(SubmissionContext);
  const pageName = useContext(PageContext);

  return (
    <div>
      <RadioGroup
        value={submission[name]}
        onChange={(v) =>
          setSubmissionValue(v, pageName, name, submission, setSubmission)
        }
        className={classNames.radioGroup}
      >
        {options.map((option) => (
          <RadioGroup.Option
            key={typeof option === "object" ? option.value : option}
            value={typeof option === "object" ? option.value : option}
            className={classNames.radioOption}
          >
            <RadioGroup.Label as="span">
              {typeof option === "object" ? option.label : option}
            </RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
};
