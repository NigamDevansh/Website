import "./Card.scss";

const Card = ({ card }) => {
	return (
		<div className="Card">
			{Object.keys(card).length === 5 ? (
				<img
					className="card"
					src={`https://testbucketfp.s3.ap-south-1.amazonaws.com/${card.Key}`}
				/>
			) : (
				<img
					className="card"
					src={`https://drive.google.com/uc?id=${card.id}`}
				/>
			)}
		</div>
	);
};

export default Card;
