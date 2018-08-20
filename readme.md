
## Table of Contents

- [Introduction](#introduction)
- [Basic Functionalities](#basic-functionalities)
- [Demographics analysis API](#demographics-analysis-api)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)

## Introduction

Demographics Analysis is a react based web application that does dedemographic analysis based on image URLs.

Build with [Create React App](https://github.com/facebook/create-react-app).

[Click here](https://smartbrain-demographics.herokuapp.com/) for online preview.

##### Tech stack
``` Webpack + React + React Router + Node.js + Express + PostgreSQL + Heroku ```


## Basic Functionalities

- User Signup
![user sign up page](https://raw.githubusercontent.com/ambitiousbird/demographics/master/signUp.png)
- User Signin
![user sign in page](https://raw.githubusercontent.com/ambitiousbird/demographics/master/signIn.png)
- Logged in Page
![logged in page](https://raw.githubusercontent.com/ambitiousbird/demographics/master/loggedIn.png)
- Demographics Analysis
![Demographic analysis page](https://raw.githubusercontent.com/ambitiousbird/demographics/master/Demographics.png)

## Demographics analysis API
- Connecting to [Clarifi API](https://clarifai.com/models/demographics-image-recognition-model-c0c0ac362b03416da06ab3fa36fb58e3)

```
const Clarifai=require('clarifai');

const app = new Clarifai.App({
    apiKey: 'cf36ce8e02514f0c8eead8853a714662'
});

const APICallHandler=()=>(req,res)=>{
    app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3',req.body.input)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>res.status(400).json('Unable to get API response'));
}
```
- Fetch response from the API:
```
fetch('https://demographics-api.herokuapp.com/imageurl',{
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
          fetch('https://demographics-api.herokuapp.com/image',{
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
```
Using the reponse data for front end DOM:
```
  calculateFaceInfo=(data)=>{
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
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
