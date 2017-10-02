import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { withRouter } from 'react-router';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

class Login extends Component {
 static muiName = 'FlatButton';

 render() {
   return null;
 }
}

class Logged extends Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    return (
     <IconMenu
       {...this.props}
       iconButtonElement={
         <IconButton><MoreVertIcon /></IconButton>
       }
       targetOrigin={{horizontal: 'right', vertical: 'top'}}
       anchorOrigin={{horizontal: 'right', vertical: 'top'}}
     >
       <MenuItem primaryText="Sign out" onClick={(e)=>this.props.signout()}/>
     </IconMenu>
    );
  }
}

Logged.muiName = 'IconMenu';

class Header extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  signout = () => {
    localStorage.setItem('loggedIn',false);
    localStorage.setItem('user','');
    this.props.history.push('/login');
  }
  render(){
    return (
      <AppBar
        title="The Star Wars"
        showMenuIconButton = {false}
        iconElementRight={localStorage.getItem('loggedIn') === 'true' ? <Logged signout={this.signout}/> : <Login />
        }
      />
    )
  }
}

export default withRouter(Header);
