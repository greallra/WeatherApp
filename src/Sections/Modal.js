import React from 'react';
import styled from 'styled-components';

  const SuccessDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1000;
  background:#fafafa;
  transform: translate(-50%, -50%);
    box-shadow:0px 1px 0px #2f6627;
    border-radius:28px;
    width: 500px;
    height: 370px;
    &:hover {
    
    }
  `;

  const FailureDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
  background:#fafafa;
  transform: translate(-50%, -50%);
    box-shadow:0px 1px 0px #2f6627;
    border-radius:28px;
    width: 500px;
    height: 370px;
    &:hover {
    
    }
  `;
  
  const h3style = {
    padding: '20px',
    color: 'black',
    fontSize: '19px',
    textAlign: 'center'
  };
class Modal extends React.Component {
  state = {
    city: undefined,
    country: undefined,
    class: "opacified"
  };
 
  componentDidMount() {
    if(this.props.city && this.props.country){
      this.setState({city: this.props.city, country: this.props.country})
    }

    this.setState({class:"unopacified"})
  }

  changeLocationSuccessState = () => {
    this.setState({ open: false });
  };

  handleSectionChange = ()=>{
    this.props.handleSectionChange(2);
  }
  handleRestart = ()=>{
    window.location.href = "/";
  }

  render() {
    return (
      <div className={this.state.class}>
        {!this.props.locationError ? <SuccessDiv>
          <h3 style={h3style}>Location Found: {this.state.city}, {this.state.country}</h3>
          <button onClick={this.handleSectionChange} className="defaultButtonStyle">Is this correct? Press to continue</button>
          <button onClick={this.handleRestart} className="defaultButtonStyle greyButtonStyle">Change Search</button>
        </SuccessDiv>:
        <FailureDiv>
          <h3 style={h3style}>Sorry, Couldnt get that location</h3>
          <a href = "/" className="defaultButtonStyle">Try Again?</a>
        </FailureDiv>
        }
      </div>
    );
  }
  
}

export default Modal;

