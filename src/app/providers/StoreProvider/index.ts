import { StoreProvider } from "./ui/StoreProvider";
import { createReduxStore } from "./config/store";
import type { AppDispatch } from "./config/store";
import type {
    StateSchema,
    ThunkConfig,
    ReduxStoreWithManager,
} from "./config/StateSchema";

export {
    StoreProvider,
    createReduxStore,
    StateSchema,
    AppDispatch,
    ThunkConfig,
    ReduxStoreWithManager,
};
