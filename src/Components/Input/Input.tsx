import classNames from "classnames";
import React, { ReactNode, useEffect, useState } from "react";
import { BaseProps, SizeType } from "../BaseProps";
import CloseCircle from "./CloseCircle";
import "./style/index";

enum KeyCode {
	BACKSPACE = 8,
	COMMA = 188,
	DELETE = 46,
	DOWN = 40,
	END = 35,
	ENTER = 13,
	ESCAPE = 27,
	HOME = 36,
	LEFT = 37,
	NUMPAD_ADD = 107,
	NUMPAD_DECIMAL = 110,
	NUMPAD_DIVIDE = 111,
	NUMPAD_ENTER = 108,
	NUMPAD_MULTIPLY = 106,
	NUMPAD_SUBTRACT = 109,
	PAGE_DOWN = 34,
	PAGE_UP = 33,
	PERIOD = 190,
	RIGHT = 39,
	SPACE = 32,
	TAB = 9,
	UP = 38,
}

export interface InputProps extends BaseProps, Omit<React.PropsWithRef<JSX.IntrinsicElements["input"]>, "size"> {
	label?: string;
	clearable?: boolean;
	value?: string;
	defaultValue?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
	disabled?: boolean;
	onClearClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref): JSX.Element => {
	const {
		label,
		disabled = false,
		clearable = false,
		defaultValue = "",
		onChange,
		onEnterPress,
		onKeyDown,
		className,
		style,
		onClearClick,
		...otherProps
	} = props;
	const prefixCls = "input";
	const cls = classNames(prefixCls, className, {
		[`${prefixCls}_disabled`]: disabled,
		[`${prefixCls}_label`]: label,
		[`${prefixCls}_isClearable`]: clearable,
	});
	const [value, setValue] = useState<string>("value" in props ? (props.value as string) : defaultValue);

	const clsLabel = classNames("input__label", {
		[`input__label-active`]: value,
	});
	const clsLine = classNames("input__line", {
		[`input__line-active`]: value,
	});

	const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const val = e.currentTarget.value;
		!("value" in props) && setValue(val);
		onChange && onChange(e);
	};

	const inputOnKeydown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.keyCode === KeyCode.ENTER) {
			onEnterPress && onEnterPress(e);
		}
		onKeyDown && onKeyDown(e);
	};

	const clearBtnOnClick = (e: React.MouseEvent<HTMLSpanElement>): void => {
		!("value" in props) && setValue("");
		onClearClick && onClearClick(e);
	};

	const renderClearButton = (): ReactNode => {
		if (clearable && value && value.length > 0) {
			return (
				<span className={`${prefixCls}__clear-btn`} onClick={clearBtnOnClick}>
					<CloseCircle size={16} color="#BFBFBF" />
				</span>
			);
		}
		return null;
	};

	useEffect(() => {
		"value" in props && typeof props.value !== "undefined" && setValue(props.value);
	}, [props]);

	return (
		<div className={cls} style={style}>
			<label className={clsLabel} htmlFor={otherProps.id || otherProps.name}>
				{label}
			</label>
			<input
				{...otherProps}
				ref={ref}
				value={value}
				disabled={disabled}
				className={`${prefixCls}__input`}
				onChange={inputOnChange}
				onKeyDown={inputOnKeydown}
			/>
			<span className={clsLine} />
			{clearable && <div className={`${prefixCls}__suffix`}>{renderClearButton()}</div>}
		</div>
	);
});

Input.displayName = "Input";

export default Input;
