import { Link } from "react-router-dom"
// eslint-disable-next-line react/prop-types
export default function BottomWarning({ label, message, to }) {

    return <div className="bg-white-100 px-4 py-3 rounded relative text-center" role="alert">
       
        <span className="block sm:inline">{message } ?</span>
        <Link to={to} className="font-bold underline"> {label}</Link>
    </div>
}