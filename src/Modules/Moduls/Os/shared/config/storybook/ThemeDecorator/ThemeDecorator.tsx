import { type Preview } from '@storybook/react';

const theme = 'dark';

const ThemeDecorator: Preview = {
  decorators: [
    (Story) => (
      <div className={`'app' ${theme}`}>
        <Story />
      </div>
    ),
  ],
};

export default ThemeDecorator;
