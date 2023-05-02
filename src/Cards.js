// TODO: answer here

import { Box, Heading, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Cards({ card }) {
	return (
		<>
			{card?.map((card) => (
				<Link
					to={`/card/${card.id}`}
					key={card.id}>
					<Box className='yugioh-card'>
						<Image src={card.card_images?.[0]?.image_url} />
						<Heading
							textAlign={'center'}
							as={'h2'}
							size={'xs'}>
							{card.name}
						</Heading>
					</Box>
				</Link>
			))}
		</>
	);
}

export default Cards;
