// eslint-disable-next-line react/prop-types
export default function InputBox({ label, placeholder, onchange, type = "text" }) {
    return <div className="p-2 m-2">
        <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" type={type} placeholder={placeholder} onChange={onchange} />
    </div>
}