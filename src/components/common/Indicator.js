import React, { Component } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import _ from 'lodash';

const style = {
  container: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    backgroundColor:'rgba(189,189,189,0.5)',
    zIndex: 9998,
    left: 0,
    top: 0
  },
  containerHide: {
    display : 'none',
    position : 'relative'
  },
  refresh: {
    display: 'block',
    position: 'relative',
    zIndex: 9999,
    marginLeft: '48%',
    marginTop: '23%'
  }
};

export default class Indicator extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  componentDidMount(){
    // console.log('Did Mount:', this.props.status);
    this.setState({status:this.props.status})
  }
  componentWillReceiveProps(nextProps){
    if(!_.isEqual(this.props.status,nextProps.status)){
      // console.log('Receive Props:',nextProps.status);
      this.setState({status:nextProps.status})
    }
  }
  render(){
    return(
      <div style={this.state.status === 'hide' ? style.containerHide : style.container}>
        <RefreshIndicator
          size={40}
          left={10}
          top={0}
          status={this.state.status}
          style={style.refresh}
        />
      </div>
    )
  }
}
