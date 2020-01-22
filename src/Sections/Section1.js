// import react from "react";
import React from 'react';
import Section2 from './Section2';
import Section3 from './Section3';
import Modal from './Modal';
import 'bootstrap/dist/css/bootstrap.css';


class Section1 extends React.Component {
    state = {
        test: null,
        activeSection: 1,
        searchText: "",
        searchTextIsValid: false,
        warningActive: false,
        chosenDuration: "",
        loaderActive: false ,
        lat: null,
        long: null,
        openweathermapAPI: "de6d52c2ebb7b1398526329875a49c57",
        daysOfDurationChosen: null,
        duration: null,
        apiData: null,
        apiCallErr: false,
        durationError: false,
        locationError: true,
        weatherError: false,
        modalOpen: false,
        city: "",
        country: ""
    }

    componentDidMount() {
        //clear input
        this.setState({searchText : ""})
        const goog = window.google
        let input = document.getElementById("searchTextField");
        
        const autoCompleteObject = new goog.maps.places.Autocomplete(input);
        
       // event listener on autocomplete
        autoCompleteObject.addListener('place_changed', ()=> {
            //get the inputted address predcited by using the event listener on autocomplete
            console.log(autoCompleteObject);
            const newSearchValue = autoCompleteObject.gm_accessors_.place.hd.formattedPrediction;
            //do error check
            if(!newSearchValue) {
                alert("error in autocomplete listener")
            }
            else {
                this.setState({searchText: newSearchValue})
            }

        });
       
        
        // if (!place.geometry) {
        //   // User entered the name of a Place that was not suggested and
        //   // pressed the Enter key, or the Place Details request failed.
        //   // Do anything you like with what was entered in the ac field.
        //   console.log('You entered: ' + place.name);
        //   return;
        // }
        window.addEventListener("click", ()=>{
            console.log(this.state.searchText);
        });
        window.addEventListener("keypress", ()=>{
            console.log(this.state.searchText);
         
        });
    }
    
    handleSearchText = (e)=>{
        //sets the value for input from the event Change
        this.setState({searchText:e.target.value},(()=>{
            if(this.state.searchText.length === 0){
                this.setState({searchTextIsValid: false})
            }
            else {
            this.setState({searchTextIsValid: true})
            }
        }));
  
 
       
    }
    handleSectionChange = (sectionNumber)=>{
        if(sectionNumber === 2){
            this.setState({activeSection: sectionNumber, modalOpen: false})
        }
       
    }

    handleCheckLocation = (e)=>{
        e.preventDefault();
        console.log(this.state.searchText);
        
        this.setState({loaderActive: true});
        //make sure api gets results
        const apiKey = "AIzaSyDJDbvpB5ANQBj-Q5cjjEoRZ388f0JsNjA";   
        let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.searchText}&key=${apiKey}`;
        fetch(geocodeUrl)
            .then((res)=>{
                return res;   
            })
            .then((res)=>{
                if(res.status === 400){
                    this.setState({error:"couldnt get that location, try again"});
                    this.setState({loaderActive: false, locationError: true, modalOpen: true});
                    console.log("400 error");
                    return "error";
                }else {
                    return res.json(); 
                }
            })
            .then((res)=>{
                console.log("check one 2", res);
                
                this.setState({loaderActive: false});
                //error check here with if statement
                const city = res.results[0].address_components[0].long_name;
                const country = res.results[0].address_components[2].long_name;
                const lat = res.results[0].geometry.location.lat;
                const long = res.results[0].geometry.location.lng;
                if(city && country && lat && long) {
                    this.setState({city , country, lat, long, locationError: false, modalOpen: true});
                }
                //popular error div
                else{
                    console.log("res",res);
                    
                    this.setState({locationError: true, modalOpen: true})
                }
               

             })
             .catch((e)=>{
                console.log("api error",e);
                 this.setState({locationError: true, loaderActive: false, modalOpen: true});
            })

     
        
        // this.setState({activeSection:2})
    }
    handleGetWeather = ()=>{
        this.setState({activeSection:3})
    }
    handleWarning = ()=>{
        setTimeout(()=>{ 
            alert("Hello"); 
        }, 3000);
    }
    handleRenderWeather = ()=>{
    console.log("render weather");
    //loader bar while fecthing
    this.setState({loaderActive:true});
    // Check if durationOption Has been Chosen
       if(!this.state.chosenDuration) {
            console.log("if");
            this.setState({durationError: true, loaderActive:false})
            setTimeout(()=>{ 
                this.setState({durationError: false})
            }, 3000);
            
       }else {
            console.log("else");  
            const urlOpenWeatherMaps = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${this.state.lat}&lon=${this.state.long}&cnt=10&APPID=${this.state.openweathermapAPI}&units=metric`;
            var exampleStatic = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=53.3498053&lon=-6.2603097&cnt=10&APPID=de6d52c2ebb7b1398526329875a49c57&units=metric`;

            fetch(urlOpenWeatherMaps)
            .then((res)=>{
                return res.json();   	   
            })
            .then((res)=>{
                console.log(res);
                if(res.status > 400) {
                    this.setState({weatherError: true, loaderActive:false});
                    return;
                }
                this.setState({apiData: res, loaderActive:false, activeSection: 3});
            })
            .catch((err)=>{
                this.setState({weatherError: true, loaderActive:false});
                alert(err);
            })

        }
    }


    setClickedElement = (e)=> {
        //Get Text Of Element clicked
        var clickedEltxt = e.target.innerHTML;
        console.log(clickedEltxt);
        //Decolor all durationElements
        //$durationElements.addClass("greenBackground").removeClass("durationChosenStyle");
        
        switch(clickedEltxt) {
            case "Just Today":
              // code block
              this.setState({chosenDuration:"Just Today", duration: 0});
              break;
            case "Next 3 Days":
              // code block
              this.setState({chosenDuration:"Next 3 Days", duration: 2});
              break;
            case "Next 10 Days":
              // code block
              this.setState({chosenDuration:"Next 10 Days", duration: 10});
              break;
            default:
              // code block
          }
        
          //Change Color Of Selected Option
          //$(e.target).removeClass("greenBackground").addClass("durationChosenStyle");
      }



    render(){
        return(
           
            <div className={`entirety`}> 
                {/* Errors */}
                {/* duration section 2 */}
                {this.state.durationError ? <div className="alert alert-warning" style={{textAlign:"center"}}>Please Choose a duration</div>: <div></div>}
                {/* Render Weather Error */}
                {this.state.weatherError ? <div className="alert alert-warning" style={{textAlign:"center"}}>Problem Rendering Weather</div>: <div></div>}
            

                 {/* Section One */}
                 {this.state.activeSection === 1? <section className="section1">
                 <h1 className={`unopacified ${this.state.modalOpen ? "opacified": ""}`}>Choose a Location:</h1>
                 <input 
                    type="text" 
                    name="location"
                    id="searchTextField" 
                    size="50" 
                    value={this.state.searchText} 
                    onChange={(e)=>{this.handleSearchText(e)}}
                    className={`unopacified ${this.state.modalOpen ? "opacified": ""}`}
                />
 
                 {this.state.searchTextIsValid ? <a className={`searchButtonCont defaultButtonStyle unopacified ${this.state.modalOpen ? "opacified": ""}`}
                 onClick={(e)=>{this.handleCheckLocation(e)}}
                //  disabled={!this.state.searchText}
                disabled={true}
                 href="/jlksd"
                 >Check Location</a>: 
                 <button onClick={this.handleWarning} className="searchButtonCont defaultButtonStyle disabled" disabled>Check Location</button>}
                 <div className={`alert alert-warning ${!this.state.warningActive ? "appearToggle": ""}`}>
                 <strong>Warning!</strong> Must enter Valid Location
                 </div>
                 </section>: <div></div>}
                 {this.state.modalOpen ? <Modal
                 modelOpen={this.state.modalOpen}
                 handleSectionChange={this.handleSectionChange}
                 locationError={this.state.locationError}
                 city={this.state.city} country={this.state.country}
                 />:<div></div>}

                 
            {/* Section Two */}
            {this.state.activeSection === 2? <Section2 
            handleGetWeather={this.handleGetWeather} 
            setClickedElement={this.setClickedElement}
            chosenDuration={this.state.chosenDuration}
            handleRenderWeather={this.handleRenderWeather}
            />: <div></div>}

            {/* Section Three */}
            {this.state.activeSection === 3? <Section3
            data={this.state.apiData}
            duration={this.state.duration}
            />: <div></div>}

            {/* Loader */}
            <div className={`loader ${this.state.loaderActive ? "loaderActive" :""}`}>Checking</div>
            </div>
          )
    }
}    


    


export default Section1;