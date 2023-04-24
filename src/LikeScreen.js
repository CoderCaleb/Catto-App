import React from "react";
import { useState, useEffect } from "react";
import Cat from "./Cat";
import nothingImage from './images/nothing-to-see-img.png'
const LikeScreen = ({ data, classProp }) => {
  console.log("Liked Hook: ", data);
  const [arr, setArr] = useState(data);
  useEffect(() => {
    setArr(data);
    console.log("arrrdfjjvojvjvj", arr);
  }, [data]);
  return (
    <>
      <div className={classProp}>
        {arr.length > 0 ? (
          arr.map((cat, index) => {
            return (
              <Cat
                imgUrl={cat}
                key={index}
                containerClass={"image-container-hide"}
              />
            );
          })
        ) : (
          <div className="container liked">
            <h1 className="title empty">Nothing to see here</h1>
            <img src={nothingImage} className='nothing-img'></img>
          </div>
        )}
      </div>
    </>
  );
};

export default LikeScreen;
