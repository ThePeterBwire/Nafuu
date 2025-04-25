import { Button, Card, Col, Row, Badge } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/Context";
import Rating from "./Rating";
import { faker } from '@faker-js/faker'; 


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    state: { products, cart },
    dispatch,
  } = useCart();

  const product = products.find((prod) => prod.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const isInCart = cart.some((p) => p.id === product.id);

  return (
    <div className="product-details-container">
      <Button variant="light" onClick={() => navigate(-1)} className="mb-3">
        &larr; Back to Products
      </Button>
      
      <Card className="p-4">
        <Row>
          <Col md={6}>
            <div className="detail-image-container">
              <Card.Img 
                variant="top" 
                src={product.image} 
                alt={product.name}
                className="detail-image"
              />
              {!product.inStock && (
                <Badge bg="danger" className="stock-badge">
                  Out of Stock
                </Badge>
              )}
            </div>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title className="detail-title">{product.name}</Card.Title>
              <div className="detail-price mb-3">Ksh {product.price.split(".")[0]}</div>
              
              <div className="mb-3">
                <Rating rating={product.ratings} />
                <span className="ms-2">{product.ratings} stars</span>
              </div>
              
              {product.fastDelivery && (
                <Badge bg="success" className="mb-3">
                  Fast Delivery Available
                </Badge>
              )}
              
              <Card.Text className="mb-4">
                {faker.commerce.productDescription()}
                {/* Using faker for description - you can replace with real data */}
              </Card.Text>
              
              {isInCart ? (
                <Button
                  variant="danger"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: product,
                    })
                  }
                  disabled={!product.inStock}
                  className="detail-btn"
                >
                  Remove from Cart
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: product,
                    })
                  }
                  disabled={!product.inStock}
                  className="detail-btn"
                >
                  {!product.inStock ? "Out of Stock" : "Add to Cart"}
                </Button>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetails;