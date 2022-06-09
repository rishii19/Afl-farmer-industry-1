import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import SideBarFarmer from "./SideBarFarmer";
import axios from "../api/axios";
const RentMachines = () => {
  const history = useNavigate();

  const [filter, setFilter] = useState([]);
  const [loading, setLoadiing] = useState(false);

  useEffect(async () => {
    setLoadiing(true);
    const { data } = await axios.get("machines/?own=true");
    setFilter(data);
    console.log(data);
    setLoadiing(false);
  }, []);

  console.log(filter, "----------");

  const Loading = () => {
    return (
      <>
        <div className="col-md-4">
          <Skeleton height={350} />
        </div>
        <div className="col-md-4">
          <Skeleton height={350} />
        </div>
        <div className="col-md-4">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  function handleClick(id) {
    history(`/machine/${id}`);
  }
  const ShowProducts = () => {
    return (
      <>
        {filter.map((machines) => {
          return (
            <>
              <div className="col-md-4 mb-4 mt-3 ">
                <div className="card h-100 text-center py-4" key={machines.id}>
                  <img
                    src={machines.image}
                    className="card-img-top"
                    alt={machines.name}
                    height="200px"
                  />
                  <div class="card-body">
                    <h5 class="card-title mb-0">
                      {machines.name.substring(0, 12)}
                    </h5>
                    <p class="card-text lead fw-bold">
                      {machines.rent_price}₹ {machines.id}
                    </p>
                    <p className="card-text">
                      {machines.description.substring(0, 20)}...
                    </p>
                    <div
                      class="btn btn-primary"
                      onClick={() => {
                        handleClick(machines.id);
                      }}
                    >
                      {" "}
                      more details
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container">
        <div className="row py-4 justify-content-evenly">
          <div className="col-md-4">
            <SideBarFarmer />
          </div>
        
        <br></br>
        <br></br>
        <br></br>
        <div>
        <Link to="/addnewmachine">
              <button
                className="btn btn-info btn-lg"
                style={{
                  position: "absolute",
                  backgroundColor: "#172578",
                  color: "white",
                  marginBottom: "500px",
                  left: "85%",
                  "-ms-transform": "translate(-50%, -50%)",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {" "}
                Add Machine
              </button>
            </Link>
            </div>
          <div className="col-md-9 col-sm-6" style={{ marginLeft: 300 }}>
            <h1
              className="text-center border border-1 p-4  shadow p-3 mb-3 bg-body roundeds"
              style={{ marginTop: 50, color: "#172578 " }}
            >
              My Products
            </h1>
          </div>
          <div className="row">
            <div className="col-md-9 col-sm-6" style={{ marginLeft: 300 }}>
              <div className="row justify-content-center">
                {loading ? <Loading /> : <ShowProducts />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* <Link to="/addnewmachine">
                <button
                  className="btn btn-info btn-lg"
                  style={{
                    position: "absolute",
                    backgroundColor: "#172578",
                    color: "white",
                    margintop: "150px",
                    left: "50%",
                    "-ms-transform": "translate(-50%, -50%)",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {" "}
                  Add New Machine
                </button>
              </Link> */
}

export default RentMachines;
