// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import SnackMenu from "./SnackMenu";
import DrinkMenu from "./DrinkMenu";
import FoodItem from "./FoodItem";
import AddItemForm from "./AddItemForm";
import NotFound from "./NotFound";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function getData() {
      const snacksData = await SnackOrBoozeApi.getSnacks();
      const drinksData = await SnackOrBoozeApi.getDrinks();
      setSnacks(snacksData);
      setDrinks(drinksData);
      setIsLoading(false);
    }
    getData();
  }, []);

  const addItem = async (itemData) => {
    if (itemData.type === "snacks") {
      const newSnack = await SnackOrBoozeApi.addSnack(itemData);
      setSnacks([...snacks, newSnack]);
    } else if (itemData.type === "drinks") {
      const newDrink = await SnackOrBoozeApi.addDrink(itemData);
      setDrinks([...drinks, newDrink]);
    }
  };

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
            <Home snacks={snacks} drinks={drinks} />
            </Route>
            <Route exact path="/snacks">
              <SnackMenu snacks={snacks} type="snacks" />
            </Route>
            <Route exact path="/drinks">
              <DrinkMenu drinks={drinks} type="srinks" />
            </Route>
            <Route path="/add/snacks">
              <AddItemForm addItem={addItem} type="snacks" />
            </Route>
            <Route path="/add/drinks">
              <AddItemForm addItem={addItem} type="drinks" />
            </Route>
            <Route path="/:type/:id">
            <FoodItem snacks={snacks} drinks={drinks} cantFind="/" />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
