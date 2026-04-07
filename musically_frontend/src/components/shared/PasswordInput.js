const PasswordInput = ({ label, placeholder, className, value, setValue }) => {

    return (
        <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
            <label
                htmlFor={label}
                className="font-semibold">
                {label}
            </label>
            <input
                placeholder={placeholder}
                type="password"
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-md p-3 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                id={label}
                value={value}
                onChange={(e) =>
                    setValue(e.target.value)
                }
            />
        </div>
    )
};

export default PasswordInput