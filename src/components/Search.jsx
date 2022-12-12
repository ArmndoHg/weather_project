import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

const Search = () => {
  const [data, setData] = useState("");
  const [weather, setWeather] = useState([]);

  const fetchWeather = async (event) => {
    if (event.key === "Enter")
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=c6db32c9a2e85fa9837f2e474f910dd2`
        );
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
          setData("");
          console.log(data);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <Container className="container">
      <Row>
        <Col xs={12}>
          <div className="search text-center  ">
            <input
              type="text"
              placeholder="Search"
              value={data}
              onKeyPress={fetchWeather}
              onChange={(event) => setData(event.target.value)}
            />
          </div>

          <div className="main">
            {weather.main && (
              <>
                <div className="city ">
                  <h2>{weather.name}</h2>
                  <h1>{(weather.main.temp - 273.15).toFixed(1)} °</h1>
                  <h3> {weather.weather[0].main}</h3>
                </div>
                <div className="max-min">
                  <h3>H:{(weather.main.temp_max - 273.15).toFixed(1)}°</h3>
                  <h3>L:{(weather.main.temp_min - 273.15).toFixed(1)}°</h3>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
