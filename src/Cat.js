import { useEffect, useState, useRef } from "react";
import LikeScreen from "./LikeScreen";
const likedImages = [];
//const [likedImagesState, setLikedImagesState] = useState([])

const Cat = (props) => {
  const img = useRef(null);
  let placeholderUrl =
    "https://billfish.org/wp-content/uploads/2019/08/placeholder-image.jpg";
  const [catUrl, setUrl] = useState(placeholderUrl);
  const [isLiked, setIsLiked] = useState(props.liked);
  function getUrl() {
    const finalData = props.imgUrl;
    setUrl(finalData);
  }
  useEffect(() => {
    getUrl();

    const observer = new IntersectionObserver(
      (entry) => {
        const isIntersecting = entry[0].isIntersecting;
        if (isIntersecting) {
          entry[0].target.style.opacity = "1";
          observer.unobserve(img.current);
        } else {
          entry[0].target.style.opacity = "0";
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(img.current);
  }, []);

  function handleLiked() {
    if (isLiked) {
      setIsLiked(false);
      let indexToRemove = likedImages.indexOf(props.imgUrl);
      likedImages.splice(indexToRemove, 1);
    } else if (!isLiked) {
      setIsLiked(true);
      likedImages.push(props.imgUrl);
    }
    props.getData(likedImages.filter((url) => url !== placeholderUrl));
    console.log("Liked Imagesvdjvspjfjrowo", likedImages);
  }
  return (
    <div className={props.containerClass}>
      <img src={catUrl} alt="img" className="img" ref={img} />
      <div className="rate">
        <img
          src={
            !isLiked
              ? "https://i.ibb.co/MMBpKMV/heart-2.png"
              : "https://i.ibb.co/BV2CwZK/heart-1.png"
          }
          alt="heart-2"
          border="0"
          className="heart-icon"
          onClick={() => handleLiked()}
        />
      </div>
    </div>
  );
};

export default Cat;
