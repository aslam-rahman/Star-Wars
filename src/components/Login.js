import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid, Row, Col} from 'react-bootstrap';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import Header from "./common/Header";
import Indicator from "./common/Indicator";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      open: false,
      status : 'hide'
    };
  }
  handleChange = (value, name) => {
    this.setState({
      [name]: value
    })
  }
  handleRequestClose = () => {
    this.setState({
      open: false
    });
  }
  login = () => {
    var self = this;
    let {username, password} = this.state;
    if(username && password){
      this.setState({status:'loading'});
      axios.get('people?search='+username)
        .then(function (response) {
          if(response.data.count === 0){
            self.setState({
              open: true,
              snackText : 'Username and password is incorrect'
            });
          }else{
            //redirect to search page
            localStorage.setItem('loggedIn',true);
            localStorage.setItem('user',username);
            self.setState({status:'hide'});
            self.props.history.push('/search');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }else{
      this.setState({
        open: true,
        snackText : 'Username and password is mandatory'
      });
    }
  }
  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message={this.state.snackText ? this.state.snackText : ''}
          autoHideDuration={8000}
          onRequestClose={this.handleRequestClose}
        />
        <Header />
        <Indicator status={this.state.status}/>
        <Grid className="marginAuto">
          <Card>
            <CardHeader title={<h4 style={{margin:0}}>Login</h4>} style={{paddingBottom:0}}/>
            <CardText style={{paddingTop:0}}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <TextField floatingLabelText="Username" fullWidth={true}
                  value={this.state.username ?this.state.username : ''}
                  onChange={(e,newValue)=>this.handleChange(newValue,'username')}/>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <TextField floatingLabelText="Password" fullWidth={true}
                  value={this.state.password ? this.state.password : ''}
                  onChange={(e,newValue)=>this.handleChange(newValue,'password')}/>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <RaisedButton label="Login" primary={true} style={{marginTop:10}} onClick={(e)=>{this.login()}}/>
                </Col>
              </Row>
            </CardText>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default App;
