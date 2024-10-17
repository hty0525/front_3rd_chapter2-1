import React from 'react';

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return <div className="bg-gray-100 p-8">{children}</div>;
}
