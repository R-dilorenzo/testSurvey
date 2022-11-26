import React from "react";
import classNames from "classnames";
import { BaseProps, SizeType } from "../BaseProps";
import "./style/index";

type ButtonType = "default";

interface ButtonProps extends BaseProps, React.PropsWithRef<JSX.IntrinsicElements["button"]> {
	btnType?: ButtonType;
	loading?: boolean;
	disabled?: boolean;
	block?: boolean;
	size?: SizeType;
	icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
	const {
		size = "md",
		btnType = "default",
		loading = false,
		disabled = false,
		block = false,
		onClick,
		icon,
		children,
		className,
		style,
		...otherProps
	} = props;
	const prefixCls = "btn";
	const btnSize = size;
	const cls = classNames(
		prefixCls,
		`${prefixCls}_${btnSize}`,
		{
			[`${prefixCls}_${btnType}`]: btnType,
			[`${prefixCls}_block`]: block,
			[`${prefixCls}_disabled`]: disabled,
			[`${prefixCls}_loading`]: loading,
		},
		className
	);

	const btnOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (disabled || loading) {
			return;
		}
		onClick && onClick(e);
	};

	const renderIcon = (): React.ReactElement | null => {
		if (loading) {
			return <span className={`${prefixCls}__loader`} />;
		} else if (icon) {
			return <span className={`${prefixCls}__icon-container`}>{icon}</span>;
		} else {
			return null;
		}
	};

	return (
		<button {...otherProps} ref={ref} className={cls} disabled={disabled} onClick={btnOnClick} style={style}>
			{renderIcon()}
			{children && <span className={`${prefixCls}__children`}>{children}</span>}
		</button>
	);
});

Button.displayName = "Button";

export default Button;
