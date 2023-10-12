import { Action, AnyAction, configureStore, Store, ThunkAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import { persistStore, persistReducer, PERSIST, PURGE, REHYDRATE } from "redux-persist"
import { createStateSyncMiddleware } from "redux-state-sync"
import storage from "redux-persist/lib/storage"
import { Persistor } from "redux-persist/lib/types"
import { encryptTransform } from "redux-persist-transform-encrypt"
import combineReducer from "./reducer"

const persistConfig = {
  key: "Talentrackr",
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'P@ssw0rd!23' || "",
      onError: (error: Error) => {
        // Handle the error.
        console.log("ERROR", error)
      }
    })
  ]
}

export type RootState = ReturnType<typeof combineReducer>

const persistedReducer = persistReducer<RootState>(persistConfig, combineReducer)

// 2. Create a type for thunk dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch
}

const rootReducer = (state: any, action: AnyAction) => {
  return persistedReducer(state, action)
}

export const store: AppStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }).concat([
      createStateSyncMiddleware({
        channel: "Talentrackr",
        broadcastChannelOption: { type: "localstorage" },
        blacklist: [PERSIST, PURGE, REHYDRATE]
      })
    ])
})

export const persistor: Persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

// export const useAppDispatch = () => useDispatch()