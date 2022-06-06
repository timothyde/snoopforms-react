import { RadioGroup } from "@headlessui/react";
import React, { FC, useContext, useState } from "react";
import { setSubmissionValue } from "../../lib/elements";
import { SubmissionContext } from "../SnoopForm/SnoopForm";
import { PageContext } from "../SnoopPage/SnoopPage";

interface ClassNames {
  label?: string;
  element?: string;
  radioOption?: string | ((bag: any) => string) | undefined;
  radioGroup?: string;
}

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
        {/* <RadioGroup.Label className="sr-only">
          Choose an option
        </RadioGroup.Label> */}
        <div className="grid grid-cols-11 gap-3">
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
        </div>
      </RadioGroup>
    </div>
  );
};
