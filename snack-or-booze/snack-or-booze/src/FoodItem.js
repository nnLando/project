import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "./FoodItem.css";

function FoodItem({ snacks, drinks, cantFind }) {
  const { type, id } = useParams();

  let item;
  if (type === "snacks") {
    item = snacks.find(snack => snack.id === id);
  } else if (type === "drinks") {
    item = drinks.find(drink => drink.id === id);
  }

  if (!item) return <Redirect to={cantFind} />;

  return (
    <section className="food-item">
      <Card> 
        <CardBody>
          <CardTitle className="font-weight-bold text-center">{item.name}</CardTitle>
          <CardText className="font-italic">{item.description}</CardText>
          <p>
            <b>Recipe:</b> {item.recipe}
          </p>
          <p>
            <b>Serve:</b> {item.serve}
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

export default FoodItem;
