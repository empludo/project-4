import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  // Input,
  // Label,
  // Form,
  // FormGroup
} from 'reactstrap';
import '../styles/App.css'

import Locations from './Locations'
import Dates from './Dates'
import Itinerary from './Itinerary'
import PlacesWithStandaloneSearchBox from './SearchBox';
import logo from '../icon.png'
// import Alternative from './Alternative'

class App extends Component {

  // Constructors
  constructor() {
    super();
    this.state = {
      locationList: [],
      numberOfDays: [1],
      activeTab: 1,
      itineraryList: [],
      currentDayItinerary: []
    };
  }

  // Test Code
  // adding location to list
  addToList = async ({ place_id, formatted_address, name, geometry: { location } }) => {
    // display on React client
    // var node = document.createElement("LI");
    // var textnode = document.createTextNode(`${name}, ${formatted_address} at ${location.lat()}, ${location.lng()}`);
    // node.appendChild(textnode);
    // document.getElementById("locationList").appendChild(node);

    // write to Express server
    var params = {
      id: place_id,
      name: name,
      address: formatted_address,
      latitude: location.lat(),
      longitude: location.lng()
    }
    console.log(params)
    const response = await fetch('/location/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    const body = await response.json()
    console.log(body)
    this.setState({ locationList: body })
  }

  // fetching from db the itineray list
  getItineraryList = async () => {
    const response = await fetch('/event/view');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("This is my itinerary list", body)
    this.setState({ itineraryList: body });

    this.setState({
      currentDayItinerary: this.state.itineraryList.filter(event => event.date == this.state.activeTab)
    })
  }

  // fetching from db the location list
  retrieveFromList = async () => {
    const response = await fetch('/location/getAllForTrip');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({ locationList: body });
  };

  deleteFromList = async (id) => {
    console.log(id)
    const response = await fetch(`/location/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    const body = await response.json()
    this.setState({ locationList: body })
  }

  componentDidMount() {
<<<<<<< HEAD
    this.retrieveFromList();
    this.getItineraryList();
=======
    this.retrieveFromList()
    this.getItineraryList()
>>>>>>> a8c1715458227a7c16c1dfd52ae359382524984c
  }

  getActiveTab = async (data) => {
    console.log("This is the tab data",data)
    await this.setState({activeTab: data})

    await this.setState({
      currentDayItinerary: this.state.itineraryList.filter(event => event.date == this.state.activeTab)
    })
  }

  // Event creation Test

  addToEvent = async (e, req) => {

    // write to Express server
    var params = {
      location_id: e.target.parentNode.parentNode.id,
      // trip_id: req.params.id,
      // name: this.state.locationList[e.target],
      date: this.state.activeTab
    };
    console.log(params);
    let response = await fetch('/event/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    this.getItineraryList()

  };

  // End of Event Creation Test

  // Update Event Test
  updateEvent = async (req) => {

    // write to Express server
    var params = {
      // eventID: e.target.parentNode.id,
      description: 'Testing123',
      // Mock data to represent event ID
      id: '5a8ced2a84a452959050e58f'
      // locationID: '5a8b8f5ec4e9267e17d6a63c'
      // trip_id: req.params.id,
      // name: this.state.locationList[e.target]
    };
    console.log(req)
    console.log(params);
    // let response = await fetch(`/event/update/${params.id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(params)
    // });
  };
  // End of Update Event Test

  // Delete Event Test
  deleteEvent = async (e, req) => {

    // write to Express server
    var params = {
      // Mock data to represent event ID
      id: '5a8be2f709de0d8cbd9d2ece'
    };
    // console.log(e.target.parentNode)
    console.log(params);
    let response = await fetch(`/event/delete/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
  };

  // End of Test Code

// get the number of days from dates

getNumberOfDays = (props) => {
  let days = Array(props).fill().map((_,i) => i + 1)
  console.log("days", days)
  this.setState({numberOfDays: days})
}

  render() {
    return (
      <div  >
        <Col className="header">
          <img src={logo} className="logo"/>
          <div className="title">TripCollab</div>
        </Col>

        <Container>
          <Row>
            <Col className="col-7">
              <PlacesWithStandaloneSearchBox onAdd={this.addToList}/>
            </Col>
            <Col className="col-5">
              <Dates getNumberOfDays={this.getNumberOfDays}/>
              <Locations locations={this.state.locationList} addToEvent={this.addToEvent}/>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Itinerary numberOfDays={this.state.numberOfDays} getActiveTab={this.getActiveTab} activeTab={this.state.activeTab} itineraryList={this.state.currentDayItinerary}
              updateMethod={this.updateEvent}
               />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
