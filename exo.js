var WATER_POINT_TYPE = "WATER";
var EARTH_POINT_TYPE = "EARTH";
var ISLAND_POINT_TYPE="ISLAND";
var POINT_TYPES = [WATER_POINT_TYPE, EARTH_POINT_TYPE,ISLAND_POINT_TYPE];

var DEFAULT_WATER_COLOR = [30, 144, 255];
var DEFAULT_EARTH_COLOR = [105, 105, 105];
var DEFAULT_ISLAND_COLOR = [0, 0, 0];
var DEFAULT_COLORS = {
  [WATER_POINT_TYPE]: DEFAULT_WATER_COLOR, // blue
  [EARTH_POINT_TYPE]: DEFAULT_EARTH_COLOR, // dark grey
  [ISLAND_POINT_TYPE]:DEFAULT_ISLAND_COLOR
};

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

class Map {
  constructor(height, width) {
    var map = [];
    var flags=[]
    for (var i = 0; i < height; i++) {
      var row = [];
      var rowFlag=[];
      for (var j = 0; j < width; j++) {
        row.push(this.generatePointType());
        rowFlag.push(false)
      }
      map.push(row);
      flags.push(rowFlag);
    }
    this.map = map;
    this.flags=flags;
    this.numcolumns=width;
    this.numrows=height;
  }

  generatePointType() {
    return POINT_TYPES[generateRandomInteger(2)];
  }

  generateRandomColor() {
    var color = undefined;
    while (!color || Object.keys(DEFAULT_COLORS).includes(color)) {
      color = [];
      for (var i = 0; i < 3; i++) {
        color.push(generateRandomInteger(256));
      }
    }
    return color;
  }

  getRawMap() {
    var rawMap = [];
    for (var i = 0; i < this.map.length; i++) {
      var row = [];
      for (var j = 0; j < this.map[i].length; j++) {
        row.push(DEFAULT_COLORS[this.map[i][j]]);
      }
      rawMap.push(row);
    }
    return rawMap;
  }

  getColoredMap() {
    // TODO: That's where you work
    
    var coloredMap = [];
    var allIslands=this.solve();
    for(var j=0;j<this.map.length;j++){
      for(var m=0;m<this.map[j].length;m++){
        var row=[]
        
        for (var i = 0; i < allIslands.length; i++) {
          var color=this.generateRandomColor()
         for(var k=0;k < allIslands[i].length;k++)
         {
          
            var index_x=allIslands[i][k][0]
            var index_y=allIslands[i][k][1]
            if(j==index_x && m==index_y){
              row.push(color)
            }else{
              row.push(this.map[j][m])
            }
          
         }
        }
        coloredMap.push(row)
      }
      
    }
    
    return coloredMap;
  }
  
  findConnectedNeighbour(i, j, collection) {
    // since we are visiting, i,j lets put visited true
    this.flags[i][j] = true;
    collection.push([i,j]);
    //Left
    var canWeGoLeft =
      j - 1 >= 0 &&
      this.flags[i][j-1] === false &&
      this.map[i][j-1] === POINT_TYPES[1];
    if (canWeGoLeft) {
      this.findConnectedNeighbour(i, j - 1, collection);
    }
    //Right
    var canWeGoRight =
      j + 1 <= this.numcolumns - 1 &&
      this.flags[i][j+1] === false &&
      this.map[i][j+1] === POINT_TYPES[1];
    if (canWeGoRight) {
      this.findConnectedNeighbour(i, j + 1, collection);
    }
    //UP
    var canWeGoUp =
      i - 1 >= 0 &&
      this.flags[i-1][j] === false &&
      this.map[i-1][j] === POINT_TYPES[1];
    if (canWeGoUp) {
      this.findConnectedNeighbour(i - 1, j, collection);
    }
    //Down
    var canWeGoDown =
      i + 1 <= this.numrows - 1 &&
      this.flags[i+1][j] === false &&
      this.map[i+1][j] === POINT_TYPES[1];
    if (canWeGoDown) {
      this.findConnectedNeighbour(i + 1, j, collection);
    }
    
  }
 
  solve() {
    
    var allIsLands = [];
    for (var i = 0; i < this.map.length; i++) {
      
      for (var j = 0; j < this.map[i].length; j++) {
        if (this.flags[i][j]=== false) {
          this.flags[i][j] = true;
          if (this.map[i][j] === POINT_TYPES[1]) {
            var island = [];
            this.findConnectedNeighbour(i, j, island);
            allIsLands.push(island);
          }
        }
      }
      
    }
    return allIsLands;
    
    
}
  
}