'use client'

interface ButtonProps {
  isDisabled: boolean
  buttonText: string
  handleOnClick: any
}
const Button = ({ isDisabled, buttonText, handleOnClick }: ButtonProps) => {
  return (
    <>
      <button
        disabled={isDisabled}
        className="bg-orange-400 p-5 rounded-md text-white font-semibold disabled:bg-slate-400"
        onClick={(event) => {
          handleOnClick(event)
        }}
      >
        {buttonText}
      </button>
    </>
  )
}

export default Button
