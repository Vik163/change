import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/ui/Stack';
import { EditableProfileCard } from 'features/editableProfileCard';

// const reducers: ReducersList = {
//     profile: profileReducer,
// };

interface ProfilePageProps {
    className?: string;
}

// подключить страницу app/providers/router/routeConfig
const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{ id: string }>();

    // const { t } = useTranslation('profile');
    // const dispatch = useAppDispatch();
    // const formData = useSelector(getProfileForm);
    // const isLoading = useSelector(getProfileIsLoading);
    // const error = useSelector(getProfileError);
    // const readonly = useSelector(getProfileReadonly);
    // const validateErrors = useSelector(getProfileValidateErrors);

    // Переводы - мапинг
    // const validateErrorTranslates = {
    //     [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
    //     [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
    //     [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    //     [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    //     [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    // };

    // useInitialEffect(() => {
    //     if (id) {
    //         dispatch(fetchProfileData(id));
    //     }
    // });

    // const onChangeFirstname = useCallback((value?: string) => {
    //     dispatch(profileActions.updateProfile({ first: value || '' }));
    // }, [dispatch]);

    // const onChangeLastname = useCallback((value?: string) => {
    //     dispatch(profileActions.updateProfile({ lastname: value || '' }));
    // }, [dispatch]);

    // const onChangeCity = useCallback((value?: string) => {
    //     dispatch(profileActions.updateProfile({ city: value || '' }));
    // }, [dispatch]);

    // const onChangeAge = useCallback((value?: string) => {
    //     dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
    // }, [dispatch]);

    // const onChangeUsername = useCallback((value?: string) => {
    //     dispatch(profileActions.updateProfile({ username: value || '' }));
    // }, [dispatch]);

    // const onChangeAvatar = useCallback((value?: string) => {
    //     dispatch(profileActions.updateProfile({ avatar: value || '' }));
    // }, [dispatch]);

    // const onChangeCurrency = useCallback((currency: Currency) => {
    //     dispatch(profileActions.updateProfile({ currency }));
    // }, [dispatch]);

    // const onChangeCountry = useCallback((country: Country) => {
    //     dispatch(profileActions.updateProfile({ country }));
    // }, [dispatch]);

    return (
        // <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <Page className={classNames('', {}, [className])}>
            <VStack gap="16" max>
                <EditableProfileCard id={id} />
                {/* {validateErrors?.length && validateErrors.map((err) => (
                        <Text
                            key={err}
                            theme={TextTheme.ERROR}
                            text={validateErrorTranslates[err]}
                        />
                    ))}
                    <ProfileCard
                        data={formData}
                        isLoading={isLoading}
                        error={error}
                        readonly={readonly}
                        onChangeFirstname={onChangeFirstname}
                        onChangeLastname={onChangeLastname}
                        onChangeAge={onChangeAge}
                        onChangeCity={onChangeCity}
                        onChangeUsername={onChangeUsername}
                        onChangeAvatar={onChangeAvatar}
                        onChangeCurrency={onChangeCurrency}
                        onChangeCountry={onChangeCountry}
                    /> */}
            </VStack>
        </Page>
        // </DynamicModuleLoader>
    );
};

// export default, чтобы работали чанки
export default ProfilePage;
