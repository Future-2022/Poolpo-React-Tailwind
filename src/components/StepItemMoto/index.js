import React from 'react'


const StepItemMoto = (props) => {

    return (
        <>
            {!!props.image ?
                <div className={`${props.item === props.state ? `bg-pink2 shadow-md` : `bg-pink4`} w-full rounded-2xl relative cursor-pointer`} onClick={props.onClick}>
                    <div className="w-full flex items-center px-1" style={{ height: "120px" }}>
                        <img src={props.image} alt="" className="mx-auto my-4" />
                    </div>
                    <p className="text-black font-SpartanMedium text-base md:text-base text-center py-3">{props.name}</p>
                </div>
                :
                <div className="w-full flex items-center">
                    <div className={`${props.item === props.state ? `bg-pink2 shadow-md` : `bg-pink4`} w-full rounded-2xl relative cursor-pointer`} onClick={props.onClick}>
                        <p className="text-black font-SpartanMedium text-base md:text-base text-center py-3">{props.name}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default StepItemMoto;
