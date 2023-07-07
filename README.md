# ASTON MOVIES

Сделано приложение для поиска фильмов.

Реализованы следующие требования к функциональности:

## 1 уровень (необходимый минимум)

### React

- Функциональные компоненты c хуками в приоритете над классовыми: [components](https://github.com/Andrew-Marty00shenko/aston-project/tree/main/src/components), [pages](https://github.com/Andrew-Marty00shenko/aston-project/tree/main/src/pages/Public).
- Есть разделение на умные и глупые компоненты
  Умные: [SearchPanel](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/components/SearchPanel.tsx), [Pagination](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/components/Pagination.tsx), [MovieCard](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/components/MovieCard.tsx), [HistoryItem](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/components/HistoryItem.tsx) и т.д.
  Глупые: [Button](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/elements/Button.tsx), [SelectField](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/elements/SelectField.tsx), [InputField](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/elements/InputField.tsx) и т.д.
- Есть рендеринг списков: [Main](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/pages/Public/Main.tsx), [History](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/pages/Public/History.tsx), [Search](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/pages/Public/Search.tsx), [Favorites](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/pages/Public/Favorites.tsx), [SuggestsMovies](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/components/SuggestsMovies.tsx) и т.д.
- Реализована хотя бы одна форма: [Login](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/pages/Public/Login/Login.tsx), [Registration](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/pages/Public/Registration/Registration.tsx), [SearchPanel](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/components/SearchPanel.tsx).
- Есть применение Контекст API: [featureFlag](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/context/featureFlag.tsx) в [App](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/App.tsx).
- Есть применение предохранителя: [ErrorBoundary](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/components/ErrorBoundary.tsx) [App](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/App.tsx).
- Есть хотя бы один кастомный хук: [useDebounce](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/hooks/useDebounce.ts), [useOutside](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/hooks/useOutside.ts), [useReadLocalStorage](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/hooks/useReadLocalStorage.ts).
- Хотя бы несколько компонентов используют PropTypes: [HistoryItem](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/components/HistoryItem.tsx), [Pagination](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/components/Pagination.tsx).
- Поиск не должен триггерить много запросов к серверу: [useDebounce](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/hooks/useDebounce.ts), использован в компоненте [SearchPanel](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/components/SearchPanel.tsx).
- Есть применение lazy + Suspense: [Routes](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/routes/Routes.tsx).

### Redux

- Используем Modern Redux with Redux Toolkit: [store](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/redux/store.ts).
- Используем слайсы: [authSlice](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/redux/slices/authSlice.ts).
- Есть хотя бы одна кастомная мидлвара: [authMiddleware](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/redux/middlewares/authMiddleware.ts).
- Используется RTK Query: [favoritesService](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/services/favoritesService.ts), [historyService](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/services/historyService.ts), [moviesService](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/services/moviesService.ts).
- Используется Transforming Responses: [transformResponse of moviesService](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/services/transformResponses/moviesTransfromResponse.ts), [transformResponse of historyService](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/services/transformResponses/historyTransformResponse.ts), [transformResponse of favoritesService](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/services/transformResponses/favoritesTransformResponse.ts).

## 2 уровень

- Использован TypeScript.
- Использование Firebase для учетных записей пользователей и их Избранного и Истории поиска: [config](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/firebase.config.ts), применение: [auth](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/redux/actions/authActions.ts), [favorites](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/services/favoritesService.ts), [history](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/services/historyService.ts).
- Feature Flags. Реализована фича “Поделиться в телеграм”, закрытую под фича флагом.

  1. [x] Если флаг с этой фичей включен, то у карточки единицы информации должна появиться кнопка “Поделиться”. [ShareTelegram](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/components/ShareTelegram.tsx);
  2. [x] Флаг должен присылаться с локального сервера. Для этого нужно написать простой сервер, который по http-запросу на /api/feature-flags отдаст объект с флагом { isTelegramShareEnabled: true } [server](https://github.com/Andrew-Marty00shenko/aston-project/tree/main/server);
  3. [x] Флаг положить в react context, забрать из контекста в необходимом месте приложения и включить фичу.[featureFlag](https://github.com/Andrew-Marty00shenko/aston-project/blob/main/src/context/featureFlag.tsx).

  ###Deploy link
  [ASTON MOVIES](https://aston-movies.netlify.app)
