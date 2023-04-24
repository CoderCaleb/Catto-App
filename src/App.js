import { useEffect, useState, useRef } from "react";
import "./App.css";
import Cat from "./Cat.js";
import LikeScreen from "./LikeScreen";
const length = 8;
const myArray = Array.from({ length: length });
const generateCat = async () => {
  const response = await fetch(
    "https://api.thecatapi.com/v1/images/search?size=small&limit=1&mime_types=jpg,png&width=200&height=200"
  ).catch((err) => console.log(err));
  const data = await response.json();
  return data[0].url;
};

const App = () => {
  const [likedImages, setLikedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [screen, setScreen] = useState(false);
  const [arrLength, setArrLength] = useState(0);
  const [hamburger, setHamburger] = useState(false);
  let liked = [];
  function getCat() {
    setArrLength(images.length);
    const arrExample = Array.from({ length: length }, generateCat);
    console.log(arrExample);
    Promise.all(arrExample).then((data) => setImages([...images, ...data]));
  }
  function passData(data) {
    liked = data.slice();
    setLikedImages(liked);
    console.log("App.jsLikedFunctionRan:", likedImages);
  }

  useEffect(() => {
    getCat();
  }, []);

  return (
    <>
      <div
        className={hamburger ? "hamburger is-active" : "hamburger"}
        onClick={() => setHamburger(hamburger ? false : true)}
      >
        <div className="bar"></div>
      </div>
      <div className={hamburger ? "mobile-nav" : "mobile-nav none"}>
        <a
          className={screen ? "title" : "title highlight"}
          onClick={() => setScreen(false)}
        >
          Catto Gallery
        </a>

        <a
          className={screen ? "title highlight" : "title"}
          onClick={() => setScreen(true)}
        >
          Liked Screen
        </a>
      </div>

      <LikeScreen
        data={likedImages}
        classProp={screen ? "container margin" : "container none"}
      />

      <div className={!screen ? "container" : "container none"}>
        <div className="container margin">
          {images.map((cat, index) => (
            <Cat
              imgUrl={
                cat
                  ? cat
                  : "https://billfish.org/wp-content/uploads/2019/08/placeholder-image.jpg"
              }
              key={index}
              id={index}
              getData={passData}
              liked={false}
              containerClass="image-container"
              isPlaceholder={false}
            />
          ))}
          {images.length === arrLength
            ? myArray.map((cat, index) => (
                <Cat
                  imgUrl="https://billfish.org/wp-content/uploads/2019/08/placeholder-image.jpg"
                  key={index}
                  getData={passData}
                  liked={false}
                  containerClass="image-container"
                  isPlaceholder={true}
                />
              ))
            : null}
        </div>
        <button onClick={getCat} className="loadButton">
          Load More
        </button>
      </div>
    </>
  );
};
export default App;
