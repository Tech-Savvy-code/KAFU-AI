import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground(){

const particlesInit = useCallback(async (engine) => {
await loadFull(engine);
}, []);

return(

<Particles
id="tsparticles"
init={particlesInit}
options={{
fullScreen:{ enable:false },

particles:{
number:{ value:50 },

color:{ value:"#10b981" },

links:{
enable:true,
distance:150,
color:"#10b981",
opacity:0.3,
width:1
},

move:{
enable:true,
speed:1
},

size:{
value:3
},

opacity:{
value:0.4
}
},

background:{
color:"transparent"
}
}}
/>

)

}