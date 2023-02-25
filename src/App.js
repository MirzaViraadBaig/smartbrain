import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import './App.css';
import React ,{ Component } from 'react';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particle from './components/Particles/Particle';
import FaceRecognation from './components/FaceRecognation/FaceRecognation';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
const USER_ID = 'kkf1d032jwpm';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '0150787d4f20412d9e364378b53aa370';
const APP_ID = 'my-first-application';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';   
//const IMAGE_URL = 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528';


var inp = '';
class App extends Component{

  constructor(){
    super();
    this.state = {
      input : '',
      IMAGE_URL: '',
      box : {},
      route: 'signin',
      isSignedIn: false,
      user :{
        id:'',
            name: '',
            email: '',
            entries: 0,
            joined: '',
            
            
      }
    }
  }

  

calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('Inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : clarifaiFace.left_col*width,
      topRow : clarifaiFace.top_row*height,
      rightCol : width - (clarifaiFace.right_col*width),
      bottomRow : height - (clarifaiFace.bottom_row*height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box)

    this.setState({box:box})
  }

  loadUser = (data) =>{                 
    this.setState({user :{
            id:data.id,
            name: data.name,
            email: data.email,
            
            entries: data.entries,
            joined: data.joined,
  }})

  }



  onInputChange = (event) =>{
    this.setState({input: event.target.value});
    inp = event.target.value;
    return inp;
   
  }
  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignedIn: false})

    }
    else if(route === 'home'){
      this.setState({isSignedIn: true})}
    this.setState({route: route})
  }

  onSubmit = () =>{
    this.setState({IMAGE_URL : this.state.input});  
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": inp
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      
      
      .then(result => this.displayFaceBox((this.calculateFaceLocation(result)))) //.outputs[0].data.regions[0].region_info.bounding_box
      
      .catch(error => console.log('error', error));
      
      
  }
  
  render() {
    const {isSignedIn, IMAGE_URL,route,box} = this.state
  return (
    
   
    <div className = "App">
      
      <Particle className='particle'/>
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route === 'home'
      ?<div>
      <Logo/>
      <Rank/>
      <ImageLinkForm
       onInputChange={this.onInputChange}
       onSubmit={this.onSubmit}
       />
      <FaceRecognation box = {box} IMAGE_URL = {IMAGE_URL}/>
      </div>
      :(route ==='signin'

      ?<SignIn loadUser = {this.loadUser} onRouteChange= {this.onRouteChange}/>
         :<Register loadUser = {this.loadUser} onRouteChange= {this.onRouteChange}/>)
  }
      
   
    
    </div>
  );
}
}


export default App;


//.then(response => response.json())