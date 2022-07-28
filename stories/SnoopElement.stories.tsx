import { Meta, Story } from '@storybook/react';
import React from 'react';
import { SnoopElement } from '../src';
import { SnoopElementProps } from '../src/components/SnoopElement/SnoopElement';

const meta: Meta = {
  title: 'Snoop/SnoopElement',
  component: SnoopElement,
  argTypes: {
    type: {
      defaultValue: 'text',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<SnoopElementProps> = args => <SnoopElement {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
};
