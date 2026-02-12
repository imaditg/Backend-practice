const days = ['Monday','Tuesday','Wensday','Thursday','Friday','Saturday','Sunday']

exports.getFortune=()=>{
     const lucky = Math.floor(Math.random() * days.length)
     console.log(days[lucky])
     return days[lucky];
}