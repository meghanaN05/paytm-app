// eslint-disable-next-line react/prop-types
export default function Balance({ bal }) {

   return <div className="p-2 m-2 font-bold">
      Your Balance is ₹{parseInt(bal)}
   </div>
}