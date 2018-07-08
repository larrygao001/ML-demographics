import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/Logo';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Demographics from './components/Demographics/Demographics';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


const particlesOptions={
    particles: {
      number:{
        value:60,
        density:{
          enable:true,
          value_area:860,
    }}}
}
const initialState={
    input:'',
    imageUrl: ' ',
    results:{},
    route:'',
    isSignedIn:false,
    user:{
      id:"",
      name:"",
      email:"",
      entries:0,
      joined:new Date()
    }
}

class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl: ' ',
      results:{},
      route:'',
      isSignedIn:false,
      user:{
        id:"",
        name:"",
        email:"",
        entries:0,
        joined:new Date()
      }
    }
  }

  loadUser=(data)=>{
    this.setState(
      {
        user:
        {
          id:data.id,
          name:data.name,
          email:data.email,
          entries:data.entries,
          joined:data.joined
        }
      }
    )
  }

  calculateFacePosition=(data)=>{
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const demographics = data.outputs[0].data.regions[0].data.face;
    const image = document.getElementById("inputimage");
    const width=Number(image.width);
    const height=Number(image.height);
    return{
      leftCol: face.left_col*width,
      topRow: face.top_row*height,
      rightCol: width-(face.right_col*width),
      bottomRow: height-(face.bottom_row)*height,
      
      age:demographics.age_appearance.concepts[0].name,
      ageValue:demographics.age_appearance.concepts[0].value,
      gender:demographics.gender_appearance.concepts[0].name,
      genderValue:demographics.gender_appearance.concepts[0].value,
      multicultural:demographics.multicultural_appearance.concepts[0].name,
      multiculturalValue:demographics.multicultural_appearance.concepts[0].value
    }
    
  }

  detectFace=(results)=>{
    this.setState({results:results});
    // this.setState({results:results});
  }

  onInputChange=(e)=>{
    this.setState({input:e.target.value});
  }

  onButtonSubmit=()=>{
      this.setState({imageUrl:this.state.input});
      fetch('https://polar-headland-16657.herokuapp.com/imageurl',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          input:this.state.input
        })
      })
      .then(response=>response.json())
      .then(response=>{
        //increment user usuage count
        if(response){
          fetch('https://polar-headland-16657.herokuapp.com/image',{
              method:'put',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                id:this.state.user.id
              })
          })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
          .catch(console.log);
        }
        this.detectFace(this.calculateFacePosition(response));
      })
      .catch(err=>console.log(err));
  }

  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState(initialState);
      // this.state=initialState;
    }else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }

  isSignedIn=()=>{
    return this.state.route ==='signin';
  }

  render() {
    const {route,imageUrl,results, isSignedIn} =this.state;
    return (
      <div className="App">
          <Particles className='particles'
            params={particlesOptions}/>
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>

          {route ==='home'?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <div>
              <div>
                  <ImageLinkForm 
                    onInputChange={this.onInputChange}
                    onButtonSubmit= {this.onButtonSubmit}/>
                  <FaceRecognition imageUrl={imageUrl} results={results}/>
              </div>
              <div>
                <Demographics age={results.age} gender={results.gender} multicultural={results.multicultural}
                  ageValue={results.ageValue} genderValue={results.genderValue} multiculturalValue={results.multiculturalValue}/>
              </div>
            </div>
          </div>
          :(
            route==='signin'?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>:
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          }
      </div>
    );
  }
}

export default App;
