import React, { Fragment, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Button, Input, SvgIcon } from "../../Components";
import { IconEnum } from "../../Components/SvgIcon/SvgIcon";
import { login } from "../../reducers/quizSlice";
import { useNavigate } from "react-router-dom";
import "./home.style.scss";

interface IFields {
	name: string;
	value: string;
}

const Home = (props: {}) => {
	const [fields, setFields] = useState<IFields[]>([
		{ name: "nome", value: "" },
		{ name: "email", value: "" },
	]);
	const [alert, setAlert] = useState<string[]>([]);
	const [isSending, setIsSending] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const updateField = (obj: IFields): void => {
		const indexArray: number = fields.findIndex((el) => el.name === obj.name);

		if (indexArray !== -1) {
			setFields((field) => [...field.slice(0, indexArray), obj, ...field.slice(indexArray + 1, field.length)]);
		}
	};

	const handleClick = (): void => {
		setIsSending(true);
		setAlert([]);
		//validate field
		const errMessage: string[] = [];
		let fieldValue: { [key: string]: string } = {};
		fields.map((field) => {
			if (field.value === "") {
				errMessage.push(`Il campo ${field.name} è obbligatorio`);
			}
			if (field.name === "email" && field.value !== "") {
				const re: RegExp =
					/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

				if (!re.test(field.value)) {
					errMessage.push(`Formato ${field.name} non valido (es. valid email: test@email.com)`);
				}
			}
			fieldValue = {
				...fieldValue,
				[field.name]: field.value,
			};
		});

		setAlert(errMessage);

		if (errMessage.length > 0) {
			setIsSending(false);
			return;
		}
		//if is valid => dispatch value and navigate
		dispatch(
			login({
				fullName: fieldValue.nome,
				email: fieldValue.email,
			})
		);
		navigate("/Quiz");
		// setIsSending(false);
	};

	return (
		<div className="home">
			<SvgIcon icon={IconEnum.questionMark} style={{ height: "3rem", width: "3rem" }} />
			<div className="home__input">
				<Input
					label="Nome"
					type="text"
					name="nome"
					onBlur={(e) => updateField({ name: e.target.name, value: e.target.value })}
					clearable
					autoComplete="off"
					onClearClick={() => updateField({ name: "nome", value: "" })}
				/>
				<Input
					label="Email"
					type="email"
					name="email"
					onBlur={(e) => updateField({ name: e.target.name, value: e.target.value })}
					clearable
					autoComplete="off"
					onClearClick={() => updateField({ name: "email", value: "" })}
				/>
			</div>
			<div className="home__infoErr">
				{alert.map((el, index) => (
					<Fragment key={index}>
						<b>{el}</b>
						<br />
					</Fragment>
				))}
			</div>
			<Button block onClick={() => handleClick()} loading={isSending}>
				Gioca
			</Button>
		</div>
	);
};

export default Home;
