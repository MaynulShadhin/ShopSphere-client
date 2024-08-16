import PropTypes from 'prop-types';
const ProductCard = ({ item }) => {

    return (
        <div>
            <div className="card border-2 border-base w-96 mt-12 p-4">
                <figure>
                    <img className='h-[300px]'
                        src={item.image}
                        alt={item.name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p>{item.description}</p>
                    <p className='font-semibold'>Price: <span>{item.price}</span>$</p>
                    <p className='badge badge-outline'>{item.brand}</p>
                    <p className='font-semibold'>Rating: {item.ratings}</p>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    item: PropTypes.object
}

export default ProductCard;