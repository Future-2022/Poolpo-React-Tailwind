import React, { useEffect, useState } from 'react'

import leftarrow from '../../img/left-arrow.png';
import rightarrow from '../../img/right-arrow.png';
import dot from '../../img/dot.png';
import dotrounded from '../../img/dot-rounded.png';
import left from '../../img/chevron-left.png';
import right from '../../img/chevron-right.png';
import imagenotfound from '../../img/image-notfound.png';


const MarkView = (props) => {

    const [start, setStart] = useState(0);
    const [peritem, setPerItem] = useState(6);

    useEffect(() => {

        updatePerItem();

        window.addEventListener("resize", updatePerItem);

    }, []);

    const updatePerItem = () => {

        var width = window.innerWidth;
        var item = 6;

        if (width >= 1440) { item = 6; }
        if (width >= 1280 && width < 1440) { item = 5; }
        if (width >= 1000 && width < 1280) { item = 4; }
        if (width >= 640 && width < 1000) { item = 3; }
        if (width >= 400 && width < 640) { item = 2; }
        if (width < 400) { item = 1; }

        setPerItem(item);

    }

    const beforeIndex = () => {
        setStart(start - 1 >= 0 ? start - 1 : 0)
    }
    const afterIndex = () => {
        setStart(start + peritem < props.data.length ? start + 1 : (props.data.length - peritem > 0 ? props.data.length - peritem : 0))
    }

    return (
        <>
            <div className="mt-10 bg-white w-full flex justify-around items-center rounded-2xl px-0 lg:px-12 py-4">
                <img src={leftarrow} alt="" className="hidden sm:block cursor-pointer" onClick={beforeIndex} />
                {
                    props.data.slice(start, start + peritem).map(item => (
                        <img key={item.id} src={!!item.image ? (!!item.image.formats.thumbnail ? item.image.formats.thumbnail.url : imagenotfound) : imagenotfound} className="" alt="logo" style={{ width: "100px" }} />
                        // <img key={item.id} src={imagenotfound} className="" alt="logo" style={{ width: "100px" }} />
                    ))
                }
                <img src={rightarrow} alt="" className="hidden sm:block cursor-pointer" onClick={afterIndex} />
            </div>
            <div className="block sm:hidden overflow-hidden">
                <div className="flex items-center justify-center mt-4">
                    <img src={left} alt="" className="w-10 mx-1 cursor-pointer" onClick={beforeIndex} />
                    {Array(props.data.length - peritem + 1 <= 0 ? 1 : props.data.length - peritem + 1).fill(0).map((item, index) => (
                        <img key={index} src={start === index ? dotrounded : dot} alt="" className="mx-1 cursor-pointer" style={{ maxWidth: "100px" }} />
                    ))}
                    <img src={right} alt="" className="w-10 mx-1 cursor-pointer" onClick={afterIndex} />
                </div>
            </div>
        </>
    )
}

export default MarkView;
