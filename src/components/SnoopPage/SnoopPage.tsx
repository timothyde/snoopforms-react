import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { SchemaContext } from "../SnoopForm/SnoopForm";

export const PageContext = createContext("");

interface Props {
  name: string;
  className?: string;
  children?: ReactNode;
}

export const SnoopPage: FC<Props> = ({ name, className, children }) => {
  const { schema, setSchema } = useContext(SchemaContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    setSchema((schema: any) => {
      const newSchema = { ...schema };
      let pageIdx = newSchema.pages.findIndex((p: any) => p.name === name);
      if (pageIdx !== -1) {
        console.warn(
          `🦝 SnoopForms: Page with the name "${name}" already exists`
        );
        return;
      }
      newSchema.pages.push({ name, elements: [] });
      setInitializing(false);
      return newSchema;
    });
  }, [name]);

  return (
    <PageContext.Provider value={name}>
      <div className={className}> {!initializing && children}</div>
    </PageContext.Provider>
  );
};
