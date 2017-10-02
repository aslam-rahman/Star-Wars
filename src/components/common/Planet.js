import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import Badge from 'material-ui/Badge';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';

export default class Planet extends Component{
  constructor(props){
    super(props);
    this.state={
      open:false
    }
  }
  componentDidMount(){
    this.setState({
      planets:this.props.planets,
      noData:this.props.noData
    })
  }
  componentWillReceiveProps(nextProps){
    if(!_.isEqual(this.props.planets,nextProps.planets)){
      this.setState({
        planets:nextProps.planets,
        noData:nextProps.noData
      })
    }
  }
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  view = () => {
    return(
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <ListItem
            primaryText="Rotation Period"
            secondaryText={<p>{this.state.view_planet.rotation_period}</p>}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <ListItem
            primaryText="Orbital Period"
            secondaryText={<p>{this.state.view_planet.orbital_period}</p>}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <ListItem
            primaryText="Diameter"
            secondaryText={<p>{this.state.view_planet.diameter}</p>}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <ListItem
            primaryText="Climate"
            secondaryText={<p>{this.state.view_planet.climate}</p>}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <ListItem
            primaryText="Gravity"
            secondaryText={<p>{this.state.view_planet.gravity}</p>}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <ListItem
            primaryText="Terrain"
            secondaryText={<p>{this.state.view_planet.terrain}</p>}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <ListItem
            primaryText="Surface Water"
            secondaryText={<p>{this.state.view_planet.surface_water}</p>}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <ListItem
            primaryText="Population"
            secondaryText={<p>{this.state.view_planet.population}</p>}
          />
        </Col>
      </Row>
    )
  }
  loadPlanets = () => {
    if(this.state.noData){
      return (
        <Col xs={12} sm={12} md={12} lg={12}>
          <h2 className="text-center">{this.state.noData}</h2>
        </Col>
      )
    }else{
      return(
        this.state.planets && this.state.planets.map((planet, index)=>
          <Col xs={12} sm={4} md={4} lg={4} key={index}>
            <Card style={{marginTop:10,cursor:'pointer'}} onClick={(e)=>this.viewDetails(planet)}>
              <CardHeader title={<h4
                  style={{margin:0}}>
                    {planet.name}
                    <Badge style={{paddingBottom:0}} badgeContent={index+1} primary={true} ></Badge></h4>}
              style={{paddingBottom:0}}/>
              <CardText>
                Population : {isNaN(planet.population) ? '-' : planet.population/10000000} Cr.
              </CardText>
            </Card>
          </Col>
        )
      )
    }
  }
  viewDetails = (planet) => {
    this.setState({view_planet : planet});
    this.handleOpen();
  }
  render(){
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    return(
      <div>
        <Row className="planets-row">
          {this.loadPlanets()}
        </Row>
        <Dialog
          title={this.state.view_planet ? this.state.view_planet.name : ''}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <List>
            {this.state.open && this.view()}
          </List>
        </Dialog>
      </div>
    )
  }
}
