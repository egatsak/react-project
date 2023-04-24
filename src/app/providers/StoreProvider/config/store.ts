import {
    CombinedState,
    configureStore,
    Reducer,
    /*     Dispatch,
    isAnyOf,
    isFulfilled, */
    ReducersMapObject,
} from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { $api } from "shared/api/api";
import { createReducerManager } from "./reducerManager";
import { StateSchema, ThunkExtraArg } from "./StateSchema";

/* !!!!!!!!!!!!!!!!!!!!!!!!lesson 34 see comments!
interface Store {
    dispatch: Dispatch;
    getState: () => StateSchema;
}

const isLoggedIn = isFulfilled(loginByUsername);
const isLoggedOut = isAnyOf(userActions.logout);

export const authMiddleware =
    (store: Store) =>
    (next: (action: Action) => void) =>
    (action: Action): void => {
        if (isLoggedIn(action)) {
            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                JSON.stringify(action.payload)
            );
        }

        if (isLoggedOut(action)) {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        }

        next(action);
    }; */

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = { api: $api };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
