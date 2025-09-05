// eslint-disable-next-line react/prop-types
export default function Button({ label, onclick }) {


    // eslint-disable-next-line react/no-unknown-property
    return <button onClick={onclick} className="bg-black text-white rounded p-2 m-2 hover:shadow-lg w-24 h-10">{label}</button>
}

