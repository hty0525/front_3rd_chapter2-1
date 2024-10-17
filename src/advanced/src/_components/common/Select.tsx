import React from 'react';

type Props = {
	className?: string;
};

export function Select({ className }: Props) {
	return <select className={className}>Select</select>;
}
