// make the server up and running
const express = require('express');
const app = express();
// to work with dirictories
const path = require('path');
// to create reusable code in the ejs files
const ejsMate = require('ejs-mate');
// to override methods
const methodOverride = require('method-override');
// to use our API with the help of axios
const axios = require("axios");
// geocoder npm package
const NodeGeocoder = require('node-geocoder');
// making /views folder accesable from any path
app.set('views', path.join(__dirname, '/views'));
// to include EJS
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
// using method override
app.use(methodOverride('_method'));
// to be able to use files inside /public
app.use(express.static(__dirname + '/public'));
//using ejs-mate package
app.engine('ejs', ejsMate);

// Website Home Page
app.get(
    '/',
    (req, res)=>{
        res.render('pages/home.ejs');
    }
);
// Web Version Home (ORIGINAL)
app.get(
    '/webVersion',
    (req, res)=>{
        // let stops = [];
        // const options = {
        //   method: 'GET',
        //   url: 'https://samplepublictransportationsapi.onrender.com/',
        //   headers: {
        //     'Accept-Encoding': 'null'
        //   }
        // };
        // axios.request(options).then(function (response) {
        //   for(let i = 0 ; i<response.data.allNodes.length; i++){
        //     stops.push(
        //       response.data.allNodes[i].name
        //     )
        //   }
        //   res.render('pages/webVersion.ejs', {stops : stops});
        // }).catch(function (error) {
        //   console.error(error);
        // });
        // var config = {
        //   method: 'get',
        //   url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=الحي&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=AIzaSyAqDsDp7F3rMVqVaJgr6ciN_RAN0E5V6Yw',
        //   headers: { }
        // };
        
        // axios(config)
        // .then(function (response) {
        //   console.log(JSON.stringify(response.data.candidates[0].formatted_address));
        //   for(let i = 0 ; i<JSON.stringify(response.data.candidates.length); i++){
        //        stops.push(
        //               JSON.stringify(response.data.candidates[i].formatted_address)
        //         )
        //     }
        //     res.render('pages/webVersion.ejs' , {stops : stops});
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
        // res.render('pages/webVersion.ejs' , {stops : stops});
        res.render('pages/webVersion.ejs');
    }
);
// Web Version Home
// app.get(
//   '/webVersion',
//   (req, res)=>{
//       let stops = [];
//       // let location = req.body.Location;
//       let location ="العباسية";
//       var config = {
//         method: 'get',
//         url: `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
//         headers: { },
//         params: {
//           'key': 'AIzaSyAqDsDp7F3rMVqVaJgr6ciN_RAN0E5V6Yw',
//           'input': location
//          }
//       };
      
//       axios(config)
//       .then(function (response) {
//         console.log(req.body);
//         console.log(JSON.stringify(response.data.predictions[0].description));
//         for(let i = 0 ; i<JSON.stringify(response.data.predictions.length); i++){
//                       stops.push(
//                         JSON.stringify(response.data.predictions[i].description)
//                       )
//                     }
//                     res.render('pages/webVersion.ejs', {stops : stops});
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
      
//   }
// );
// contact us page
app.get(
    '/webVersion/contact',
    (req, res)=>{
        res.render('pages/contact.ejs');
    }
);
// About page
app.get(
    '/webVersion/about',
    (req,res) =>{
        res.render('pages/about.ejs');
    }
);



// // path result page
// app.post(
//     '/webVersion/result',
//     (req, res)=>{
//       let location = req.body.Location
//       let destination = req.body.Destination
//       const options = {
//         method: 'POST',
//         url: 'https://samplepublictransportationsapi.onrender.com/showResult',
//         headers: {
//           'content-type': 'application/json',
//           'Accept-Encoding': 'null'
//         },
//         data: `{"Location":"${location}","Destination":"${destination}"}`
//       };
      
//       axios.request(options).then(function (response) {
//         let numberOfAvailablePaths = response.data.recordsLength
//         let numberOfPathStops = response.data.length
//         let lastStop = response.data.endNode
//         let routeNumber = 1
//         let allPathsCombined = []
//         let routes = []
//         // to store all paths in one continous array without filtering each route separately
//         for(let i = 0 ; i< numberOfAvailablePaths ; i++){
//           for(let j = 0 ; j< numberOfPathStops ; j++){
//             allPathsCombined.push({
//               name: response.data.routes[i][j].name,
//               lineNumber: response.data.routes[i][j].lineNumber
//             })
//           }
//         }
//         // filtering routes from the collected allPathsCombined array
//         let k = numberOfPathStops
//         for(let i = 0 ; i < allPathsCombined.length ; i = i+numberOfPathStops){
//           routes.push(allPathsCombined.slice(i , k))
//           k = k + numberOfPathStops
//         }
//         res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths });
//       }).catch(function (error) {
//         console.error(error);
//       });
//         // res.render('pages/result.ejs');
//     }
// )
// //reult details page
// app.post(
//     '/webVersion/result/resultDetails/:id',
//     (req, res)=>{
//       const id = req.params.id
//     let location = req.query.Location
//     let destination = req.query.Destination
//     const options = {
//       method: 'POST',
//       url: 'https://samplepublictransportationsapi.onrender.com/showResult',
//       headers: {
//         'content-type': 'application/json',
//         'Accept-Encoding': 'null'
//       },
//       data: `{"Location":"${location}","Destination":"${destination}"}`
//     };
    
//     axios.request(options).then(function (response) {
//       let numberOfAvailablePaths = response.data.recordsLength
//       let numberOfPathStops = response.data.length
//       let lastStop = response.data.endNode
//       let routeNumber = 1
//       let allPathsCombined = []
//       let routes = []
//       // to store all paths in one continous array without filtering each route separately
//       for(let i = 0 ; i< numberOfAvailablePaths ; i++){
//         for(let j = 0 ; j< numberOfPathStops ; j++){
//           allPathsCombined.push({
//             name: response.data.routes[i][j].name,
//             lineNumber: response.data.routes[i][j].lineNumber
//           })
//         }
//       }
//       // filtering routes from the collected allPathsCombined array
//       let k = numberOfPathStops
//       for(let i = 0 ; i < allPathsCombined.length ; i = i+numberOfPathStops){
//         routes.push(allPathsCombined.slice(i , k))
//         k = k + numberOfPathStops
//       }
//       res.render('pages/resultDetails.ejs' , {id , routes , numberOfPathStops  , lastStop});
//     }).catch(function (error) {
//       console.error(error);
//     });
//         // res.render('pages/resultDetails.ejs');
//     }
// );

// orderByCost (Original)
app.post(
  '/webVersion/result/orderByCost',
  async (req , res)=>{
    let location = req.body.Location.split('،')[0]
    let destination = req.body.Destination.split('،')[0]
    let loc = req.body.Location 
    let dest = req.body.Destination
    // **********************************************
    // // public Transportation guidance api
    //     const options =  {
    //       method: 'POST',
    //       url: 'https://tawsila-api.onrender.com/orderByCost',
    //       headers: {
    //         'content-type': 'application/json',
    //         'Accept-Encoding': 'null'
    //       },
    //       data: `{"Location":"${loc}","Destination":"${dest}"}`
    //     };
    // // to check if you are in the /showResult/orderByDistance/ path
    // let currentURL = "/webVersion/result/orderByCost"
    // let currentOrder = "طريقك مرتب بحسب السعر"
    // axios.request(options).then(function (response) {
    //   let numberOfAvailablePaths = response.data.length
    //   let data = response.data
      
    //   let routeNumber = 1
    //   res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder});
    // }).catch(function (error) {
    //   console.error(error);
    // });
    // ***********************************************
    // pass the given loc & dest to the nearby api
    const nearby =  {
      method: 'POST',
      url: 'https://tawsila-api.onrender.com/nearby', 
      headers: {
        'content-type': 'application/json',
        'Accept-Encoding': 'null'
      },
      data: `{"Location":"${loc}","Destination":"${dest}"}`
    };
    axios.request(nearby).then(function(response){
      let nearbyArrayLength = response.data.length
      let nearbyArray = response.data
      let nearbyLocations = []
      let nearbyDestinations = []
      let newLocationLat;
      let newDestinationLat;
      let newLocationLong;
      let newDestinationLong;
      let locName;
      let destName;
      let locWalkingDistance;
      let destWalkingDistance;
      // get the closest places to both loc & dest
      for(let i=0 ; i<nearbyArrayLength ; i++){
        if(nearbyArray[i].inputField == "Location"){
          nearbyLocations.push(nearbyArray[i]);
          nearbyLocations.sort((a, b) => a.distance - b.distance)
        }else if(nearbyArray[i].inputField == "Destination"){
          nearbyDestinations.push(nearbyArray[i]);
        }
      }
      // search inside nearbyLocations, if you found any distance =0, take it as your location, else take the shortest distance
      for(let i=0 ; i<nearbyLocations.length ; i++){
        if(nearbyLocations[i].distance == 0){
          newLocationLat = nearbyLocations[i].latitude;
          newLocationLong = nearbyLocations[i].longitude;
          location = `${newLocationLat},${newLocationLong}`
          locName = nearbyLocations[i].name
          // search in the orderByCost query using them by replacing only the loc
          const options =  {
            method: 'POST',
            url: 'https://tawsila-api.onrender.com/orderByCost',
            headers: {
              'content-type': 'application/json',
              'Accept-Encoding': 'null'
            },
            data: `{"Location":"${newLocationLat},${newLocationLong}","Destination":"${dest}"}`
          };
      // to check if you are in the /showResult/orderByDistance/ path
      let currentURL = "/webVersion/result/orderByCost"
      let currentOrder = "طريقك مرتب بحسب السعر"
      axios.request(options).then(function (response) {
        let numberOfAvailablePaths = response.data.length
        let data = response.data
        
        let routeNumber = 1
        res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder, locWalkingDistance, destWalkingDistance});
      }).catch(function (error) {
        console.error(error);
      });
          break;
        }else if(nearbyLocations[i].distance != 0){
          newLocationLat = nearbyLocations[0].latitude
          newLocationLong = nearbyLocations[0].longitude
          location = `${newLocationLat},${newLocationLong}`
          locName = nearbyLocations[0].name
          locWalkingDistance = nearbyLocations[0].distance
          // search in the orderByCost query using them by replacing only the loc
          const options =  {
            method: 'POST',
            url: 'https://tawsila-api.onrender.com/orderByCost',
            headers: {
              'content-type': 'application/json',
              'Accept-Encoding': 'null'
            },
            data: `{"Location":"${newLocationLat},${newLocationLong}","Destination":"${dest}"}`
          };
      // to check if you are in the /showResult/orderByDistance/ path
      let currentURL = "/webVersion/result/orderByCost"
      let currentOrder = "طريقك مرتب بحسب السعر"
      axios.request(options).then(function (response) {
        let numberOfAvailablePaths = response.data.length
        let data = response.data
        
        let routeNumber = 1
        res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder, locWalkingDistance, destWalkingDistance});
      }).catch(function (error) {
        console.error(error);
      });
        }
      }
      // search inside nearbyDestinations, if you found any distance =0, take it as your destination, else take the shortest distance
      for(let i=0 ; i<nearbyDestinations.length ; i++){
        if(nearbyDestinations[i].distance == 0){
          newDestinationLat = nearbyDestinations[i].latitude;
          newDestinationLong = nearbyDestinations[i].longitude;
          destination = `${newDestinationLat},${newDestinationLong}`
          destName = nearbyDestinations[i].name
          // search in the orderByCost query using them by replacing only the dest
          const options =  {
            method: 'POST',
            url: 'https://tawsila-api.onrender.com/orderByCost',
            headers: {
              'content-type': 'application/json',
              'Accept-Encoding': 'null'
            },
            data: `{"Location":"${loc}","Destination":"${newDestinationLat},${newDestinationLong}"}`
          };
      // to check if you are in the /showResult/orderByCost/ path
      let currentURL = "/webVersion/result/orderByCost"
      let currentOrder = "طريقك مرتب بحسب السعر"
      axios.request(options).then(function (response) {
        let numberOfAvailablePaths = response.data.length
        let data = response.data
        
        let routeNumber = 1
        res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder, locWalkingDistance, destWalkingDistance});
      }).catch(function (error) {
        console.error(error);
      });
          break;
        }else if(nearbyDestinations[i].distance != 0){
          newDestinationLat = nearbyDestinations[0].latitude
          newDestinationLong = nearbyDestinations[0].longitude
          destination = `${newDestinationLat},${newDestinationLong}`
          destName = nearbyDestinations[0].name
          destWalkingDistance = nearbyDestinations[0].distance
          // search in the orderByCost query using them by replacing only the dest
          const options =  {
            method: 'POST',
            url: 'https://tawsila-api.onrender.com/orderByCost',
            headers: {
              'content-type': 'application/json',
              'Accept-Encoding': 'null'
            },
            data: `{"Location":"${loc}","Destination":"${newDestinationLat},${newDestinationLong}"}`
          };
      // to check if you are in the /showResult/orderByCost/ path
      let currentURL = "/webVersion/result/orderByCost"
      let currentOrder = "طريقك مرتب بحسب السعر"
      axios.request(options).then(function (response) {
        let numberOfAvailablePaths = response.data.length
        let data = response.data
        
        let routeNumber = 1
        res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder, locWalkingDistance, destWalkingDistance});
      }).catch(function (error) {
        console.error(error);
      });
        }
      }
      
      console.log(nearbyArray)
      console.log("********nearby locations***********")
      console.log(nearbyLocations)
      console.log("********nearby destinations********")
      console.log(nearbyDestinations)
      console.log("********test loc********")
      console.log(`${locName}: ${newLocationLat} | ${newLocationLong} | walk: ${locWalkingDistance}`)
      console.log("********test dest********")
      console.log(`${destName}: ${newDestinationLat} | ${newDestinationLong} | walk: ${destWalkingDistance}`)
    }).catch(function(error){console.log(error)})

  }
)


// orderByCost details
app.post(
  '/webVersion/result/orderByCost/resultDetails/:id',
  (req , res)=>{
    const id = req.params.id
    let location = req.query.Location
    let destination = req.query.Destination
    let locationWalk = req.query.LocationWalk
    let destinationWalk = req.query.DestinationWalk
    const options = {
      method: 'POST',
      url: 'https://tawsila-api.onrender.com/orderByCost',
      headers: {
        'content-type': 'application/json',
        'Accept-Encoding': 'null'
      },
      data: `{"Location":"${location}","Destination":"${destination}"}`
    };
  
    axios.request(options).then(function (response) {
      let numberOfAvailablePaths = response.data.length
      let data = response.data
      let results = [];
let lineNumbers = [];
let names = [];
let transportationTypes = [];

for (let i = 0; i < data[id - 1].length; i++) {
  if (data[id - 1][i].transportationType == 'bus') {
    if (data[id - 1][i + 1].lineNumber == data[id - 1][i].lineNumber) {
      data[id - 1][i + 1].name = data[id - 1][i].name;
    } else {
      const resultString = 'اركب اتوبيس (خط رقم: ' +
        data[id - 1][i].lineNumber +
        ') من ' +
        data[id - 1][i].name +
        ' -> ';
      lineNumbers.push(data[id - 1][i].lineNumber);
      names.push(data[id - 1][i].name);
      transportationTypes.push(data[id - 1][i].transportationType);
      results.push(resultString);
    }
  } else if (data[id - 1][i].transportationType == 'microbus') {
    if (data[id - 1][i + 1].lineNumber == data[id - 1][i].lineNumber) {
      data[id - 1][i + 1].name = data[id - 1][i].name;
    } else {
      const resultString = 'انزل ' +
        data[id - 1][i].name +
        ' واركب ميكروباص ' +
        data[id - 1][i].lineNumber +
        ' -> ';
      lineNumbers.push(data[id - 1][i].lineNumber);
      names.push(data[id - 1][i].name);
      transportationTypes.push(data[id - 1][i].transportationType);
      results.push(resultString);
    }
  } else if (data[id - 1][i].transportationType == 'metro') {
    if (data[id - 1][i + 1].lineNumber == data[id - 1][i].lineNumber) {
      data[id - 1][i + 1].name = data[id - 1][i].name;
    } else {
      const resultString = 'انزل ' +
        data[id - 1][i].name +
        ' واركب مترو ' +
        data[id - 1][i].lineNumber +
        ' -> ';
      lineNumbers.push(data[id - 1][i].lineNumber);
      names.push(data[id - 1][i].name);
      transportationTypes.push(data[id - 1][i].transportationType);
      results.push(resultString);
    }
  } else if (data[id - 1][i].transportationType == undefined) {
    const resultString = 'انزل ' + data[id - 1][i].name;
    names.push(data[id - 1][i].name);
    results.push(resultString);
  }
}

console.log(results); // Output the array of results
console.log(lineNumbers); // Output the array of lineNumbers
console.log(names); // Output the array of names
console.log(transportationTypes); // Output the array of transportationTypes
      res.render('pages/resultDetails.ejs' , {id  , numberOfAvailablePaths , data, location, destination,results, lineNumbers,names, transportationTypes});
    }).catch(function (error) {
      console.error(error);
    });
  }
)
// orderByDistance
app.post(
  '/webVersion/result/orderByDistance',
  (req , res)=>{
    let location = req.body.Location.split('،')[0]
    let destination = req.body.Destination.split('،')[0]
    let loc = req.body.Location
    let dest = req.body.Destination
    // **********************************************
    // const options = {
    //   method: 'POST',
    //   url: 'https://tawsila-api.onrender.com/orderByDistance',
    //   headers: {
    //     'content-type': 'application/json',
    //     'Accept-Encoding': 'null'
    //   },
    //   data: `{"Location":"${loc}","Destination":"${dest}"}`
    // };
    // // to check if you are in the /showResult/orderByDistance/ path
    // let currentURL = "/webVersion/result/orderByDistance"
    // let currentOrder = "طريقك مرتب بحسب المسافة"
    // axios.request(options).then(function (response) {
    //   let numberOfAvailablePaths = response.data.length
    //   let data = response.data
    //   let routeNumber = 1
    //   res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL, currentOrder});
    // }).catch(function (error) {
    //   console.error(error);
    // });
    // *************************************************
    // pass the given loc & dest to the nearby api
    const nearby =  {
      method: 'POST',
      url: 'https://tawsila-api.onrender.com/nearby', 
      headers: {
        'content-type': 'application/json',
        'Accept-Encoding': 'null'
      },
      data: `{"Location":"${loc}","Destination":"${dest}"}`
    };
    axios.request(nearby).then(function(response){
      let nearbyArrayLength = response.data.length
      let nearbyArray = response.data
      let nearbyLocations = []
      let nearbyDestinations = []
      let newLocationLat;
      let newDestinationLat;
      let newLocationLong;
      let newDestinationLong;
      let locName;
      let destName;
      let locWalkingDistance;
      let destWalkingDistance;
      // get the closest places to both loc & dest
      for(let i=0 ; i<nearbyArrayLength ; i++){
        if(nearbyArray[i].inputField == "Location"){
          nearbyLocations.push(nearbyArray[i]);
          nearbyLocations.sort((a, b) => a.distance - b.distance)
        }else if(nearbyArray[i].inputField == "Destination"){
          nearbyDestinations.push(nearbyArray[i]);
        }
      }
      // search inside nearbyLocations, if you found any distance =0, take it as your location, else take the shortest distance
      for(let i=0 ; i<nearbyLocations.length ; i++){
        if(nearbyLocations[i].distance == 0){
          newLocationLat = nearbyLocations[i].latitude;
          newLocationLong = nearbyLocations[i].longitude;
          location = `${newLocationLat},${newLocationLong}`
          locName = nearbyLocations[i].name
          // search in the orderByCost query using them by replacing only the loc
          const options =  {
            method: 'POST',
            url: 'https://tawsila-api.onrender.com/orderByDistance',
            headers: {
              'content-type': 'application/json',
              'Accept-Encoding': 'null'
            },
            data: `{"Location":"${newLocationLat},${newLocationLong}","Destination":"${dest}"}`
          };
      // to check if you are in the /showResult/orderByDistance/ path
      let currentURL = "/webVersion/result/orderByDistance"
      let currentOrder = "طريقك مرتب بحسب المسافة"
      axios.request(options).then(function (response) {
        let numberOfAvailablePaths = response.data.length
        let data = response.data
        
        let routeNumber = 1
        res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder, locWalkingDistance, destWalkingDistance});
      }).catch(function (error) {
        console.error(error);
      });
          break;
        }else if(nearbyLocations[i].distance != 0){
          newLocationLat = nearbyLocations[0].latitude
          newLocationLong = nearbyLocations[0].longitude
          location = `${newLocationLat},${newLocationLong}`
          locName = nearbyLocations[0].name
          locWalkingDistance = nearbyLocations[0].distance
          // search in the orderByCost query using them by replacing only the loc
          const options =  {
            method: 'POST',
            url: 'https://tawsila-api.onrender.com/orderByDistance',
            headers: {
              'content-type': 'application/json',
              'Accept-Encoding': 'null'
            },
            data: `{"Location":"${newLocationLat},${newLocationLong}","Destination":"${dest}"}`
          };
      // to check if you are in the /showResult/orderByDistance/ path
      let currentURL = "/webVersion/result/orderByDistance"
      let currentOrder = "طريقك مرتب بحسب المسافة"
      axios.request(options).then(function (response) {
        let numberOfAvailablePaths = response.data.length
        let data = response.data
        
        let routeNumber = 1
        res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder, locWalkingDistance, destWalkingDistance});
      }).catch(function (error) {
        console.error(error);
      });
        }
      }
      // search inside nearbyDestinations, if you found any distance =0, take it as your destination, else take the shortest distance
      for(let i=0 ; i<nearbyDestinations.length ; i++){
        if(nearbyDestinations[i].distance == 0){
          newDestinationLat = nearbyDestinations[i].latitude;
          newDestinationLong = nearbyDestinations[i].longitude;
          destination = `${newDestinationLat},${newDestinationLong}`
          destName = nearbyDestinations[i].name
                   // search in the orderByDistance query using them by replacing only the dest
                   const options =  {
                    method: 'POST',
                    url: 'https://tawsila-api.onrender.com/orderByDistance',
                    headers: {
                      'content-type': 'application/json',
                      'Accept-Encoding': 'null'
                    },
                    data: `{"Location":"${loc}","Destination":"${newDestinationLat},${newDestinationLong}"}`
                  };
              // to check if you are in the /showResult/orderByDistance/ path
              let currentURL = "/webVersion/result/orderByDistance"
              let currentOrder = "طريقك مرتب بحسب المسافة"
              axios.request(options).then(function (response) {
                let numberOfAvailablePaths = response.data.length
                let data = response.data
                
                let routeNumber = 1
                res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder, locWalkingDistance, destWalkingDistance});
              }).catch(function (error) {
                console.error(error);
              });
          break;
        }else if(nearbyDestinations[i].distance != 0){
          newDestinationLat = nearbyDestinations[0].latitude
          newDestinationLong = nearbyDestinations[0].longitude
          destination = `${newDestinationLat},${newDestinationLong}`
          destName = nearbyDestinations[0].name
          destWalkingDistance = nearbyDestinations[0].distance
          // search in the orderByDistance query using them by replacing only the dest
          const options =  {
            method: 'POST',
            url: 'https://tawsila-api.onrender.com/orderByDistance',
            headers: {
              'content-type': 'application/json',
              'Accept-Encoding': 'null'
            },
            data: `{"Location":"${loc}","Destination":"${newDestinationLat},${newDestinationLong}"}`
          };
      // to check if you are in the /showResult/orderByDistance/ path
      let currentURL = "/webVersion/result/orderByDistance"
      let currentOrder = "طريقك مرتب بحسب المسافة"
      axios.request(options).then(function (response) {
        let numberOfAvailablePaths = response.data.length
        let data = response.data
        
        let routeNumber = 1
        res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder, locWalkingDistance, destWalkingDistance});
      }).catch(function (error) {
        console.error(error);
      });
        }
      }
      
      console.log(nearbyArray)
      console.log("********nearby locations***********")
      console.log(nearbyLocations)
      console.log("********nearby destinations********")
      console.log(nearbyDestinations)
      console.log("********test loc********")
      console.log(`${locName}: ${newLocationLat} | ${newLocationLong} | walk: ${locWalkingDistance}`)
      console.log("********test dest********")
      console.log(`${destName}: ${newDestinationLat} | ${newDestinationLong} | walk: ${destWalkingDistance}`)
    }).catch(function(error){console.log(error)})
  }
)
// orderByDistance details
app.post(
  '/webVersion/result/orderByDistance/resultDetails/:id',
  (req , res)=>{
    const id = req.params.id
    let location = req.query.Location
    let destination = req.query.Destination
    let locationWalk = req.query.LocationWalk
    let destinationWalk = req.query.DestinationWalk
    const options = {
      method: 'POST',
      url: 'https://tawsila-api.onrender.com/orderByDistance',
      headers: {
        'content-type': 'application/json',
        'Accept-Encoding': 'null'
      },
      data: `{"Location":"${location}","Destination":"${destination}"}`
    };
    
    axios.request(options).then(function (response) {
      let numberOfAvailablePaths = response.data.length
      let data = response.data
      let results = [];
      let lineNumbers = [];
      let names = [];
      let transportationTypes = [];
      
      for (let i = 0; i < data[id - 1].length; i++) {
        if (data[id - 1][i].transportationType == 'bus') {
          if (data[id - 1][i + 1].lineNumber == data[id - 1][i].lineNumber) {
            data[id - 1][i + 1].name = data[id - 1][i].name;
          } else {
            const resultString = 'اركب اتوبيس (خط رقم: ' +
              data[id - 1][i].lineNumber +
              ') من ' +
              data[id - 1][i].name +
              ' -> ';
            lineNumbers.push(data[id - 1][i].lineNumber);
            names.push(data[id - 1][i].name);
            transportationTypes.push(data[id - 1][i].transportationType);
            results.push(resultString);
          }
        } else if (data[id - 1][i].transportationType == 'microbus') {
          if (data[id - 1][i + 1].lineNumber == data[id - 1][i].lineNumber) {
            data[id - 1][i + 1].name = data[id - 1][i].name;
          } else {
            const resultString = 'انزل ' +
              data[id - 1][i].name +
              ' واركب ميكروباص ' +
              data[id - 1][i].lineNumber +
              ' -> ';
            lineNumbers.push(data[id - 1][i].lineNumber);
            names.push(data[id - 1][i].name);
            transportationTypes.push(data[id - 1][i].transportationType);
            results.push(resultString);
          }
        } else if (data[id - 1][i].transportationType == 'metro') {
          if (data[id - 1][i + 1].lineNumber == data[id - 1][i].lineNumber) {
            data[id - 1][i + 1].name = data[id - 1][i].name;
          } else {
            const resultString = 'انزل ' +
              data[id - 1][i].name +
              ' واركب مترو ' +
              data[id - 1][i].lineNumber +
              ' -> ';
            lineNumbers.push(data[id - 1][i].lineNumber);
            names.push(data[id - 1][i].name);
            transportationTypes.push(data[id - 1][i].transportationType);
            results.push(resultString);
          }
        } else if (data[id - 1][i].transportationType == undefined) {
          const resultString = 'انزل ' + data[id - 1][i].name;
          names.push(data[id - 1][i].name);
          results.push(resultString);
        }
      }
      
      console.log(results); // Output the array of results
      console.log(lineNumbers); // Output the array of lineNumbers
      console.log(names); // Output the array of names
      console.log(transportationTypes); // Output the array of transportationTypes
      res.render('pages/resultDetails.ejs' , {id  , numberOfAvailablePaths , data, locationWalk, destinationWalk, location, destination,results, lineNumbers,names, transportationTypes});
    }).catch(function (error) {
      console.error(error);
    });
  }
)
//live location page
app.get(
    '/resultDetails/liveLocation',
    (req, res)=>{
      const location = req.query.Location;
      const destination = req.query.Destination;
      const results = req.query.Results;
      const names = req.query.names;
      const types = req.query.types;
      const lineNumbers = req.query.lineNumbers;
      app.get('/api/liveLocationData', (req, res) => {
        const dataToSend = {
          results,
          names,
          types,
          lineNumbers,
        };
        res.json(dataToSend);
      });
        res.render('pages/liveLocation.ejs',{names,types,lineNumbers})
    }
);
// orderByTime
app.post(
  '/webVersion/result/orderByTime',
  (req , res)=>{
    let location = req.body.Location.split('،')[0]
    let destination = req.body.Destination.split('،')[0]
    let loc = req.body.Location
    let dest = req.body.Destination
    // **********************************************
    // const options = {
    //   method: 'POST',
    //   url: 'https://tawsila-api.onrender.com/orderByDistance',
    //   headers: {
    //     'content-type': 'application/json',
    //     'Accept-Encoding': 'null'
    //   },
    //   data: `{"Location":"${loc}","Destination":"${dest}"}`
    // };
    // // to check if you are in the /showResult/orderByDistance/ path
    // let currentURL = "/webVersion/result/orderByDistance"
    // let currentOrder = "طريقك مرتب بحسب المسافة"
    // axios.request(options).then(function (response) {
    //   let numberOfAvailablePaths = response.data.length
    //   let data = response.data
    //   let routeNumber = 1
    //   res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL, currentOrder});
    // }).catch(function (error) {
    //   console.error(error);
    // });
    // *************************************************
    // pass the given loc & dest to the nearby api
    const nearby =  {
      method: 'POST',
      url: 'https://tawsila-api.onrender.com/nearby', 
      headers: {
        'content-type': 'application/json',
        'Accept-Encoding': 'null'
      },
      data: `{"Location":"${loc}","Destination":"${dest}"}`
    };
    axios.request(nearby).then(function(response){
      let nearbyArrayLength = response.data.length
      let nearbyArray = response.data
      let nearbyLocations = []
      let nearbyDestinations = []
      let newLocationLat;
      let newDestinationLat;
      let newLocationLong;
      let newDestinationLong;
      let locName;
      let destName;
      let locWalkingDistance;
      let destWalkingDistance;
      // get the closest places to both loc & dest
      for(let i=0 ; i<nearbyArrayLength ; i++){
        if(nearbyArray[i].inputField == "Location"){
          nearbyLocations.push(nearbyArray[i]);
          nearbyLocations.sort((a, b) => a.distance - b.distance)
        }else if(nearbyArray[i].inputField == "Destination"){
          nearbyDestinations.push(nearbyArray[i]);
        }
      }
      // search inside nearbyLocations, if you found any distance =0, take it as your location, else take the shortest distance
      for(let i=0 ; i<nearbyLocations.length ; i++){
        if(nearbyLocations[i].distance == 0){
          newLocationLat = nearbyLocations[i].latitude;
          newLocationLong = nearbyLocations[i].longitude;
          location = `${newLocationLat},${newLocationLong}`
          locName = nearbyLocations[i].name
          // search in the orderByTime query using them by replacing only the loc
          const options =  {
            method: 'POST',
            url: 'https://tawsila-api.onrender.com/orderByTime',
            headers: {
              'content-type': 'application/json',
              'Accept-Encoding': 'null'
            },
            data: `{"Location":"${newLocationLat},${newLocationLong}","Destination":"${dest}"}`
          };
      // to check if you are in the /showResult/orderByDistance/ path
      let currentURL = "/webVersion/result/orderByTime"
      let currentOrder = "طريقك مرتب بحسب الوقت"
      axios.request(options).then(function (response) {
        let numberOfAvailablePaths = response.data.length
        let data = response.data
        
        let routeNumber = 1
        res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder, locWalkingDistance, destWalkingDistance});
      }).catch(function (error) {
        console.error(error);
      });
          break;
        }else if(nearbyLocations[i].distance != 0){
          newLocationLat = nearbyLocations[0].latitude
          newLocationLong = nearbyLocations[0].longitude
          location = `${newLocationLat},${newLocationLong}`
          locName = nearbyLocations[0].name
          locWalkingDistance = nearbyLocations[0].distance
          // search in the orderByCost query using them by replacing only the loc
          const options =  {
            method: 'POST',
            url: 'https://tawsila-api.onrender.com/orderByTime',
            headers: {
              'content-type': 'application/json',
              'Accept-Encoding': 'null'
            },
            data: `{"Location":"${newLocationLat},${newLocationLong}","Destination":"${dest}"}`
          };
      // to check if you are in the /showResult/orderByDistance/ path
      let currentURL = "/webVersion/result/orderByTime"
      let currentOrder = "طريقك مرتب بحسب الوقت"
      axios.request(options).then(function (response) {
        let numberOfAvailablePaths = response.data.length
        let data = response.data
        
        let routeNumber = 1
        res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder, locWalkingDistance, destWalkingDistance});
      }).catch(function (error) {
        console.error(error);
      });
        }
      }
      // search inside nearbyDestinations, if you found any distance =0, take it as your destination, else take the shortest distance
      for(let i=0 ; i<nearbyDestinations.length ; i++){
        if(nearbyDestinations[i].distance == 0){
          newDestinationLat = nearbyDestinations[i].latitude;
          newDestinationLong = nearbyDestinations[i].longitude;
          destination = `${newDestinationLat},${newDestinationLong}`
          destName = nearbyDestinations[i].name
                   // search in the orderByDistance query using them by replacing only the dest
                   const options =  {
                    method: 'POST',
                    url: 'https://tawsila-api.onrender.com/orderByTime',
                    headers: {
                      'content-type': 'application/json',
                      'Accept-Encoding': 'null'
                    },
                    data: `{"Location":"${loc}","Destination":"${newDestinationLat},${newDestinationLong}"}`
                  };
              // to check if you are in the /showResult/orderByDistance/ path
              let currentURL = "/webVersion/result/orderByTime"
              let currentOrder = "طريقك مرتب بحسب الوقت"
              axios.request(options).then(function (response) {
                let numberOfAvailablePaths = response.data.length
                let data = response.data
                
                let routeNumber = 1
                res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder, locWalkingDistance, destWalkingDistance});
              }).catch(function (error) {
                console.error(error);
              });
          break;
        }else if(nearbyDestinations[i].distance != 0){
          newDestinationLat = nearbyDestinations[0].latitude
          newDestinationLong = nearbyDestinations[0].longitude
          destination = `${newDestinationLat},${newDestinationLong}`
          destName = nearbyDestinations[0].name
          destWalkingDistance = nearbyDestinations[0].distance
          // search in the orderByDistance query using them by replacing only the dest
          const options =  {
            method: 'POST',
            url: 'https://tawsila-api.onrender.com/orderByTime',
            headers: {
              'content-type': 'application/json',
              'Accept-Encoding': 'null'
            },
            data: `{"Location":"${loc}","Destination":"${newDestinationLat},${newDestinationLong}"}`
          };
      // to check if you are in the /showResult/orderByDistance/ path
      let currentURL = "/webVersion/result/orderByTime"
      let currentOrder = "طريقك مرتب بحسب الوقت"
      axios.request(options).then(function (response) {
        let numberOfAvailablePaths = response.data.length
        let data = response.data
        
        let routeNumber = 1
        res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder, locWalkingDistance, destWalkingDistance});
      }).catch(function (error) {
        console.error(error);
      });
        }
      }
      
      console.log(nearbyArray)
      console.log("********nearby locations***********")
      console.log(nearbyLocations)
      console.log("********nearby destinations********")
      console.log(nearbyDestinations)
      console.log("********test loc********")
      console.log(`${locName}: ${newLocationLat} | ${newLocationLong} | walk: ${locWalkingDistance}`)
      console.log("********test dest********")
      console.log(`${destName}: ${newDestinationLat} | ${newDestinationLong} | walk: ${destWalkingDistance}`)
    }).catch(function(error){console.log(error)})
  }
)
// orderByTime details
app.post(
  '/webVersion/result/orderByTime/resultDetails/:id',
  (req , res)=>{
    const id = req.params.id
    let location = req.query.Location
    let destination = req.query.Destination
    let locationWalk = req.query.LocationWalk
    let destinationWalk = req.query.DestinationWalk
    const options = {
      method: 'POST',
      url: 'https://tawsila-api.onrender.com/orderByTime',
      headers: {
        'content-type': 'application/json',
        'Accept-Encoding': 'null'
      },
      data: `{"Location":"${location}","Destination":"${destination}"}`
    };
  
    axios.request(options).then(function (response) {
      let numberOfAvailablePaths = response.data.length
      let data = response.data
      let results = [];
      let lineNumbers = [];
      let names = [];
      let transportationTypes = [];
      
      for (let i = 0; i < data[id - 1].length; i++) {
        if (data[id - 1][i].transportationType == 'bus') {
          if (data[id - 1][i + 1].lineNumber == data[id - 1][i].lineNumber) {
            data[id - 1][i + 1].name = data[id - 1][i].name;
          } else {
            const resultString = 'اركب اتوبيس (خط رقم: ' +
              data[id - 1][i].lineNumber +
              ') من ' +
              data[id - 1][i].name +
              ' -> ';
            lineNumbers.push(data[id - 1][i].lineNumber);
            names.push(data[id - 1][i].name);
            transportationTypes.push(data[id - 1][i].transportationType);
            results.push(resultString);
          }
        } else if (data[id - 1][i].transportationType == 'microbus') {
          if (data[id - 1][i + 1].lineNumber == data[id - 1][i].lineNumber) {
            data[id - 1][i + 1].name = data[id - 1][i].name;
          } else {
            const resultString = 'انزل ' +
              data[id - 1][i].name +
              ' واركب ميكروباص ' +
              data[id - 1][i].lineNumber +
              ' -> ';
            lineNumbers.push(data[id - 1][i].lineNumber);
            names.push(data[id - 1][i].name);
            transportationTypes.push(data[id - 1][i].transportationType);
            results.push(resultString);
          }
        } else if (data[id - 1][i].transportationType == 'metro') {
          if (data[id - 1][i + 1].lineNumber == data[id - 1][i].lineNumber) {
            data[id - 1][i + 1].name = data[id - 1][i].name;
          } else {
            const resultString = 'انزل ' +
              data[id - 1][i].name +
              ' واركب مترو ' +
              data[id - 1][i].lineNumber +
              ' -> ';
            lineNumbers.push(data[id - 1][i].lineNumber);
            names.push(data[id - 1][i].name);
            transportationTypes.push(data[id - 1][i].transportationType);
            results.push(resultString);
          }
        } else if (data[id - 1][i].transportationType == undefined) {
          const resultString = 'انزل ' + data[id - 1][i].name;
          names.push(data[id - 1][i].name);
          results.push(resultString);
        }
      }
      
      console.log(results); // Output the array of results
      console.log(lineNumbers); // Output the array of lineNumbers
      console.log(names); // Output the array of names
      console.log(transportationTypes); // Output the array of transportationTypes
      res.render('pages/resultDetails.ejs' , {id  , numberOfAvailablePaths , data, location, destination,results, lineNumbers,names, transportationTypes});
    }).catch(function (error) {
      console.error(error);
    });
  }
)
// add new route page
app.get(
    '/webVersion/newRoute',
    (req, res)=>{
        res.render('pages/newRoute.ejs');
    }
)
// Settings page
app.get(
    '/webVersion/settings',
    (req, res)=>{
        res.render('pages/settings.ejs');
    }
)
// account page
app.get(
  '/webVersion/settings/account',
  (req, res)=>{
      res.render('pages/account.ejs');
  }
)


// listen on local host port
app.listen(3000,()=>{console.log('Listening on port 3000')});





// to chain apis

// function locAdressToLatLong() {
//   return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAqDsDp7F3rMVqVaJgr6ciN_RAN0E5V6Yw&address=${loc}`);
// }

// function destAdressToLatLong() {
//   return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAqDsDp7F3rMVqVaJgr6ciN_RAN0E5V6Yw&address=${dest}`);
// }

// function tawsilaApi() {
//   return axios.post(
//     `https://tawsila-api.onrender.com/orderByCost`,
//     {
//       Location: `30.02735999999999,31.2559448`,
//       Destination: `30.0306686,31.232628`
//     }
//     );
// }
// const [locationCoordinates, destinationCoordinates, result] = await Promise.all([locAdressToLatLong(), destAdressToLatLong(), tawsilaApi()]);


// Promise.all([locAdressToLatLong(), destAdressToLatLong()] , tawsilaApi())
//   .then(function ([locationCoordinates, destinationCoordinates, result]) {
//     var localatTemp = locationCoordinates.data.results[0].geometry.location.lat
//     var locLongTmep = locationCoordinates.data.results[0].geometry.location.lng 
//     var destLatTmep = destinationCoordinates.data.results[0].geometry.location.lat
//     var destLongTmep  = destinationCoordinates.data.results[0].geometry.location.lng
    
//     let locationID=locationCoordinates.data.results[0].place_id;
//     let destinationID=destinationCoordinates.data.results[0].place_id;
    
//     locLat= localatTemp;
//     locLong = locLongTmep;
//     destLat = destLatTmep;
//     destLong = destLongTmep;
//     console.log(locationCoordinates.data.results[0].geometry.location_type)
//     console.log(destinationCoordinates.data.results[0].geometry.location_type)
    
//     const options =  {
//               method: 'POST',
//               url: 'https://tawsila-api.onrender.com/orderByCost',
//               headers: {
//                 'content-type': 'application/json',
//                 'Accept-Encoding': 'null'
//               },
//               data: {Location:`${locLat},${locLong}`,Destination:`${destLat},${destLong}`}
//             };
            
             
//              console.log(localatTemp ,locLongTmep)
//     console.log(destLatTmep ,destLongTmep )
//         // to check if you are in the /showResult/orderByDistance/ path
//         let currentURL = "/webVersion/result/orderByCost"
//         let currentOrder = "طريقك مرتب بحسب السعر"
//         axios.request(options).then(function (response) {
//           // console.log(locLat)
//           let numberOfAvailablePaths = response.data.length
//           let data = response.data
//           let routeNumber = 1
//           res.render('pages/result.ejs' , {location , destination  , routeNumber  , numberOfAvailablePaths, data,currentURL,currentOrder});
//         }).catch(function (error) {
//           console.error(error);
//         });
//   });