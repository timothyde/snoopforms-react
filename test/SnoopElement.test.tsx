import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as SnoopElement } from '../stories/SnoopElement.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SnoopElement type="text" name="test" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
