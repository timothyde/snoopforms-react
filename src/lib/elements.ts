export const setSubmissionValue = (
  v: any,
  pageName: string,
  name: string,
  submission: any,
  setSubmission: (s: any) => void
) => {
  setSubmission((submission: any) => {
    const newSubmission = { ...submission };
    if (!(pageName in newSubmission)) {
      newSubmission[pageName] = {};
    }
    newSubmission[pageName][name] = v;
    return newSubmission;
  });
};
