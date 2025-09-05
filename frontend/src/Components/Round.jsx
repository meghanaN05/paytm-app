/* eslint-disable react/prop-types */
export default function Round({label}) {
    return <div className="flex items-center justify-between p-1 m-1 rounded-full w-12 h-12">
        <span className="rounded-full bg-blue-300 p-1 w-8 h-8 flex items-center justify-center text-center">{label.charAt(0).toUpperCase()}</span>
    </div>
}
