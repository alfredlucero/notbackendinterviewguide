import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const htmlCode = `<main class="main-container">
  <div id="carousel" class="carousel-container">
    <div id="carousel-prev-button" class="carousel-prev-button"></div>
    <div id="carousel-images" class="carousel-images">

    </div>
    <div id="carousel-next-button" class="carousel-next-button"></div>
  </div>
</main>`;

const cssCode = `.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
}

.carousel-container {
  position: relative;
  width: 600px;
  height: 600px;
}

.carousel-image {
  width: 100%;
  height: 100%;
}

.carousel-images {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Form prev button as a left arrow */
.carousel-prev-button {
  position: absolute;
  top: 50%;
  left: 5%;
  cursor: pointer;
  border-left: 0;
  border-bottom: 25px solid transparent;
  border-top: 25px solid transparent;
  border-right: 25px solid gray;
  z-index: 10;
}

/* Form next button as a right arrow */
.carousel-next-button {
  position: absolute;
  top: 50%;
  right: 5%;
  cursor: pointer;
  border-left: 0;
  border-bottom: 25px solid transparent;
  border-top: 25px solid transparent;
  border-left: 25px solid gray;
  z-index: 10;
}`;

const jsCode = `/*
  High-level Approach:
  1. Fetch image data from endpoint
  2. Parse out and adapt the data to store the image URLs
  3. Build the image carousel to load up the current image and keep track of the current image
  4. Add buttons to the left and to the right for previous and next (style them later as arrows and overlay) - assume going next for the last image loops back around to the first image
  5. Have the image carousel automatically move to the next image after every 3 seconds; reset the timer whenever we go next/previous as well
  6. Bonus: Add dots below the carousel to show which image you are currently on; add animations/transitions; fix initial loading/error states
*/

(async function fetchImages() {
try {
  // 1. Fetch images
  const response = await fetch(
    "https://www.reddit.com/r/aww/top/.json?t=all"
  );
  if (response.ok) {
    const data = await response.json();
    console.log("Data", data);
    // 2. Parse out and adapt data to store image URLs
    const images = getImagesFromData(data);
    console.log("Images", images);
    let currentImageIndex = 1;

    const goToNextImage = () => {
      if (currentImageIndex === images.length - 1) {
        currentImageIndex = 0;
      } else {
        currentImageIndex += 1;
      }
      showCurrentImage(currentImageIndex, images);
    };

    // 5. Automatically move the carousel to the next image every 3 seconds; we need to make sure we clear and reset the interval whenever we click the next/prev buttons
    const intervalTimeout = 3000;
    let carouselInterval = setInterval(goToNextImage, intervalTimeout);

    // 3. Build the image carousel to load up the current image and keep track of the current image
    showCurrentImage(currentImageIndex, images);

    // 4. Add buttons for next/prev and add event listeners to them
    document.getElementById("carousel-next-button").addEventListener(
      "click",
      () => {
        carouselInterval = clearInterval(carouselInterval);
        goToNextImage();
        carouselInterval = setInterval(goToNextImage, intervalTimeout);
      },
      false
    );

    document
      .getElementById("carousel-prev-button")
      .addEventListener("click", () => {
        carouselInterval = clearInterval(carouselInterval);
        if (currentImageIndex === 0) {
          currentImageIndex = images.length - 1;
        } else {
          currentImageIndex -= 1;
        }
        showCurrentImage(currentImageIndex, images);
        carouselInterval = setInterval(goToNextImage, intervalTimeout);
      });
  }
} catch (e) {
  console.error("Failed to fetch images for some reason: ", e);
}
})();

const getImagesFromData = (data) => {
  const images = data.data.children.map(
    (childData) => childData.data.url_overridden_by_dest
  );
  return images;
};

const showCurrentImage = (currentImageIndex, images) => {
  const carousel = document.getElementById("carousel-images");
  const currentCarouselImage = document.createElement("img");
  currentCarouselImage.src = images[currentImageIndex];
  currentCarouselImage.classList.add("carousel-image");
  if (carousel.firstChild) {
    carousel.firstChild.remove();
  }
  carousel.appendChild(currentCarouselImage);
};`;

const ImageCarousel: NextPage = () => {
  return (
    <div>
      <p>Source: https://frontendeval.com/questions/image-carousel</p>
      <p>
        Create an image carousel that cycles through images fetched from an
        endpoint, {`https://www.reddit.com/r/aww/top/.json?t=all`}, (displaying
        a new image every 3 seconds), and allows the user to skip to the
        next/previous image.
      </p>
      <p>Code Pen Example: https://codepen.io/alfinity/pen/podYOPO</p>
      <Prism.Tabs>
        <Prism.Tab label="imageCarousel.js" language="javascript">
          {jsCode}
        </Prism.Tab>
        <Prism.Tab label="index.css" language="css">
          {cssCode}
        </Prism.Tab>
        <Prism.Tab label="index.html" language="markup">
          {htmlCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default ImageCarousel;
