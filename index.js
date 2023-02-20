//this is the model of the building and it have name of the location, latitude and longtitude of the location, and id 
class Building{
   constructor(name,location,id){
     this.name = name;
     this.location = location;
     this.id = id;
  }
}
//this is the function that take a list of buildign and starting building and it will return an array of optimized route with there names
function deliver_route_optimization(buildings, start) {
  //this function will give you the index when you give it bulding id
  const getIndex = id =>  buildings.findIndex(b =>b.id == id);
  //this function will delete building when you give it building id
  const deleteBuilding = id => building = buildings.splice(getIndex(id), 1);
  //this will calculate the distance between coordinate points
  const calcDistance = (a, b) =>  Math.sqrt(Math.abs(Math.pow(b.location.lat - a.location.lat,2)+Math.pow(b.location.lng - a.location.lng,2)));
  //this is intializtion for the routing to start from start building
  let current = start;
  let routes = [start];  
  //this is deleting the starting buliding since it is processing first the starting building
  deleteBuilding(start.id);
  //this loop will run untill all buildings are processed
  while (buildings.length) {
    //this will calucate and return the nextbuilding
    let nextBuilding = buildings.reduce((a, b) => calcDistance(current, a) < calcDistance(current, b) ? a : b);
    //removes the processed bulding
    deleteBuilding(nextBuilding.id);
    //push it to the final retured building
    routes.push(nextBuilding);
    current = nextBuilding;
  }
  //push the starting buiding 
  routes.push(start);
  //returns only the name of the building
  return routes.map(p=>p.name);
}
//testing data
let buildings = [
  new Building("Building Home",{lat:8.9996702,lng:38.8173648},1),
  new Building("Building Fike",{lat:9.0263633,lng:38.8280546},2),
  new Building("Building Centeral",{lat:9.002362,lng:38.818082},3),
  new Building("Building L-Classic",{lat:9.0127383,lng:38.850977},4),
  new Building("Building lk kefle ketema",{lat:9.0165012,lng:38.8721129},5)
];

let start = buildings[0];
let routes = deliver_route_optimization(buildings, start);
console.log(routes);
//output of the test
"Building Home"
"Building Centeral"
"Building Fike" 
"Building L-Classic"
"Building lk kefle ketema"
"Building Home"
