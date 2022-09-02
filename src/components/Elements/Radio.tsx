import React, { FC, useContext } from 'react';
import { setSubmissionValue } from '../../lib/elements';
import { ClassNames } from '../../types';
import { SubmissionContext } from '../SnoopForm/SnoopForm';
import { PageContext } from '../SnoopPage/SnoopPage';

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label?: string;
  help?: string;
  options: (Option | string)[];
  placeholder?: string;
  classNames: ClassNames;
  required?: boolean;
}

export const Radio: FC<Props> = ({
  name,
  label,
  help,
  options,
  classNames,
}) => {
  const { setSubmission }: any = useContext(SubmissionContext);
  const pageName = useContext(PageContext);

  return (
    <div>
      {label && (
        <label
          className={
            classNames.label || 'block text-sm font-medium text-gray-700'
          }
        >
          {label}
        </label>
      )}
      <fieldset className="mt-2">
        <legend className="sr-only">Please choose an option</legend>
        <div className="space-y-2">
          {options.map(option => (
            <div
              key={typeof option === 'object' ? option.value : option}
              className="flex items-center"
            >
              <input
                id={typeof option === 'object' ? option.value : option}
                name="notification-method"
                type="radio"
                className={
                  classNames.element ||
                  'focus:ring-slate-500 h-4 w-4 text-slate-600 border-gray-300'
                }
                onClick={() =>
                  setSubmissionValue(
                    typeof option === 'object' ? option.value : option,
                    pageName,
                    name,
                    setSubmission
                  )
                }
              />
              <label
                htmlFor={typeof option === 'object' ? option.value : option}
                className={
                  classNames.elementLabel ||
                  'block ml-3 text-base font-medium text-gray-700'
                }
              >
                {typeof option === 'object' ? option.label : option}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      {help && (
        <p className={classNames.help || 'mt-2 text-sm text-gray-500'}>
          {help}
        </p>
      )}
    </div>
  );
};
