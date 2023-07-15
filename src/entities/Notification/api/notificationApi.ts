import { rtkApi } from 'shared/api/rtkApi';
import { Article } from 'entities/Article';
import { Notification } from '../model/types/notification';

// 12_1 17min
const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
