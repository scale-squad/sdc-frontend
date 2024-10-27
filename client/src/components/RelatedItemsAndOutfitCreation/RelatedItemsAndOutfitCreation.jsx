import React, { useState, useEffect } from "react";
import AddOutfitCard from "./AddOutfitCard.jsx";
import axios from "axios";
import Card from "./Card.jsx";

const RelatedItemsAndOutfitCreation = ({ productId, setProductId }) => {
  let [relatedList, setRelatedList] = useState([]);
  let [currentProduct, setCurrentProduct] = useState({});
  const [outfitList, setOutfitList] = useState(
    JSON.parse(localStorage.getItem("fecOutfitList")) || []
  );
  const [relatedPage, setRelatedPage] = useState(0);
  const [outfitPage, setOutfitPage] = useState(0);
  const itemCount = 4;
  const arrow = "./icons/right-arrow3.png";
  const DummyImg = "./icons/No_Image_Available.jpg";

  const changePage = (increment, cardType) => {
    let page = null;
    if (cardType === "related") {
      page =
        (relatedPage + increment + relatedList.length) % relatedList.length;
      setRelatedPage(page);
    } else if (cardType === "outfit") {
      page = (outfitPage + increment + outfitList.length) % outfitList.length;
      setOutfitPage(page);
    } else {
      return console.warn("invalid card related/outfit type: " + cardType);
    }
  };

  const getCurrentProductInfo = () => {
    let productInfo = {};
    const query = { params: { product_id: productId } };
    Promise.all([
      axios.get(`/products/${productId}/styles`).then((res) => res.data),
      axios.get(`/reviews/meta`, query).then((res) => res.data),
      axios.get(`/products/${productId}`).then((res) => res.data),
    ])
      .then((res) => {
        const { product_id } = res[0];
        const defaultStyle =
          res[0].results.find((x) => x["default?"]) || res[0].results[0];
        const { original_price, sale_price, skus } = defaultStyle;
        const thumbnail_url = defaultStyle.photos[0].thumbnail_url;
        productInfo = {
          product_id,
          original_price,
          sale_price,
          skus,
          thumbnail_url,
        };
        const { ratings, characteristics, recommended } = res[1];
        const entries = Object.entries(ratings);
        const [total, count] = entries.reduce(
          ([sumTotal, sumCount], [k, v]) => [
            sumTotal + Number(k) * Number(v),
            sumCount + Number(v),
          ],
          [0, 0]
        );
        const avgRating = total / count;
        const { id, name, category, description, features, slogan } = res[2];
        productInfo = {
          ...productInfo,
          id,
          name,
          category,
          features,
          characteristics,
          recommended,
          slogan,
          avgRating,
        };
        return productInfo;
      })
      .then((item) => setCurrentProduct(item))
      .catch((err) => console.log(err));
  };

  const getRelatedItemsList = () => {
    const newRelatedList = [];
    axios
      .get(`/products/${productId}/related`)
      .then((res) => {
        const products = res.data;
        return Promise.all([
          ...products.map((product) =>
            axios.get(`/products/${product}/styles`).then((res) => res.data)
          ),

          ...products.map((product) => {
            const query = { params: { product_id: product } };
            return axios.get(`/reviews/meta`, query).then((res) => res.data);
          }),

          ...products.map((product) =>
            axios.get(`/products/${product}`).then((res) => res.data)
          ),
        ]);
      })
      .then((res) => {
        for (let i = 0; i < res.length / 3; i++) {
          const { product_id } = res[i];
          const defaultStyle =
            res[i].results.find((x) => x["default?"]) || res[i].results[0];
          const { original_price, sale_price, skus } = defaultStyle;
          const thumbnail_url = defaultStyle.photos[0].thumbnail_url;
          newRelatedList[i] = {
            product_id,
            original_price,
            sale_price,
            skus,
            thumbnail_url,
          };
        }

        for (let i = res.length / 3; i < (2 / 3) * res.length; i++) {
          const { ratings, characteristics, recommended } = res[i];
          const entries = Object.entries(ratings);
          const [total, count] = entries.reduce(
            ([sumTotal, sumCount], [k, v]) => [
              sumTotal + Number(k) * Number(v),
              sumCount + Number(v),
            ],
            [0, 0]
          );
          const avgRating = total / count;
          newRelatedList[i % (res.length / 3)]["avgRating"] = avgRating;
          if (characteristics) {
            newRelatedList[i % (res.length / 3)]["characteristics"] =
              characteristics;
          }
          newRelatedList[i % (res.length / 3)]["recommended"] = recommended;
        }

        for (let i = (2 / 3) * res.length; i < res.length; i++) {
          const { id, name, category, description, features, slogan } = res[i];
          const currItem = newRelatedList[i % (res.length / 3)];
          newRelatedList[i % (res.length / 3)] = {
            ...currItem,
            id,
            name,
            category,
            features,
            slogan,
          };
        }
        return newRelatedList;
      })
      .then((list) => setRelatedList(list))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCurrentProductInfo();
    getRelatedItemsList();
  }, [productId]);

  return (
    <div className="related-products">
    <h3>Related Products</h3>

    <div className="related-carousel">
      <div
        className="scroll-button-left"
        onClick={() => changePage(-1, "related")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="90"
          height="90"
          className="scroll-button-cii"
        >
          <circle cx="12" cy="12" r="10" fill="#ccc" />
          <path d="M14 7l-5 5 5 5V7z" fill="black" />
        </svg>
      </div>
      <div className="related-gallery">
        {relatedList.length >= itemCount ? (
          [...relatedList, ...relatedList]
            .slice(relatedPage, relatedPage + itemCount)
            .map((item, i) => (
              <Card
                key={item.product_id * i}
                item={item}
                type="related"
                setProductId={setProductId}
                currentProduct={currentProduct}
              />
            ))
        ) : relatedList.length >= 1 ? (
          relatedList.map((item, i) => (
            <Card
              key={item.product_id * i}
              item={item}
              type="related"
              setProductId={setProductId}
            />
          ))
        ) : (
          <div>No Related Items Available</div>
        )}
      </div>
      <div
        className="scroll-button-right"
        onClick={() => changePage(1, "related")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="90"
          height="90"
          className="scroll-button-cir"
        >
          <circle cx="12" cy="12" r="10" fill="#ccc" />
          <path d="M10 17l5-5-5-5v10z" fill="black" />
        </svg>
      </div>
    </div>
    <h3>Your Outfit</h3>
    <div className="outfit-carousel">
      {outfitList.length >= itemCount - 1 ? (
        <div
          className="scroll-button-left"
          onClick={() => changePage(-1, "outfit")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="90"
            height="90"
            className="scroll-button-cii"
          >
            <circle cx="12" cy="12" r="10" fill="#ccc" />
            <path d="M14 7l-5 5 5 5V7z" fill="black" />
          </svg>
        </div>
      ) : (
        <div></div>
      )}
      <div className="outfit-gallery">
        <AddOutfitCard
          productId={productId}
          setOutfitList={setOutfitList}
          outfitList={outfitList}
        />
        {outfitList.length >= Math.max(itemCount - 1, 0) ? (
          [...outfitList, ...outfitList]
            .slice(outfitPage, outfitPage + itemCount - 1)
            .map((item, i) => (
              <Card
                key={"outfit" + item.product_id * i}
                item={item}
                type="outfit"
                setProductId={setProductId}
                setOutfitList={setOutfitList}
              />
            ))
        ) : outfitList.length >= 1 ? (
          outfitList.map((item, i) => (
            <Card
              key={"outfit" + item.product_id * i}
              item={item}
              type="outfit"
              setProductId={setProductId}
              setOutfitList={setOutfitList}
            />
          ))
        ) : (
          <div>
            <img src={DummyImg} className="dummyImg" alt="Dummy" />
          </div>
        )}
      </div>
      {outfitList.length >= itemCount - 1 ? (
        <div
          className="scroll-button-right"
          onClick={() => changePage(1, "outfit")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="90"
            height="90"
            className="scroll-button-cir"
          >
            <circle cx="12" cy="12" r="10" fill="#ccc" />
            <path d="M10 17l5-5-5-5v10z" fill="black" />
          </svg>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  </div>
  );
};

export default RelatedItemsAndOutfitCreation;
