import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import FingerprintJS, { Agent } from "@fingerprintjs/fingerprintjs";

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
  localOnly?: boolean;
  className?: string;
  onSubmit?: (obj: onSubmitProps) => void;
  children?: ReactNode;
}

export const SnoopForm: FC<Props> = ({
  domain = "app.snoopforms.com",
  formId,
  protocol = "https",
  localOnly = false,
  className = "",
  onSubmit = (): any => {},
  children,
}) => {
  const [schema, setSchema] = useState<any>({ pages: [] });
  const [submission, setSubmission] = useState<any>({});
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [submissionSessionId, setSubmissionSessionId] = useState("");
  const [fp, setFp] = useState<Agent>();

  useEffect(() => {
    FingerprintJS.load({ monitoring: false }).then((f) => setFp(f));
  });

  const handleSubmit = async (pageName: string) => {
    let _submissionSessionId = submissionSessionId;
    if (!localOnly) {
      // create answer session if it don't exist
      try {
        if (typeof fp === "undefined") {
          console.error(
            `Unable to send submission to snoopHub. Error: Can't initialize fingerprint`
          );
          return;
        }
        if (!_submissionSessionId) {
          // get digital fingerprint of user for unique user feature
          const fpResult = await fp.get();
          // create new submissionSession in snoopHub
          const submissionSessionRes: any = await fetch(
            `${protocol}://${domain}/api/forms/${formId}/submissionSessions`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userFingerprint: fpResult.visitorId,
              }),
            }
          );
          const submissionSession = await submissionSessionRes.json();
          _submissionSessionId = submissionSession.id;
          setSubmissionSessionId(_submissionSessionId);
        }
        // send answer to snoop platform
        await fetch(`${protocol}://${domain}/api/forms/${formId}/event`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            events: [
              {
                type: "pageSubmission",
                data: {
                  pageName,
                  submissionSessionId: _submissionSessionId,
                  submission: submission[pageName],
                },
              },
              // update schema
              // TODO: do conditionally only when requested by the snoopHub
              { type: "updateSchema", data: schema },
            ],
          }),
        });
      } catch (e) {
        console.error(`Unable to send submission to snoopHub. Error: ${e}`);
      }
    }
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
