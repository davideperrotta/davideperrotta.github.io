import React from 'react';
import { useStore } from '@nanostores/react';

import { counter } from '../store/counter';

export function CounterButton() {
	const value = useStore(counter);

	function handleClick() {
		counter.set(value + 1);
	}

	return (
		<button type="button" onClick={handleClick}>
			Incrementa contatore (valore attuale: {value})
		</button>
	);
}
