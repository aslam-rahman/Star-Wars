import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-bootstrap';
import _ from 'lodash';
import Header from "./common/Header";
import Indicator from "./common/Indicator";
import Planet from "./common/Planet";

class Search extends Component {
  constructor(props){
    super(props);
    this.state={
      count:0,
      status : 'hide',
      noData : 'Try searching any planets'
    }
  }
  componentDidMount() {
    if(localStorage.getItem('user') !== 'Luke Skywalker'){
      setInterval(()=>{
        this.setState({count:0})
      },60000);
    }
  }
  handleChange = (e, value, name) => {
    this.loadResults(name, value)
  }
  loadResults = (name, value) => {
    var self = this;
    this.setState({
      status:'loading'
    })
    axios.get('planets?search='+value)
      .then(function (response) {
        if(value){
          if(response.data.count === 0){
            //no data available
            self.setState({
              noData : 'No planets available. Try searching any other planets',
              status:'hide',
              planets:[],
              [name]: value,
              count: ++self.state.count
            })
          }else{
            //search text and results available
            let chars = _.orderBy(response.data.results, o => parseFloat(o.population), ['desc'])
            self.setState({
              planets:chars,
              status:'hide',
              noData:'',
              [name]: value,
              count: ++self.state.count
            })
          }
        }else{
          //search text empty
          self.setState({
            noData : 'Try searching any planets',
            status:'hide',
            planets:[],
            [name]: value,
            count: ++self.state.count
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    if(this.state.count >= 15 && localStorage.getItem('user') !== 'Luke Skywalker'){
      return(
        <Grid style={{width:'100%',marginTop:20}}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h2 className="text-center">Search limit exceeded 15 times for this user. Wait for some time.</h2>
            </Col>
          </Row>
      </Grid>
      )
    }
    return (
      <div>
        <Header />
        <Indicator status={this.state.status}/>
        <Grid style={{width:'100%',marginTop:20}}>
          <Card>
            <CardHeader title={<h4 style={{margin:0}}>Search Planets</h4>} style={{paddingBottom:0}}/>
            <CardText>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <TextField fullWidth={true}
                  hintText="Search planets by name"
                  onChange={(e,newValue)=>this.handleChange(e, newValue,'search')}/>
                </Col>
              </Row>
              <Planet planets={this.state.planets} noData={this.state.noData}/>
            </CardText>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default Search;
