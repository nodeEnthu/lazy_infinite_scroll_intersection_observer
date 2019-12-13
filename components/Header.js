import React from "react";
import classnames from  "classnames";
class Header extends React.Component {
  constructor(props) {
    super (props);

    this.state = {
      leftNavOpen: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      leftNavOpen: !this.state.leftNavOpen
    })
  }

  render () {
    const { leftNavOpen } = this.state;
    return (
      <div className= "header">
       <div className= { classnames ({ "nav-hamburger" : true, open: leftNavOpen })} onClick= {this.toggle}>
         <span></span>
         <span></span>
         <span></span>
       </div>
       <div className= "logo-image">
       <img src ="https://colorlib.com/wp/wp-content/uploads/sites/2/Templating-Engines-for-JavaScript.png"></img>
       </div>
       <nav className= { classnames ({ "main-nav" : true, "nav-open": leftNavOpen })}>
         <li>
            Knock
          </li>
          <li>
            Knock
          </li>
          <li>
            Jokes
          </li>
          <li>
            Neva
          </li>
          <li>
            Get
          </li>
          <li>
            Old
          </li>
        </nav>
      </div>
     )
  }
}

export default Header