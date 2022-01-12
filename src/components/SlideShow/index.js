import React, { useState } from 'react'

import dotrounded from '../../img/dot-rounded.png';
import dot from '../../img/dot.png';
import left from '../../img/chevron-left.png';
import right from '../../img/chevron-right.png';
import imagenotfound from '../../img/image-notfound.png';


const SlideShow = (props) => {
    
    const [start, setStart] = useState(0);

    const touchmove = e => {
        console.log(e);
    }

    const beforeIndex = () => {
        setStart(start - 1 >= 0 ? start - 1 : 0)
    }
    const afterIndex = () => {
        setStart(start + 1 < props.list.length ? start + 1 : (props.list.length - 1 > 0 ? props.list.length - 1 : 0))
    }

    return (
        <div>
            <img src={props.list[start] ? props.list[start].url : imagenotfound} alt={props.list[start] ? props.list[start].name : ""} onDragStart={touchmove} className="mx-auto rounded-xl" style={{ width: "300px" }} />

            {props.list.length > 1 &&
                <div className="w-full flex items-center justify-center mt-2">
                    <img src={left} alt="" className="mx-2 cursor-pointer" onClick={beforeIndex} />
                    {Array(props.list.length).fill(0).map((item, index) => (
                        <img key={index} alt={index} src={start === index ? dotrounded : dot} className="mx-2 cursor-pointer" />
                    ))}
                    <img src={right} alt="" className="mx-2 cursor-pointer" onClick={afterIndex} />
                </div>
            }

        </div>
    )
}

export default SlideShow;
