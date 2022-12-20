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
	const [partOfSpeech, setPartOfSpeech] = useState("");

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const dictionaryAPI = async (str) => {
		try {
			const data = await axios
				.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${str}`)
				.catch((err) => {
					if (text === "Search something") {
						setMeaning([]);
					} else {
						setMeaning([
							{
								definition:
									"Sorry pal, we couldn't find definitions for the word you were looking for.",
							},
						]);
					}
				});

			let array = [];
			data.data[0].meanings.forEach((element) => {
				setPartOfSpeech(capitalizeFirstLetter(element.partOfSpeech));
				element.definitions.forEach((definition) => {
					array.push({
						definition: definition.definition,
						example: definition.example ? definition.example : null,
					});
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
					<Box
						display={"flex"}
						alignItems="center"
						justifyContent={"space-between"}
					>
						<Heading size="lg" fontWeight={"medium"} color="blue.900">
							{" "}
							{capitalizeFirstLetter(text)}{" "}
						</Heading>
						<Text size={"md"} color="blue.600" fontWeight={"medium"}>
							{partOfSpeech}
						</Text>
					</Box>
					<Divider marginTop={"2"} />
					<Text fontSize={"xs"} textAlign="center" marginTop={2} color="tomato">
						Meanings & Examples
					</Text>
					<Divider marginTop={"2"} />
					{meaning &&
						meaning.map((elem, index) => {
							return (
								<Stack mt="3" spacing="3" key={index} marginX="2">
									<Text fontSize={"medium"}>{elem.definition}</Text>
									{elem.example && (
										<Text color={"blue.500"} fontSize="small">
											Eg. {elem.example}
										</Text>
									)}
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
