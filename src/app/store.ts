import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { quizSlice } from "../reducers/quizSlice";

export const store = configureStore({
	reducer: {
		quiz: quizSlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
