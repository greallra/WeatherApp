
import React from 'react';
// import data from '../data';
import clouds from '../img/clouds.svg';
import clear from '../img/Clear.svg';
import snow from '../img/Clear.svg';
import rain from '../img/lightRain.svg';
// import clouds from '../img/Clear.svg'
// import clouds from '../img/Clear.svg'



import belowZero from '../img/-0.svg';
import zeroToTen from '../img/0-10.svg';
import tenToFifteen from '../img/10-15.svg';
import fifteenToTwenty from '../img/15-20.svg';
import twentyToTwentyFive from '../img/20-25.svg';
import twentyFiveToThirty from '../img/25-30.svg';
import overThirty from '../img/30+.svg';


export default class Section3 extends React.Component {
    state = {
        list:[],
        city: null,
        weather:[],
        loading:true,
        data:null
    }
   
    componentDidMount(){
        console.log("this.props.data", this.props.data);
        console.log("set the data state");
        this.setState({data: this.props.data}, () => {
            this.checkData();
        });
          
    }

    checkData = ()=>{
        //check if api data exists
        if(this.state.data !== null){
            console.log('yes', this.state.data);
            const arr = [];
            //set city
            this.setState(
            {city:this.state.data.city.name});
            //weather array    
            for(var i = 0; i < this.state.data.list.length; i++) {  
                arr.push({
                    weatherImg: `img/${this.state.data.list[i].weather[0].main}.svg`,
                    tempImg: `temp/${this.state.data.list[i].temp.day}.svg`,
                    temp: this.state.data.list[i].temp.day
                })       
            }
            this.setState(prevState => ({
                ...prevState,
                weather: arr,
                loading:false
            }))
                  
        }
       else{
        console.log('no', this.state.data);
       }
    }
    
    getWeatherImg = (url)=>{
        if(url.includes("Cloud") || url.includes("oud")){
            return clouds
        }
        else if(url.includes("lear")){
            return clear
        }
        else if(url.includes("now")){
            return snow
        }
        else if(url.includes("ain")){
            return rain
        }
        else{
            return "no"
        }
        
    }
    getTempImg = (temp)=>{
        if(temp > 30){
            return overThirty;
        }
        else if(temp > 25 && temp < 31){
            return twentyFiveToThirty;
        }
        else if(temp > 20 && temp < 26){
            return twentyToTwentyFive;
        }
        else if(temp > 15 && temp < 21){
            return fifteenToTwenty;
        }
        else if(temp > 9 && temp < 16){
            return tenToFifteen;
        }
        else if(temp > 0 && temp < 11){
            return zeroToTen;
        }
        else if(temp < 0){
            return belowZero;
        }
        else{
            return "no"
        }
    }
    renderH2 = (i)=>{
        let otherSentence = "In " + i + " days: " 

        if(i === 0){
            return <h2>Today:</h2>
        }
        else if(i ===1){
            return <h2>Tomorrow:</h2>
        }
        else {
            return <h2>{otherSentence}</h2>
        }
    }

    html = ()=>{
        if(this.state.loading){
            return (<div>Loading...</div>)
        }
        else {
            return this.state.weather.map((obj, i)=>{
                console.log("index", i);
                
                if(i <= this.props.duration){
                    return <div class="weatherResultsCont d-flex justify-content-center" key={1}>
                    <span>
                        {
                            this.renderH2(i)
                        }
                        {/* {i == 0 ? <h2>Today:</h2>:<span></span>}
                        {i == 1 ? <h2>Tomorrow:</h2>:<span></span>}
                        {i > 1 ? <h2>{i} days from now:</h2>:<span></span>} */}
                        
                    </span>
                    <span><img src={this.getWeatherImg(obj.weatherImg)} alt=""/></span>
                    <span><img src={this.getTempImg(obj.temp)} alt=""/><span id="tempNum">{Math.round(obj.temp)}°</span></span>
                </div>
                }
                
            })
           
        }
     
    }
    render(){
      

        return(
 
            <div >
                {this.html()}
                <a class={`defaultButtonStyle`} href="/">New Search</a>
           
                {/* <span><h2>Tomorrow:</h2></span>
                <span><img src={"./weatherImages/cloudy.svg"} alt=""/></span>
                <span><img src="./weatherImages/20-25.svg" alt=""/><span id="tempNum">22 °</span></span>
                             */}
           
            </div>
          )
    }
}    


