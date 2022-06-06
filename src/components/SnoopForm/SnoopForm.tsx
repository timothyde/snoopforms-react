import React, { createContext, FC, ReactNode, useState } from "react";

export const SchemaContext = createContext({
  schema: { pages: [] },
  setSchema: (schema: any) => {
    // do nothing
  },
});

export const SubmissionContext = createContext({
  submission: {},
  setSubmission: (submission: any) => {
    // do nothing
  },
});

interface Props {
  domain: string;
  protocol?: "http" | "https";
  className?: string;
  onSubmit?: () => void;
  children?: ReactNode;
}

export const SnoopForm: FC<Props> = ({
  domain = "app.snoopforms.com",
  protocol = "https",
  className = "",
  onSubmit = () => {
    // do nothing
  },
  children,
}) => {
  const [schema, setSchema] = useState({ pages: [] });
  const [submission, setSubmission] = useState({});

  console.log("schema: ", JSON.stringify(schema, null, 2));

  console.log("submission: ", JSON.stringify(submission, null, 2));

  const handleSubmit = async () => {
    // send data to endpoint
    await fetch(
      `${protocol}://${domain}/api/forms/123/answerSessions/123/answers`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      }
    );
    return onSubmit();
  };
  return (
    <SchemaContext.Provider value={{ schema, setSchema }}>
      <SubmissionContext.Provider value={{ submission, setSubmission }}>
        <div className={className}>{children}</div>
      </SubmissionContext.Provider>
    </SchemaContext.Provider>
  );
};
