import { useState } from "react"

interface Tags {
  [tag: string]: boolean;
}

type Props = {
  setTags: React.Dispatch<React.SetStateAction<Tags>>
  label: string;
  more?: boolean;
}

function Checkbox({ setTags, label, more = false }: Props) {
  const [checked, setChecked] = useState<boolean>(false)

  const handleCheck = (e: any) => {
    setTags(prev => ({ ...prev, [e.target.id]: !checked }))
    setChecked(prev => !prev)
  }

  return (
    <div 
      id={label}
      onClick={handleCheck} 
      className={`
        px-3 py-2
        cursor-pointer w-fit
        rounded-3xl ${more ? '' : ''}
        ${checked && !more ? 'bg-accent/10 text-accent-foreground' : 'bg-secondary'}
      `}
    >
      {label}
    </div>
  )
}

export default Checkbox