export const Field = ({ fieldType, name, error, register, label, required = true }) => {
  label = label || name.charAt(0).toUpperCase() + name.slice(1)
  const isPass = Boolean(fieldType === 'password')

  return (
    <div className={ isPass ? 'passwrapper' : ''}>
      <label>{label}</label>
      <input
        type={fieldType}
        aria-invalid={{ error } ? 'true' : 'false'}
        name={name}
        ref={register}
      />
    </div>
  )
}
