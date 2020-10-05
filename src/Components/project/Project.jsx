import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Image from "../image/Image";
import style from "./Project.module.css";

// export default class Project extends Component {
//   state = {
//     project: {},
//     isLoaded: false,
//     images: [],
//   };

//   componentMount() {
//     axios
//       .get(`/wp-json/wp/v2/project?slug=${this.props.match.params.slug}`)
//       .then((res) =>
//         this.setState({
//           project: res.data[0],
//           isLoaded: true,
//         })
//       )
//       .catch((err) => console.log(err));
//   }

//   render() {
//     const { project, isLoaded } = this.state;
//     if (isLoaded) {
//       const images = project.acf.images;

//       return (
// <div className={style.projectContainer}>
//   {images.map((image) => (
//     <Image key={image.id} image={image} />
//   ))}
// </div>
//       );
//     }

//     return null;
//   }
// }

const Project = (props) => {
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [images, setImages] = useState([]);

  const slug = props.match.params.slug;

  useEffect(() => {
    axios
      .get(`/wp-json/wp/v2/project?slug=${slug}`)
      .then(
        (res) => (
          console.log(res.data[0]),
          setProjectDescription(res.data[0].content.rendered),
          setProjectTitle(res.data[0].title.rendered),
          setImages(res.data[0].acf.images)
        )
      );
  }, [slug]);

  return (
    <div className={style.projectContainer}>
      <div>{projectTitle}</div>
      <div dangerouslySetInnerHTML={{ __html: projectDescription }} />
      {images.map((image) => (
        <Image key={image.id} image={image} />
      ))}
    </div>
  );
};

export default Project;
