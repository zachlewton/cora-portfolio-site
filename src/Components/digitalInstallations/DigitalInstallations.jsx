import React, { Component } from "react";
import axios from "axios";
import Image from "../image/Image";

export default class DigitalInstallation extends Component {
  state = {
    project: {},
    isLoaded: false,
    images: [],
  };

  componentWillMount() {
    axios
      .get("wp-json/wp/v2/work?slug=digital-installations")
      .then((res) =>
        this.setState({
          project: res.data[0],
          isLoaded: true,
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    const { project, isLoaded } = this.state;
    if (isLoaded) {
      const images = project.acf.images;

      return (
        <div>
          {images.map((image) => (
            <Image key={image.id} image={image} />
          ))}
        </div>
      );
    }

    return null;
  }
}
