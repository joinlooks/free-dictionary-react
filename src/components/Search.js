import {
	Box,
	Button,
	Card,
	CardBody,
	FormControl,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Search = (props) => {
	const { setText } = props;
	const [line, setLine] = useState("");

	return (
		<Card marginTop={"5"}>
			<CardBody>
				<FormControl>
					<FormLabel>Type here...</FormLabel>
					<Input
						type="text"
						id="text"
						placeholder="Search"
						fontSize={"lg"}
						onChange={(e) => {
							setLine(e.target.value);
						}}
					/>
					<Box
						display={"flex"}
						alignItems="center"
						justifyContent={"center"}
						marginTop="3"
					>
						<Button
							type="submit"
							colorScheme="blue"
							size="sm"
							width={"100%"}
							onClick={(e) => {
								e.preventDefault();
								setText(line);
							}}
						>
							Search
						</Button>
					</Box>
				</FormControl>
			</CardBody>
		</Card>
	);
};

export default Search;
