const getLyrics = require("./getLyrics")
const getSong = require("./getSong")
const options ={
    apiKey:"cg9f2iLgcr8y2p7S2uU1OiddI0pHaWRSMh7mr8A4drcrSZbsIampD1CShKRcxc0-",
    title:"baby",
    artist:"justin bieber",
    optimizeQuery:true

}
getLyrics(options).then((lyrics)=>{console.log(lyrics)});
