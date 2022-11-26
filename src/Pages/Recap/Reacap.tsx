import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button, Collapse, SvgIcon } from "../../Components";
import { IconEnum } from "../../Components/SvgIcon/SvgIcon";
import { clearState, selectQuestionsArray, selectUser, selectUserAnswers } from "../../reducers/quizSlice";
import { IAnswer, IQuestions, IUserAnswers } from "../../Services/models";
import { AnswerResponse } from "../Quiz/Components/AnswerText";
import "./recap.style.scss";
import "../Quiz/quiz.style.scss";
import { useNavigate } from "react-router-dom";
import axios from "../../app/axios";

const AnswerRecap = (props: { question: IQuestions; index: number }) => {
	const { question, index } = props;
	const [showMore, setShowMore] = useState<boolean>(false);
	const [selectedAnswer, setSelectedAnswer] = useState<IAnswer | undefined>(undefined);
	const userAnswersArray = useAppSelector(selectUserAnswers);

	const cls = classNames("answerRecap__title", {
		[`answerRecap__title-active`]: showMore,
	});

	useEffect(() => {
		setSelectedAnswer(question.answers.find((el) => el.answersId === userAnswersArray[index]));
	}, []);

	return (
		<Fragment>
			<li>
				<div className={cls} onClick={() => setShowMore(!showMore)}>
					{question.question} <SvgIcon icon={IconEnum.caretRight} fill={"currentColor"} />
				</div>
			</li>
			{selectedAnswer && (
				<Collapse isShow={showMore} collapseDuration={250}>
					<Fragment>
						<AnswerResponse selectedAnswer={selectedAnswer} showPoints={true} />
						{selectedAnswer.isCorrect ? (
							<div>{selectedAnswer.answer}</div>
						) : (
							<div>
								<span>La tua risposta: {selectedAnswer.answer}</span>
								<br />
								<span>Risposta Corretta: {question.answers.find((el) => el.isCorrect)!.answer}</span>
							</div>
						)}
					</Fragment>
				</Collapse>
			)}
		</Fragment>
	);
};

const Reacap = () => {
	const [isSendingPost, setIsSendingPost] = useState<boolean>(false);
	const questionsArray = useAppSelector(selectQuestionsArray);
	const userRecap = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handlePlayAgain = (): void => {
		setIsSendingPost(true);

		//Post for update data then clear store redux and redirect to Home
		axios
			.post<IUserAnswers>("/userAnswers", userRecap, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			})
			.then((res) => {
				// console.log("res POST", res);

				dispatch(clearState());
				window.alert("DB aggiornato");
				navigate("/");
				setIsSendingPost(false);
			})
			.catch((err) => {
				console.warn("error", err);
				window.alert("Error");
				setIsSendingPost(false);
			});
	};

	return (
		<div className="recap">
			<div className="recap__container">
				<section className="recap__info">
					<h3 className="recap__info-name">{userRecap.fullName}</h3>
					<div>
						Hai totalizzato: <b>{userRecap.totalPoint}</b> punti
					</div>
				</section>
				<section className="recap__questions">
					<b>Recap domande:</b>
					<br />
					<ol>
						{questionsArray!.map((el, idx) => (
							<AnswerRecap key={el.surveyId} question={el} index={idx} />
						))}
					</ol>
				</section>
			</div>
			<Button block loading={isSendingPost} onClick={() => handlePlayAgain()}>
				Gioca ancora
			</Button>
		</div>
	);
};

export default Reacap;
