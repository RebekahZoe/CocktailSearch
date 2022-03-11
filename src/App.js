import React from "react";
import { BrowserRouter as Router, Switch, Route,useHistory } from "react-router-dom";
import { CocktailSearch, IndividualCocktail,SearchByIngredient } from "./containers";
import logo from "./32051.svg";
import { Navbar, Container, Nav} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { clearCocktailsSuccess } from "./containers/CocktailSearch/CocktailSearch.duck";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(clearCocktailsSuccess());
    history.push('/home')
  };
  return (
    <>
      <Navbar variant="light" style={{ backgroundColor: "pink" }}>
        <Container>
          <Navbar.Brand href="/" onSelect={handleClick}>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Cocktail search
          </Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link href="/" onSelect={handleClick}>Home</Nav.Link>
          <Nav.Link href="/cocktailIngredientSearch">Ingredient Search</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Router>
        <Switch>
          <Route path="/home" path="/" exact={true} component={CocktailSearch} />
        </Switch>
        <Switch>
          <Route exact path="/cocktailIngredientSearch"  component={SearchByIngredient} />
        </Switch>
        <Switch>
          <Route exact path="/cocktail/:id" component={IndividualCocktail} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
