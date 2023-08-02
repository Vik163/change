import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { EditableProfileCard } from '@/features/editableProfileCard';

// const reducers: ReducersList = {
//     profile: profileReducer,
// };

interface ProfilePageProps {
    className?: string;
}

// подключить страницу app/providers/router/routeConfig
const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        // <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <Page
            data-testid="ProfilePage"
            className={classNames('', {}, [className])}
        >
            <VStack gap="16" max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
        // </DynamicModuleLoader>
    );
};

// export default, чтобы работали чанки
export default ProfilePage;
