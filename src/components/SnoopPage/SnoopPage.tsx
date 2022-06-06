import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CurrentPageContext,
  SchemaContext,
  SubmitHandlerContext,
} from "../SnoopForm/SnoopForm";

export const PageContext = createContext("");

interface Props {
  name: string;
  className?: string;
  children?: ReactNode;
  thankyou?: boolean;
}

export const SnoopPage: FC<Props> = ({
  name,
  className,
  children,
  thankyou = false,
}) => {
  const { schema, setSchema } = useContext<any>(SchemaContext);
  const { currentPageIdx, setCurrentPageIdx } = useContext(CurrentPageContext);
  const handleSubmit = useContext(SubmitHandlerContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    setSchema((schema: any) => {
      const newSchema = { ...schema };
      let pageIdx = newSchema.pages.findIndex((p: any) => p.name === name);
      if (pageIdx !== -1) {
        console.warn(
          `🦝 SnoopForms: Page with the name "${name}" already exists`
        );
        return newSchema;
      }
      if (thankyou) {
        newSchema.pages.push({ name, type: "thankyou" });
      } else {
        newSchema.pages.push({ name, type: "form", elements: [] });
      }

      return newSchema;
    });
  }, [name]);

  useEffect(() => {
    if (initializing) {
      let pageIdx = schema.pages.findIndex((p: any) => p.name === name);
      if (pageIdx !== -1) {
        setInitializing(false);
      }
    }
  }, [schema]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(name);
  };

  if (initializing) {
    return <div />;
  }

  return (
    <PageContext.Provider value={name}>
      {currentPageIdx ===
        schema.pages.findIndex((p: any) => p.name === name) && (
        <form className={className} onSubmit={onSubmit}>
          {children}
        </form>
      )}
    </PageContext.Provider>
  );
};
