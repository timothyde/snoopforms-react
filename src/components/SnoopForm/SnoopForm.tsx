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

export const CurrentPageContext = createContext({
  currentPageIdx: 0,
  setCurrentPageIdx: (currentPageIdx: number) => {
    // do nothing
  },
});

export const SubmitHandlerContext = createContext((pageName: string) => {});

interface onSubmitProps {
  submission: any;
  schema: any;
}

interface Props {
  domain: string;
  formId: string;
  protocol?: "http" | "https";
  className?: string;
  onSubmit?: (obj: onSubmitProps) => void;
  children?: ReactNode;
}

export const SnoopForm: FC<Props> = ({
  domain = "app.snoopforms.com",
  formId,
  protocol = "https",
  className = "",
  onSubmit = (): any => {},
  children,
}) => {
  const [schema, setSchema] = useState<any>({ pages: [] });
  const [submission, setSubmission] = useState<any>({});
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [answerSessionId, setAnswerSessionId] = useState("");

  const handleSubmit = async (pageName: string) => {
    let _answerSessionId = answerSessionId;
    // create answer session if it don't exist
    if (!_answerSessionId) {
      const answerSession: any = await fetch(
        `${protocol}://${domain}/api/forms/${formId}/answerSessions/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      _answerSessionId = answerSession.id;
      setAnswerSessionId(_answerSessionId);
    }
    // send answer to snoop platform
    await fetch(
      `${protocol}://${domain}/api/forms/${formId}/answerSessions/${_answerSessionId}/answers`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageName, submission: submission[pageName] }),
      }
    );
    const maxPageIdx = schema.pages.length - 1;
    const hasThankYou = schema.pages[maxPageIdx].type === "thankyou";
    if (currentPageIdx < maxPageIdx) {
      setCurrentPageIdx(currentPageIdx + 1);
    }
    if (
      (!hasThankYou && currentPageIdx === maxPageIdx) ||
      (hasThankYou && currentPageIdx === maxPageIdx - 1)
    ) {
      return onSubmit({ submission, schema });
    }
  };

  return (
    <SubmitHandlerContext.Provider value={handleSubmit}>
      <SchemaContext.Provider value={{ schema, setSchema }}>
        <SubmissionContext.Provider value={{ submission, setSubmission }}>
          <CurrentPageContext.Provider
            value={{ currentPageIdx, setCurrentPageIdx }}
          >
            <div className={className}>{children}</div>
          </CurrentPageContext.Provider>
        </SubmissionContext.Provider>
      </SchemaContext.Provider>
    </SubmitHandlerContext.Provider>
  );
};
