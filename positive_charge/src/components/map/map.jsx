import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MapDestination from './mapDestination.jsx';
import Routing from './routing.jsx';
import Directions from './directions.jsx';
import axios from 'axios';
import L from 'leaflet';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';




class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: this.props.userLocation.userLat,
            long: this.props.userLocation.userLong,
            destinations: this.props.props,
            isDriving: false,
            directions: [],
            currDestination: {},
            walkingTime: 0
        }
        this.getDirections = this.getDirections.bind(this);
        this.haversine = this.haversine.bind(this);
        this.routingRef = React.createRef();
    }

    componentDidUpdate() {
        if (this.routingRef.current) {
            this.routingRef.current.setWaypoints([
                L.latLng(this.state.lat, this.state.long),
                L.latLng(this.state.currDestination.lat, this.state.currDestination.long)
            ])
        }
    }

    //Finds distance between two points in miles or feet depending on which is more appropriate
    haversine(lat1, lat2, lon1, lon2) {
        lon1 =  lon1 * Math.PI / 180;
        lon2 = lon2 * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;

        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2)
            + Math.cos(lat1) * Math.cos(lat2)
            * Math.pow(Math.sin(dlon / 2),2);
        let c = 2 * Math.asin(Math.sqrt(a));
        let r = 3956;
        let distance = (c * r);
        
        let totalFeet = distance * 5028;
        let totalMin = (totalFeet / 4.7) / 60;
        distance = distance < 0.1 ? `. Continue for ${parseInt(distance * 5028)} feet` : `. Continue for ${+(Math.round(distance + "e+2") + "e-2")} miles`;
        return [distance, totalMin];
    }

    getDirections(event) {
        axios.get('/map', {
            params: {
                startingLat: this.state.lat,
                startingLong: this.state.long,
                endingLat: event.latlng.lat,
                endingLong: event.latlng.lng
            }
        })
        .then(response => {
            var directions = [];
            var timeToWalk = 0;
            var instructions = response.data.guidance.instructions;
            instructions.forEach((direction) => {
                directions.push(direction.message);
            });
            for(var index = 0; index < instructions.length - 1; index++) {
                var distance = this.haversine(instructions[index].point.latitude, instructions[index + 1].point.latitude, instructions[index].point.longitude, instructions[index + 1].point.longitude)
                directions[index] += distance[0];
                timeToWalk += distance[1];
            }
            timeToWalk = timeToWalk < 1 ? " Less than one minute away " : `${Math.round(timeToWalk)} minutes away`
            this.setState({
                directions: directions,
                currDestination: { lat: event.latlng.lat, long: event.latlng.lng, destination: event.sourceTarget._popup.options.children },
                walkingTime: timeToWalk
            })
        })
        .catch(err => {
            console.log("Failed to reach /map route", err);
        })
    }
    render() {
        return (
            <div>
                <MapContainer center={[this.state.lat, this.state.long]} zoom={15} id="map">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[this.state.lat, this.state.long]} zIndexOffset={9000} icon={L.icon({ iconUrl: './img/personMarker.png', iconSize: [90, 90] })}>
                        <Popup>
                            <span className="text"> Your Location </span>
                        </Popup>
                    </Marker>
                    <MapDestination
                        destinations={this.state.destinations}
                        getDirections={this.getDirections} >
                    </MapDestination>
                    {Object.keys(this.state.currDestination).length === 0
                        ? <div></div>
                        : <Routing
                            startingLat={this.state.lat}
                            startingLong={this.state.long}
                            endingLat={this.state.currDestination.lat}
                            endingLong={this.state.currDestination.long}
                            isDriving={this.state.isDriving}
                            ref={this.routingRef}
                        ></Routing>
                    }
                </MapContainer>
                {Object.keys(this.state.currDestination).length === 0 
                    ? <div></div>
                    : <h3 className='text'> Directions to {this.state.currDestination.destination}</h3>
                }
                <List >
                    <Directions directions={this.state.directions}></Directions>
                </List>
                
            </div>

        )
    }
}

export default Map;