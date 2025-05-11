import React, {props} from 'react'

function InfoCard(props) {
  return (
    <div className="flex gap-6 bg-base-100 p-6 rounded-2xl shadow-md border border-base-200/50">
        <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${props.color} rounded-full drop-shadow-xl`}>
            {props.icon}
        </div>
        <div>
            <h6 className='text-sm text-gray-500 mb-1 font-medium'>{props.heading}</h6>
            <span className='text-[22px]'>₹{props.amount}</span>
        </div>
  </div>
  )
}

export default InfoCard