const getAMPM = (hour: number) => {
  if (hour === 0) return "AM"
  else if (hour === 12) return "PM"
  if (hour > 12) return "PM"
  else return "AM"
}

const getHour = (hour: number) => {
  if (hour === 0) return 12
  else if (hour > 12) return hour - 12
  else return hour
}

export const displayTime = (timestamp: number) => {
  const date = new Date(timestamp)
  const [__, timeString] = date.toLocaleString().split(", ")
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  const [hour, minute, _] = timeString.split(":")
  
  return `${day}/${month}/${year} 
    ${getHour(Number(hour))}:${minute} ${getAMPM(Number(hour))}`
}

export const displayAddress = (address: `0x${string}`) => {
  return `${address?.slice(0, 5)}...${address?.slice(address?.length-3)}`
}