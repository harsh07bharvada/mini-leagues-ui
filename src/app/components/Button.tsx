'use client'

interface ButtonProps {
  buttonText: string
  handleOnClick: any
}
const Button = ({ buttonText, handleOnClick }: ButtonProps) => {
  return (
    <>
      <button
        className="bg-orange-400 p-5 rounded-md text-white font-semibold"
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
