const WEEK = ['MONDAY', 'TUESDAY', 'WENSDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']

exports.luck=()=>{
    const lucky = WEEK[(Math.floor(Math.random() * WEEK.length))]
    return lucky
}