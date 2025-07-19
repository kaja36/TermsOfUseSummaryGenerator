import { configureStore } from '@reduxjs/toolkit';
import  summaryReducer  from './features/summary/summarySlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        // ここに使用するSliceを追加
        summaryData: summaryReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
