import React, { Component } from "react";
import "./index.css";

export class Radio extends Component {
  state = {};

  render() {
    const { selected, onChange, text, value, marginType } = this.props;
    return (
      <div
        className={`${marginType === 2 && "mt-0"} modern-radio-container`}
        onClick={() => {
          onChange(value);
        }}
      >
        <div
          className={`radio-outer-circle ${value !== selected && "unselected"}`}
        >
          <div
            className={`radio-inner-circle ${value !== selected &&
              "unselected-circle"}`}
          />
        </div>
        <div className="helper-text">{text}</div>
      </div>
    );
  }
}