import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardGroup,
  Form,
  Button,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import { Alert } from "@mui/material";
import noImage from "../../noImage.jpg";
import { useHistory } from "react-router-dom";
import { fetchCocktail } from "./IndividualCocktail.duck";
import "./IndividualCocktail.css";
import { clearCocktailsSuccess } from "../CocktailSearch/CocktailSearch.duck";


function IndividualCocktail(props) {
  const dispatch = useDispatch();
  const { cocktail, fetchCocktailInProgress, fetchCocktailError } = useSelector(
    (state) => state.IndividualCocktail
  );
  const history = useHistory();
  
  const handleBackClick = (e) => {
    e.preventDefault();
    history.goBack();
  };
  useEffect(() => {
    const id = props.match.params.id;
    if (id) dispatch(fetchCocktail(id));
  }, [dispatch, props]);

  const formatIngredients = (value) => {
    const ingredients = [];
    const drinkEntries = Object.entries(value),
      [ingredientsArray, measuresArray] = ["strIngredient", "strMeasure"].map(
        (keyName) =>
          drinkEntries
            .filter(
              ([key, value]) => key.startsWith(keyName) && value && value.trim()
            )
            .map(([key, value]) => value)
      );
    for (let i = 0; i < ingredientsArray.length; i++) {
      ingredients.push(
        <li key={i}>
          {measuresArray[i]} {ingredientsArray[i]}
        </li>
      );
    }
    return ingredients;
  };

  return (
    <div>
      {fetchCocktailInProgress ? (
        <Alert severity="info">Loading...</Alert>
      ) : null}
      {fetchCocktailError ? (
        <Alert severity="error">Error Fetching Cocktails!</Alert>
      ) : null}
      <Button variant="secondary" size="lg" onClick={handleBackClick} style={{width:"5rem",marginTop:"10px"}}>
        Back
      </Button>
      <CardGroup>
        {cocktail != null
          ? cocktail.map((c, index) => {
              return (
                <Card
                  className="text-center"
                  style={{ maxWidth: "22rem" }}
                  key={index}
                >
                  <Card.Img
                    variant="top"
                    src={c.strDrinkThumb ? c.strDrinkThumb : noImage}
                    alt={c.strDrink}
                  />
                  <Card.Body>
                    <Card.Title>{c.strDrink}</Card.Title>
                    <Card.Text>
                      This is a(n) {c.strAlcoholic} {c.strCategory}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      Type of glass needed: {c.strGlass}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Ingredients:</b>
                      <br />
                      <ul class="no-bullets">{formatIngredients(c)}</ul>
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Instructions:</b>
                      <br/>
                      {c.strInstructions}
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              );
            })
          : null}
      </CardGroup>
     
    </div>
  );
}

export default IndividualCocktail;
