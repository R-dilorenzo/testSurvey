import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../app/axios";
import { useAppDispatch } from "../../app/hooks";
import { Button } from "../../Components";
import { addAnswer, initializeArray, setTotalPoint } from "../../reducers/quizSlice";
import { IQuestions } from "../../Services/models";
import Answer from "./Components/Answer";
import AnswerText from "./Components/AnswerText";
import Wizard from "./Components/Wizard";
import "./quiz.style.scss";

const Quiz = () => {
	const [questionsData, setQuestionsData] = useState<null | IQuestions[]>(null);
	const [activeQuestion, setActiveQuestion] = useState<number>(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [showSolution, setShowSolution] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const getQuestions = async (index?: number): Promise<void> => {
		//another solutions could be retrieve only the single question like
		// `/questionss?_page=${index}&_limit=1`
		// but need to add to db the totalQuestions for wizard component
		try {
			const { data } = await axios.get<IQuestions[]>("/questions");
			// console.log("data", data);
			dispatch(initializeArray(data));
			setQuestionsData(data);
		} catch (err) {
			console.warn(err);
		}
	};

	useEffect(() => {
		getQuestions();
	}, []);

	const confirmAnswer = (): void => {
		//user confirm answer => dispatch
		if (selectedAnswer !== null) {
			dispatch(addAnswer(selectedAnswer));
			setShowSolution(true);
		}
	};

	const retrieveNextQuestion = (): void => {
		//clean state
		setSelectedAnswer(null);
		setShowSolution(false);

		//se ci sono altre domande aggiorno activeQuestion altrimenti redirect to Recap page
		if (activeQuestion === questionsData!.length - 1) {
			//set point on redux and redirect
			dispatch(setTotalPoint());
			navigate("/Recap");
			return;
		}
		setActiveQuestion(activeQuestion + 1);
	};

	return (
		<div className="quiz">
			{questionsData !== null ? (
				<>
					<Wizard active={activeQuestion} questionArray={questionsData} />
					<div className="quiz__question">{questionsData[activeQuestion].question}</div>
					<section className="quiz__answers">
						{questionsData[activeQuestion].answers.map((answer) => (
							<Answer
								key={answer.answersId}
								answer={answer.answer}
								answersId={answer.answersId}
								selectedAnswer={selectedAnswer}
								setSelectedAnswer={setSelectedAnswer}
								showSolution={showSolution}
							/>
						))}
					</section>
					<section className="quiz__solution">
						{showSolution ? (
							<AnswerText activeQuestion={activeQuestion} questionArray={questionsData} />
						) : null}
					</section>
					<Button
						disabled={selectedAnswer === null}
						onClick={() => (showSolution ? retrieveNextQuestion() : confirmAnswer())}
					>
						{showSolution ? "Avanti" : "Conferma"}
					</Button>
				</>
			) : (
				<b>Loading...</b>
			)}
		</div>
	);
};

export default Quiz;
