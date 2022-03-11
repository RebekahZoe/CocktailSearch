import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails, fetchRandomCocktail } from "./CocktailSearch.duck";
import { Card, CardGroup, Form, Button,Row} from "react-bootstrap";
import { Alert } from "@mui/material";
import noImage from "../../noImage.jpg";
import { useHistory } from "react-router-dom";
import "./CocktailSearch.css"

function CocktailSearch(props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const { cocktails, fetchCocktailsInProgress, fetchCocktailsError } =
    useSelector((state) => state.CocktailSearch);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCocktails(value));
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const history = useHistory();
  const handleClick = (value) => (e) => {
    e.preventDefault();
    history.push(`/cocktail/${value}`);
  };
  const handleRandom =  (e) => {
    e.preventDefault();
    dispatch(fetchRandomCocktail())
  };

  return (
    <div>
      {fetchCocktailsInProgress ? (
        <Alert severity="info">Loading...</Alert>
      ) : null}
      {fetchCocktailsError ? (
        <Alert severity="error">Error Fetching Cocktails!</Alert>
      ) : null}
      {cocktails==="404" ? (
        <Alert severity="error">Cocktail not found!</Alert>
      ) : null}
      <h1>Welcome to Cocktail search!</h1>
      <h2>Please search for a cocktail, or hit random for a surprise!</h2>
      <h3>If you would like to search by a main ingredient, please navigate to that page via the navigation bar</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3"style={{maxWidth:"18rem",margin:"0 auto"}}>
          <Form.Control
          style={{maxWidth:"18rem"}}
            type="text"
            placeholder="Enter a cocktail"
            onChange={handleChange}
          />
          <Button variant="secondary" type="submit"style={{width:"18rem",marginTop:"10px"}}>
          Search
        </Button>
        <br/>
        <Button variant="secondary" type="button" style={{width:"18rem",marginTop:"10px"}} onClick={handleRandom}>
          Random Cocktail
        </Button>
        </Form.Group>
        
      </Form>
      
      <Row xs={1} md={2} className="g-4">
        {cocktails==="404" ?null:cocktails != null
          ? cocktails.map((cocktail, index) => {
              return (
                <Card
                  style={{ maxWidth: "22rem" }}
                  key={index}
                  onClick={handleClick(cocktail.idDrink)}
                >
                  <Card.Img
                    variant="top"
                    src={
                      cocktail.strDrinkThumb ? cocktail.strDrinkThumb : noImage
                    }
                    alt={cocktail.strDrink}
                  />
                  <Card.Body>
                    <Card.Title>{cocktail.strDrink}</Card.Title>
                    <Card.Text>
                      Here are some of the drinks tags:{" "}
                      {cocktail.strTags
                        ? cocktail.strTags.replace(/,/g, ", ")
                        : ""}
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          : null}
      </Row>
    </div>
  );
}

export default CocktailSearch;
