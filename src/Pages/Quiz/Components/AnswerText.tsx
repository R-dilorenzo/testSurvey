import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { SvgIcon } from "../../../Components";
import { IconEnum } from "../../../Components/SvgIcon/SvgIcon";
import { selectUserAnswers } from "../../../reducers/quizSlice";
import { IAnswer, IQuestions } from "../../../Services/models";

export const AnswerResponse = (props: { selectedAnswer: IAnswer; showPoints?: boolean }) => {
	const { selectedAnswer, showPoints } = props;
	const cls = classNames("answerText", {
		[`answerText-success`]: selectedAnswer.isCorrect === true,
		[`answerText-danger`]: selectedAnswer.isCorrect === false,
	});

	return (
		<h4 className={cls}>
			{selectedAnswer.isCorrect ? (
				<Fragment>
					<span>Risposta corretta</span>
					<SvgIcon icon={IconEnum.tick} fill="currentColor" />{" "}
					{showPoints && <>[{selectedAnswer.point} punti]</>}
				</Fragment>
			) : (
				<Fragment>
					<span>Risposta sbagliata</span>
					<SvgIcon icon={IconEnum.cross} fill="currentColor" />{" "}
					{showPoints && <>[{selectedAnswer.point} punti]</>}
				</Fragment>
			)}
		</h4>
	);
};

type AnswerTextProps = {
	activeQuestion: number;
	questionArray: IQuestions[];
};

const AnswerText = (props: AnswerTextProps) => {
	const { activeQuestion, questionArray } = props;
	const [selectedAnswer, setSelectedAnswer] = useState<IAnswer | undefined>(undefined);
	const userAnswersArray = useAppSelector(selectUserAnswers);

	useEffect(() => {
		setSelectedAnswer(
			questionArray[activeQuestion].answers.find((el) => el.answersId === userAnswersArray[activeQuestion])
		);
	}, []);

	return (
		<div className={"quiz__answerText"}>
			{selectedAnswer && (
				<Fragment>
					<AnswerResponse selectedAnswer={selectedAnswer} />
					<br />
					<span>
						{selectedAnswer.isCorrect
							? questionArray[activeQuestion].textCorrectAnswer
							: questionArray[activeQuestion].textWrongAnswer}
					</span>
				</Fragment>
			)}
		</div>
	);
};

export default AnswerText;
