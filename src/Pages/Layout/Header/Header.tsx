import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import axios from "../../../app/axios";
import { SvgIcon } from "../../../Components";
import { addAppName, selectAppName } from "../../../reducers/quizSlice";
import "./header.style.scss";
import { ISurvey } from "../../../Services/models";

const Header = () => {
	const appName = useAppSelector(selectAppName);
	const dispatch = useAppDispatch();

	const getAppName = async () => {
		try {
			const { data } = await axios.get<ISurvey>("/survey");
			dispatch(addAppName(data.name));

			return data;
		} catch (err) {
			console.warn(err);
		}
	};

	useEffect(() => {
		if (appName === "") {
			getAppName();
		}
	}, []);

	return (
		<div className="header">
			<SvgIcon fill="currentColor" icon="questionMark" />
			<div className="header__text">{appName}</div>
		</div>
	);
};

export default Header;
