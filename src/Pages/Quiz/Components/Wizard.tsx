import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { SvgIcon } from "../../../Components";
import { IconEnum } from "../../../Components/SvgIcon/SvgIcon";
import { selectQuestionsArray, selectUserAnswers } from "../../../reducers/quizSlice";
import { IQuestions } from "../../../Services/models";

type WizardItemProps = {
	isActive: boolean;
	currentIndex: number;
	value: number;
};
const WizardItem = (props: WizardItemProps) => {
	const { isActive, value, currentIndex } = props;

	const [answeredCorrect, setAnsweredCorrect] = useState<boolean>(false);
	const questionsArray = useAppSelector(selectQuestionsArray);
	const userAnswersArray = useAppSelector(selectUserAnswers);

	const prefixCls = "wizard__item";
	const cls = classNames(prefixCls, {
		[`${prefixCls}-active`]: isActive,
		[`${prefixCls}-answered`]: value < currentIndex,
		[`${prefixCls}-answered-success`]: value < currentIndex && answeredCorrect,
		[`${prefixCls}-answered-danger`]: value < currentIndex && answeredCorrect === false,
		[`${prefixCls}-missed`]: value > currentIndex,
	});

	useEffect(() => {
		if (value < currentIndex && questionsArray) {
			const isCorrect: boolean = questionsArray[value].answers.find(
				(el) => el.answersId === userAnswersArray[value]
			)!.isCorrect;

			setAnsweredCorrect(isCorrect);
		}
	}, [currentIndex]);

	return (
		<div className={cls}>
			{value < currentIndex ? (
				answeredCorrect ? (
					<SvgIcon icon={IconEnum.tick} />
				) : (
					<SvgIcon icon={IconEnum.cross} />
				)
			) : (
				value + 1
			)}
		</div>
	);
};

type WizardProps = {
	active: number;
	questionArray: IQuestions[];
};

const Wizard = (props: WizardProps) => {
	const { active, questionArray } = props;

	return (
		<section className="quiz__wizard">
			{questionArray.map((_, index) => (
				<WizardItem key={index} isActive={active === index} currentIndex={active} value={index} />
			))}
		</section>
	);
};

export default Wizard;
