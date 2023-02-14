import React , { useState } from 'react';

const useInput = (initialValue) => {
	const [value, setValue] = useState("");

	const clearText = () => {
		setValue(initialValue);
	}

	const bindForm = {
		value,
		onChange: e => {
			console.log(e)
			setValue(e.target.value)
		}
	}


	return [value, bindForm, clearText];
}

export default useInput;