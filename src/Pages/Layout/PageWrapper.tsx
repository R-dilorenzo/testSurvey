import React from "react";
import Header from "./Header/Header";

type Props = {};

const PageWrapper = (props: { children: React.ReactNode }) => {
	return (
		<div className="pageWrapper" style={{ height: "calc(100vh - 2.625rem)" }}>
			<Header />
			{props.children}
		</div>
	);
};

export default PageWrapper;
