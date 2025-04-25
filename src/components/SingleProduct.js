import { Card, Button, Badge } from "react-bootstrap";
import { useCart } from "../context/Context";
import Rating from "./Rating";
import { Link } from "react-router-dom"; 


const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = useCart();

  return (
    <Card className="product-card h-100">
              <Link to={`/product/${prod.id}`} className="image-link"> {/* Add this wrapper */}
      <div className="image-container">
        <Card.Img 
          variant="top" 
          src={prod.image} 
          alt={prod.name}
          className="product-image"
        />
        {!prod.inStock && (
          <Badge bg="danger" className="stock-badge">
            Out of Stock
          </Badge>
        )}
      </div>
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="product-title">{prod.name}</Card.Title>
        <div className="mb-2">
          <span className="product-price">Ksh {prod.price.split(".")[0]}</span>
          <Rating rating={prod.ratings} />
        </div>
        {prod.fastDelivery && (
          <Badge bg="success" className="mb-2">
            Fast Delivery
          </Badge>
        )}
        {cart.some((p) => p.id === prod.id) ? (
          <Button
            variant="danger"
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: prod,
              })
            }
            className="mt-auto"
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: prod,
              })
            }
            disabled={!prod.inStock}
            className="mt-auto"
          >
            {!prod.inStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default SingleProduct;