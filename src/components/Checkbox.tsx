type Props = {
  setAddNewTag?: React.Dispatch<React.SetStateAction<boolean>>
  removeTag: (tag: string) => void
  label: string;
  more?: boolean;
  isChecked?: boolean;
}

function Checkbox({ removeTag, label, setAddNewTag, more = false, isChecked = false }: Props) {
  const handleCheck = (e: any) => {
    if (more && setAddNewTag) {
      setAddNewTag(prev => !prev)
    } else {
      removeTag(e.target.id)
    }
  }

  return (
    <div 
      id={label}
      onClick={handleCheck} 
      className={`
        px-3 py-2
        cursor-pointer w-fit
        rounded-3xl 
        ${isChecked && !more ? 'bg-accent/10 text-accent-foreground' : 'bg-secondary'}
      `}
    >
      {label}
    </div>
  )
}

export default Checkbox