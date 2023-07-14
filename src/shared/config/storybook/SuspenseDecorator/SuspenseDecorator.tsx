import { Story } from '@storybook/react';
import { Suspense } from 'react';

// 11_7 14min
export const SuspenseDecorator = (StoryComponent: Story) => (
    <Suspense>
        <StoryComponent />
    </Suspense>
);
