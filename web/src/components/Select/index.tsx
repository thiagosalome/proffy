import React, { SelectHTMLAttributes } from 'react'

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({
  label, name, options, ...rest
}: SelectProps) => (
  <div className="select-block">
    <label htmlFor={name}>{label}</label>
    <select value='' name={name} id={name} {...rest}>
      <option value='' disabled hidden>Selecione uma opção</option>
      {
        options.map((optionItem) => (
          <option key={optionItem.value} value={optionItem.value}>{optionItem.label}</option>
        ))
      }
    </select>
  </div>
)

export default Select
