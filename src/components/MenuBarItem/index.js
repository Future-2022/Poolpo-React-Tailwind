import React from 'react'


const MenuBarItem = (props) => {
    return (
        <div className="w-auto md:w-280 p-2 bg-pink3 md:bg-white hover:bg-mainpink relative cursor-pointer rounded-xl">
            <img src={props.image} alt="" className="w-10 h-10 absolute top-4 left-4" />
            <div className="w-auto md:w-270 pl-16">
                <p className="text-black text-base font-SpartanMedium">{props.title}</p>
                <p className="text-black2 text-base font-OpenSansRegular">{props.content}</p>
            </div>
        </div>
    )
}

export default MenuBarItem;
