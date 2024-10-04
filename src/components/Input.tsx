interface InputProps {
  label: string
  id: string
  type: string
  className?: string
  onChange?: React.ChangeEventHandler
  value?: string | number | readonly string[] | undefined
  required?: boolean
}

const Input = ({ label, id, type, className, onChange, value, required }: InputProps) => {
  return (
    <div className="w-full lg:w-fit flex flex-col items-center gap-y-2">
      <label htmlFor={id} className="text-md font-bold">{label}</label>
      <input type={type} name={id} id={id} className={`w-full lg:w-fit border-2 border-black p-1.5 rounded-md ${className}`} onChange={onChange} value={value} required={required} />
    </div>
  )
}

export default Input