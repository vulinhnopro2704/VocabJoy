import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type PropTypes = {
	value: Date;
	styles?: any;
	placeholder?: string;
	onChange: any;
};

const DatePicker = ({ value, placeholder, styles, onChange }: PropTypes) => {
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);

	const handleChange = (_, selectedDate: Date | undefined) => {
		setShow(false);
		onChange(selectedDate || value);
	};

	return (
		<View>
			<Button
				onPress={() => setShow(true)}
				title={placeholder ?? "Chọn ngày sinh"}
			/>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={value}
					mode="date"
					display="default"
					onChange={handleChange}
				/>
			)}
			<Text>{date.toDateString()}</Text>
		</View>
	);
};

export default DatePicker;
