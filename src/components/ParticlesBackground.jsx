import { useEffect, useState } from "react"
import Particles from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

export default function ParticlesBackground(){

  const [init,setInit] = useState(false)

  useEffect(()=>{

    const initParticles = async(engine)=>{
      await loadSlim(engine)
    }

    initParticles()
    setInit(true)

  },[])

  if(!init) return null

  return (

    <Particles
      id="tsparticles"
      options={{

        fullScreen:{ enable:false },

        background:{
          color:"transparent"
        },

        particles:{

          number:{
            value:50
          },

          color:{
            value:"#10b981"
          },

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

        }

      }}
    />

  )
}