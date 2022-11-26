import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../app/store";
import { IQuestions, IUserAnswers } from "../Services/models";

interface QuizSliceState {
	appName: string;
	questionArray: IQuestions[] | null;
	userRecap: IUserAnswers;
}
const initialState: QuizSliceState = {
	appName: "",
	questionArray: null,
	userRecap: {
		fullName: "",
		email: "",
		answers: [],
		totalPoint: 0,
	},
};

interface ILogin {
	fullName: IUserAnswers["fullName"];
	email: IUserAnswers["email"];
}

export const quizSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {
		addAppName: (state, action: PayloadAction<string>) => {
			state.appName = action.payload;
		},
		login: (state, action: PayloadAction<ILogin>) => {
			state.userRecap = {
				...state.userRecap,
				fullName: action.payload.fullName,
				email: action.payload.email,
			};
		},
		initializeArray: (state, action: PayloadAction<IQuestions[]>) => {
			state.questionArray = action.payload;
		},
		addAnswer: (state, action: PayloadAction<string>) => {
			let usersAnswers: string[] = state.userRecap.answers ? [...state.userRecap.answers] : [];
			usersAnswers = [...usersAnswers, action.payload];

			state.userRecap = {
				...state.userRecap,
				answers: usersAnswers,
			};
		},
		setTotalPoint: (state) => {
			const userAnswers = state.userRecap.answers;

			const totalPoint: number = state.questionArray!.reduce((prev, curr, index) => {
				const answerPoint: number = curr.answers.find((el) => el.answersId === userAnswers[index])!.point;

				prev = prev + answerPoint;
				return prev;
			}, 0);
			state.userRecap.totalPoint = totalPoint;
		},
		clearState: (state) => {
			state.questionArray = initialState.questionArray;
			state.userRecap = initialState.userRecap;
		},
	},
});
type RootState = ReturnType<typeof store.getState>;

export const { addAppName, login, addAnswer, initializeArray, setTotalPoint, clearState } = quizSlice.actions;

export const selectAppName = (state: RootState) => state.quiz.appName;
export const selectUser = (state: RootState) => state.quiz.userRecap;
export const selectUserAnswers = (state: RootState) => state.quiz.userRecap.answers;
export const selectQuestionsArray = (state: RootState) => state.quiz.questionArray;
