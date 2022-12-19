import {
	Box,
	Card,
	CardBody,
	Divider,
	Heading,
	Stack,
	Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Result = (params) => {
	const { text } = params;
	const [meaning, setMeaning] = useState([]);

	const dictionaryAPI = async (str) => {
		try {
			const data = await axios.get(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${str}`
			);
			let array = [];
			data.data[0].meanings.forEach((element) => {
				element.definitions.forEach((definition) => {
					array.push(definition.definition);
				});
			});

			setMeaning(array);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		dictionaryAPI(text);
		return () => {
			setMeaning([]);
		};
	}, [text]);

	return (
		<Box display={"flex"} alignItems="center" justifyContent={"center"}>
			<Card maxW="sm" marginTop={"5"}>
				<CardBody>
					<Heading size="md"> {text} </Heading>
					<Divider marginTop={"2"} />

					{meaning &&
						meaning.map((elem, index) => {
							return (
								<Stack mt="3" spacing="3" key={index}>
									<Text>{elem}</Text>
									<Divider marginTop={"2"} />
								</Stack>
							);
						})}
				</CardBody>
			</Card>
		</Box>
	);
};

export default Result;
