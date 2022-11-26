import classNames from "classnames";
import React from "react";
import { IAnswer } from "../../../Services/models";

interface AnswerProps {
	answer: IAnswer["answer"];
	answersId: IAnswer["answersId"];
	selectedAnswer: string | null;
	setSelectedAnswer: (value: string) => void;
	showSolution: boolean;
}

const Answer = (props: AnswerProps) => {
	const { answer, answersId, selectedAnswer, setSelectedAnswer, showSolution } = props;
	const prefixCls = "answer__item";
	const cls = classNames(prefixCls, {
		[`${prefixCls}-selected`]: answersId === selectedAnswer,
	});

	const handleClick = () => {
		if (showSolution) {
			return;
		}
		setSelectedAnswer(answersId);
	};

	return (
		<div className={cls} onClick={() => handleClick()}>
			{answer}
		</div>
	);
};

export default Answer;
