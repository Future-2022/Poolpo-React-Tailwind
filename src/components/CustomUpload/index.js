import React, { useState, useRef } from "react"

import upload from "../../img/upload.png"


const CustomUpload = (props) => {

  const ref = useRef(null)

  const [focus, setFocus] = useState(false)

  const [label, setLabel] = useState("")

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false)
  }

  const onChange = (e) => {
    let fileName = e.target.value.split("\\")[2]
    let idxDot = fileName.lastIndexOf(".") + 1
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase()
    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
      setLabel(e.target.value.split("\\")[2])
      props.onChange(e)
    } else {
      setLabel("")
    }
  }

  const openFileUpload = () => {
    ref.current.click()
  }

  return (
    <div
      className="w-full relative h-56 sm:z-5 cursor-pointer"
      onClick={openFileUpload}
    >
      <img
        src={upload}
        alt=""
        className="absolute top-3 right-4 z-10 cursor-pointer"
      />
      <div className="w-full relative z-0">
        <div
          className={`bg-white rounded-2xl px-5 py-2 relative z-0 ${focus ? `border border-purple` : `border-none`
            }`}
        >
          <input
            type="text"
            className="w-full py-2 outline-none font-OpenSansRegular text-gray1 text-lg z-0 cursor-pointer"
            value={label}
            placeholder={props.name}
            formNoValidate="formNoValidate"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly
          />
        </div>
        <input
          type="file"
          className="hidden"
          ref={ref}
          accept="image/*"
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default CustomUpload
