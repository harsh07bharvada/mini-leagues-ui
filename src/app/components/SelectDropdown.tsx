'use client'

interface SelectDropdownProps {
  labelText: string
  optionsList: Array<any>
  handleSelectChange: any
}
const SelectDropdown = ({
  labelText,
  optionsList,
  handleSelectChange,
}: SelectDropdownProps) => {
  const onSelectChange = (event: any) => {
    handleSelectChange(event.target.value)
  }
  return (
    <>
      <div className="flex flex-col p-2 space-y-3">
        <span className="text-sm font-medium text-gray-900">{labelText}</span>
        <select
          className="p-2.5 md:w-64 bg-white drop-shadow-lg text-slate-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 "
          onChange={onSelectChange}
        >
          {optionsList.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export default SelectDropdown
