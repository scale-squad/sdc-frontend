import React, {useEffect, useState} from 'react';

const AddToCart = ({currentProductStyle}) => {
  if(currentProductStyle===undefined || currentProductStyle.skus === undefined){
    return <div>Error loading styles for cart</div>
  }

  const [selectedSize, setSelectedSize] = useState();
  const [selectedQty, setSelectedQty] = useState();
  const [availableSkus, setAvailableSkus] = useState([]);
  const [selectedSku, setSelectedSku] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [maxItems, setMaxItems] = useState();

  useEffect(() =>{
    if(currentProductStyle !== undefined && currentProductStyle.skus !== undefined) {
      let skusObj = currentProductStyle.skus;
      let skusKeys = Object.keys(skusObj);
      const allSkus = skusKeys.filter(sku => skusObj[sku].quantity > 0);


      setAvailableSkus(allSkus);
      setIsDisabled(allSkus.length===0);
      document.getElementById("size-select").size = 0;

      //if no sizes available, the dropdown becomes inactive and read 'out of stock'
    }else{
      setAvailableSkus([]);
      setIsDisabled(true);
    }

    document.getElementById("message").hidden = true;
  }, [currentProductStyle])

  useEffect(()=>{
    calcMax();
    if(selectedSku) {
      setSelectedQty("1");
    }else{
      setSelectedQty("");
    }
  }, [selectedSku])


  const handleSizeSelected = (val) =>{
    document.getElementById("message").hidden = true;
    setSelectedSize(1);
  }

  const calcMax = () =>{
    if(selectedSku) {
      if(currentProductStyle.skus[selectedSku]?.quantity < 15) {
        setMaxItems(currentProductStyle.skus[selectedSku].quantity);
      }else{
        setMaxItems(15);
      }
    }
  }

  const handleCartClicked = () =>{
    if(selectedSku && selectedQty) {
      document.getElementById("message").hidden = true;
      document.getElementById("size-select").size = 0;


      //call add to cart POST method!!


    }else if(!selectedSku){
      document.getElementById("message").hidden = false;
      document.getElementById("size-select").size = availableSkus.length;
    }
  }

  return (

    <div>

      <div id="message">Select Size!!</div>

      <select id="size-select" onChange={(e)=>setSelectedSku(e.target.value)} disabled={isDisabled}>
        <option value="">{isDisabled ? "OUT OF STOCK" : "SELECT SIZE"}</option>
        {availableSkus.map((sku)=>(
        <option key={sku} value={sku}>{currentProductStyle.skus[sku]?.size}</option>
        ))}
      </select>


      <div className="addToCart">
        <div className="topRow">
          <select id="quantity-select" disabled={!selectedSku} onChange={(e)=> setSelectedQty(e.target.value)}>
            {!selectedSku ? (
              <option>--</option>
            ) : (
              Array.from({ length: maxItems }, (_, index) => (
                <option key={index + 1} value={index + 1}>{index + 1}</option>
              ))
            )}
          </select>
        </div>
      </div>

      <div className="bottom-row">
        <button type="button" id="addToCartBtn" hidden={!availableSkus} onClick={handleCartClicked}>ADD TO BAG</button>

        <button id="starHeartBtn" type="button" >⭐️</button>
      </div>
    </div>
  )
}

export default AddToCart;