
import React from 'react'

export default class Section2 extends React.Component {
    state = {
       
    }

    setClickedElement = (e)=>{
        e.preventDefault();
        this.props.setClickedElement(e);
    }
    handleRenderWeather = (e)=>{
        e.preventDefault();
        this.props.handleRenderWeather();
    }
    

    render(){
        return(
            <div> 
            <section>
                <h1 className="" style={{textAlign: "center"}}>Choose A Duration:</h1>
                <a className={`durationElements defaultButtonStyle ${this.props.chosenDuration === "Just Today" ? "active" :""}`}  href="/valid"
                onClick={(e)=>{this.setClickedElement(e)}}>Just Today</a>
                <a className={`durationElements defaultButtonStyle ${this.props.chosenDuration === "Next 3 Days" ? "active" :""}`} href="/valid"  onClick={(e)=>{this.setClickedElement(e)}}>Next 3 Days</a>
                <a className={`durationElements defaultButtonStyle ${this.props.chosenDuration === "Next 10 Days" ? "active" :""}`} href="/valid"  onClick={(e)=>{this.setClickedElement(e)}}>Next 10 Days</a>
                <a id="durationBtn" className="durationElements defaultButtonStyle" href="/valid" onClick={this.handleRenderWeather}>Get Weather</a>
                <div className={`loader ${this.state.loaderActive ? "loaderActive" :""}`}>Loading</div>
            </section>
            </div>
          )
    }
}    


