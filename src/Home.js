import { Box, Center, Select, SimpleGrid } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Cards from "./Cards";

function Home() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [sortType, setSortType] = useState('');

    const fetchData = async () => {
        setLoading(true);
        const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4`;

        const response = await fetch(url);
        const data = await response.json();

        setData(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Center>
            <Box width={"50%"}>
                <Select name="sort" placeholder="Sort by" onChange={e => setSortType(e.target.value)} marginBottom={5} marginTop={5} >
                    <option value="name">Name</option>
                    <option value="atk">Attack</option>
                    <option value="def">Defence</option>
                </Select>
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <SimpleGrid columns={4} spacing={8}>
                        <Cards card={data.data.sort((a, b) => sortType === 'name' ? a.name.localeCompare(b.name) : a[sortType] - b[sortType])} />
                    </SimpleGrid>
                )}
            </Box>
        </Center>
    );
}

export default Home;
