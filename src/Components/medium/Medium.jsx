import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Image from "../image/Image";

const Medium = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [images, setImages] = useState([]);
  const [medium, setMedium] = useState({});

  const slug = props.match.params.slug;

  useEffect(() => {
    axios
      .get(`/wp-json/wp/v2/work?slug=${slug}`)
      .then((res) => setImages(res.data[0].acf.images))
      .then(setLoaded(true));

    axios
      .get(`/wp-json/wp/v2/work?slug=${slug}`)
      .then((res) => setMedium(res.data[0]))

      .catch((err) => console.log(err));
  }, [slug]);

  if (loaded) {
    console.log(medium);
    return (
      <div>
        {images.map((image) => (
          <Image key={image.id} image={image} />
        ))}
        hi
      </div>
    );
  }

  return null;
};

export default Medium;
