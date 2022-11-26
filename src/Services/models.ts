export interface DBModel {
	survey: ISurvey;
	questions: IQuestions[];
	userAnswers: IUserAnswers[];
}

export type Survey = Pick<DBModel, "survey">;
export type Questions = Pick<DBModel, "questions">;
export type UserAnswers = Pick<DBModel, "userAnswers">;

export interface ISurvey {
	name: string;
}
export interface IQuestions {
	surveyId: string;
	question: string;
	textCorrectAnswer: string;
	textWrongAnswer: string;
	answers: IAnswer[];
}

export interface IAnswer {
	answersId: string;
	answer: string;
	isCorrect: boolean;
	point: number;
}

export interface IUserAnswers {
	fullName: string;
	email: string;
	answers: string[];
	totalPoint: number;
}
