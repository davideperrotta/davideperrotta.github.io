import React from 'react';
import { useStore } from '@nanostores/react';

import { counter } from '../store/counter';

export function CounterDisplay() {
	const value = useStore(counter);

	return <p>Valore del contatore: {value}</p>;
}
