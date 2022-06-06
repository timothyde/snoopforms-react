import React, { FC, useContext, useEffect } from "react";
import { SchemaContext, SubmissionContext } from "../SnoopForm/SnoopForm";
import { PageContext } from "../SnoopPage/SnoopPage";
import { Text } from "../Elements/Text";
import { Radio } from "../Elements/Radio";
import { Textarea } from "../Elements/Textarea";

interface Option {
  label: string;
  value: string;
}

interface ClassNames {
  label?: string;
  element?: string;
}

interface Props {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  classNames?: ClassNames;
  required?: boolean;
  options?: Option[];
  rows?: number;
}

export const SnoopElement: FC<Props> = ({
  type,
  name,
  label = null,
  placeholder,
  classNames = {},
  required = false,
  options,
  rows,
}) => {
  const { schema, setSchema } = useContext(SchemaContext);
  const pageName = useContext(PageContext);

  useEffect(() => {
    setSchema((schema: any) => {
      if (pageName === "") {
        console.warn(
          `🦝 SnoopForms: An Element must always be a child of a page!`
        );
        return;
      }
      const newSchema = { ...schema };
      let pageIdx = newSchema.pages.findIndex((p: any) => p.name === pageName);
      if (pageIdx === -1) {
        console.warn(`🦝 SnoopForms: Error accessing page`);
        return;
      }
      let elementIdx = newSchema.pages[pageIdx].elements.findIndex(
        (e: any) => e.name === name
      );
      if (elementIdx === -1) {
        newSchema.pages[pageIdx].elements.push({ name });
        elementIdx = newSchema.pages[pageIdx].elements.length - 1;
      }
      newSchema.pages[pageIdx].elements[elementIdx].type = type;
      newSchema.pages[pageIdx].elements[elementIdx].label = label;
      return newSchema;
    });
  }, [name, setSchema, pageName]);

  return (
    <div>
      {label && (
        <label htmlFor={name} className={classNames.label}>
          {label}
        </label>
      )}
      {type === "radio" ? (
        <Radio
          name={name}
          classNames={classNames}
          required={required}
          options={options || []}
        />
      ) : type === "text" ? (
        <Text
          name={name}
          placeholder={placeholder}
          classNames={classNames}
          required={required}
        />
      ) : type === "textarea" ? (
        <Textarea
          name={name}
          rows={rows}
          placeholder={placeholder}
          classNames={classNames}
          required={required}
        />
      ) : null}
    </div>
  );
};
