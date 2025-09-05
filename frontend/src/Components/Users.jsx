import Button from "./Button";
import Round from "./Round";

/* eslint-disable react/prop-types */
export default function User({ name, onclick }) {
    return <div className="flex items-center justify-between p-2 bg-light">

        <div className="flex items-center justify-start gap-4"> <Round label={name} /> <h3 className="font-bold">{name}</h3>

        </div><Button label={"Send"} onclick={onclick} />

    </div>
}


