import { Box, Button, Heading, HStack, Image, SimpleGrid, Text, VStack, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Detail() {
	const { id } = useParams();
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	const fetchPokemon = async (id) => {
		setLoading(true);
		const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
		const data = await response.json();
		setData(data?.data?.[0]);
		setLoading(false);
	};

	useEffect(() => {
		fetchPokemon(id);
	}, [id]);

	console.log(data);

	return (
		<>
			{loading ? (
				<h2>Loading...</h2>
			) : (
				<Box p={5}>
					<Button alignSelf={'flex-start'}>
						<Link to={'/'}>Back</Link>
					</Button>
					<Center>
						<HStack
							width={'60%'}
							alignItems={'flex-start'}
							spacing={5}
						>
							<Image
								width={280}
								src={data.card_images?.[0]?.image_url}
							/>
							<VStack alignItems={'flex-start'}>
								<Heading
									as='h2'
									size={'lg'}
								>
									{data.name}
								</Heading>
								<Text as={'b'}>{`Level: ${data.level}`}</Text>
								<Text as={'b'}>{data.attribute}</Text>
								<Text as={'b'}>{`ATK/${data.atk} DEF/${data.def}`}</Text>
								<Text>{`[ ${data.type} / ${data.race} ]`}</Text>
								<Text>{data.desc}</Text>
							</VStack>
						</HStack>
					</Center>
					<VStack p={20}>
						<Heading>Card Set</Heading>
						<SimpleGrid
							columns={5}
							spacing={4}
							p={5}
						>
							{data.card_sets?.map((card_set, index) => (
								<Box
									key={index}
									display={'flex'}
									flexDirection={'column'}
									justifyContent={'center'}
									alignItems='center'
									borderWidth={1}
									p={5}
									borderRadius={10}
								>
									<Text textAlign={'center'}>Name: {card_set?.set_name}</Text>
									<Text>Code: {card_set?.set_code}</Text>
									<Text>Rarity: {card_set?.set_rarity}</Text>
									<Text>Price: {card_set?.set_price}</Text>
								</Box>
							))}
						</SimpleGrid>
					</VStack>
				</Box>
			)}
		</>
	); // TODO: replace this
}

export default Detail;
