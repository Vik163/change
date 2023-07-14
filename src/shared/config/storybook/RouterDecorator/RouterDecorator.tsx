import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// StoryComponent 11_7 5min
export const RouterDecorator = (StoryComponent: Story) => (
    <BrowserRouter>
        <StoryComponent />
    </BrowserRouter>
);
