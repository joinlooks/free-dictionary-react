import { Container, Heading } from "@chakra-ui/react";
import { useState } from "react";
import Result from "./components/Result";
import Search from "./components/Search";

function App() {
	const [text, setText] = useState("Search something");

	return (
		<Container>
			<Heading textAlign={"center"} marginTop="5">
				Free Dictionary
			</Heading>
			<Search setText={setText} />
			{/* {console.log(text)} */}
			<Result text={text} />
		</Container>
	);
}

export default App;
