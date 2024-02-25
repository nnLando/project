// Home.js
import React from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file for Home component styling

function Home({ items }) {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
          </CardTitle>
          <Link to="/add/snacks">
            <Button className="custom-snack">Add Snack</Button>
          </Link>{" "}
          <Link to="/add/drinks">
            <Button className="custom-drink">Add Drink</Button>
          </Link>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
