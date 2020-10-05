import React, { Component } from "react";
import style from "./Image.module.css";

export default class Image extends Component {
  render() {
    const image = this.props.image;

    return (
      <div className={style.image}>
        <img src={image.sizes.medium} />
        <div>{image.caption}</div>

        <div>{image.description}</div>
      </div>
    );
  }
}
