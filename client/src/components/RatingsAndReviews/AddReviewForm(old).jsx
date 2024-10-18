
import React from 'react';
const AddReviewForm = ({ productId }) => {
  if (productId === undefined) { return <div>Error loading component</div> }
  /*"characteristics": {
      "Fit": {
          "id": 220230,
          "value": "3.2561576354679803"
      },
      "Length": {
          "id": 220231,
          "value": "3.4285714285714286"
      },
      "Comfort": {
          "id": 220232,//16 in api
          "value": "3.6256157635467980"
      },
      "Quality": {
          "id": 220233,
          "value": "3.5418719211822660"
      }
  }*/
  return (
    <div class="add-review-form">
      <form>
        <div class="Add-Review-Form">
          <p>Write Your Review</p>
          <div class="form-group">
            <p>
              <span>About the {productId}</span>
            </p>
          </div>
          <div class="form-group">
            <span>Do you recommend this product?</span>
            <div class="radio-group">
              <input name="recommend-yes" id="recommend-yes" required="required" value="true" type="radio" checked="checked" />
              <label for="recommend-yes">Yes</label>
            </div>
            <div class="radio-group">
              <input name="recommend-no" id="recommend-no" required="required" value="false" type="radio" />
              <label for="recommend-no">No</label>
            </div>
          </div>
          <div class="form-group" >
            <label for="Size">Size*</label>
            <div class="radio-group">

              <input name="Size" id="Size-0" required="required" value="1" type="radio" />
              <label for="Size-0">A size too small1</label>

              <input name="Size" id="Size-1" required="required" value="2" type="radio" checked="checked" />
              <label for="Size-1">½ a size too small</label>

              <input name="Size" id="Size-2" required="required" value="3" type="radio" />
              <label for="Size-2">Perfect</label>

              <input name="Size" id="Size-3" required="required" value="4" type="radio" />
              <label for="Size-3">½ a size too big</label>

              <input name="Size" id="Size-4" required="required" value="5" type="radio" />
              <label for="Size-4">A size too wide</label>
            </div>
          </div>
          <div class="form-group">
            <label for="width" class="formbuilder-radio-group-label">Width*</label>

              <input name="width" id="width-0" required="required" value="1" type="radio" />
              <label for="width-0">Too narrow</label>


              <input name="width" id="width-1" required="required" value="2" type="radio" />
              <label for="width-1">Slightly narrow</label>


              <input name="width" id="width-2" required="required" value="3" type="radio" />
              <label for="width-2">Perfect</label>


              <input name="width" id="width-3" required="required" value="4" type="radio" />
              <label for="width-3">Slightly wide</label>


              <input name="width" id="width-4" required="required" value="5" type="radio" />
              <label for="width-4">Too wide</label>

          </div>
          <div class="form-group">
            <label for="Comfort" >Comfort*</label>
            <div class="radio-group">

                <input name="Comfort" id="Comfort-0" required="required" value="1" type="radio" />
                <label for="Comfort-0">Uncomfortable</label>


                <input name="Comfort" id="Comfort-1" required="required" value="2" type="radio" />
                <label for="Comfort-1">Slightly uncomfortable</label>


                <input name="Comfort" id="Comfort-2" required="required" value="3" type="radio" />
                <label for="Comfort-2">Ok</label>


                <input name="Comfort" id="Comfort-3" required="required" value="4" type="radio" />
                <label for="Comfort-3">Comfortable</label>


                <input name="Comfort" id="Comfort-4" required="required" value="5" type="radio" />
                <label for="Comfort-4">Perfect</label>

            </div>
          </div >
          <div class="form-group">
            <label for="Quality">Quality*</label>
            <div class="radio-group">

                <input name="Quality" id="Quality-0" required="required" value="1" type="radio" />
                <label for="Quality-0">Poor</label>


                <input name="Quality" id="Quality-1" required="required" value="2" type="radio" />
                <label for="Quality-1">Below average</label>


                <input name="Quality" id="Quality-2" required="required" value="3" type="radio" />
                <label for="Quality-2">What I expected</label>


                <input name="Quality" id="Quality-3" required="required" value="4" type="radio" />
                <label for="Quality-3">Pretty great</label>


                <input name="Quality" id="Quality-4" required="required" value="5" type="radio" />
                <label for="Quality-4">Perfect</label>

            </div>
          </div>
          <div class="form-group">
            <label for="Length" >Length*</label>
            <div class="radio-group">

                <input name="Length" id="Length-0" required="required" value="1" type="radio" />
                <label for="Length-0">Runs Short</label>


                <input name="Length" id="Length-1" required="required" value="2" type="radio" />
                <label for="Length-1">Runs slightly short</label>


                <input name="Length" id="Length-2" required="required" value="3" type="radio" />
                <label for="Length-2">Perfect</label>


                <input name="Length" id="Length-3" required="required" value="4" type="radio" />
                <label for="Length-3">Runs slightly long</label>


                <input name="Length" id="Length-4" required="required" value="5" type="radio" />
                <label for="Length-4">Runs long</label>

            </div>
          </div>
          <div class="form-group">
            <div>
              <label for="Fit">Fit*</label>
              <div class="radio-group">

                  <input name="Fit" id="Fit-0" required="required" value="1" type="radio" />
                  <label for="Fit-0">Runs tight</label>


                  <input name="Fit" id="Fit-1" required="required" value="2" type="radio" />
                  <label for="Fit-1">Runs slightly tight</label>


                  <input name="Fit" id="Fit-2" required="required" value="3" type="radio" />
                  <label for="Fit-2">Perfect</label>


                  <input name="Fit" id="Fit-3" required="required" value="4" type="radio" />
                  <label for="Fit-3">Runs slightly long</label>


                  <input name="Fit" id="Fit-4" required="required" value="5" type="radio" />
                  <label for="Fit-4">Runs long</label>

              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="summary" >Review summary*</label>
            <input type="text" placeholder="Example: Best purchase ever!" name="summary" maxlength="60" id="summary" required="required" />
          </div>
          <div class="form-group" >
            <label for='body'>Your Review *</label>
            <textarea type="textarea" placeholder="Why did you like the product or not?" name='body' maxlength="1000" id='body' required="required"></textarea>
          </div>

          <div class="form-group" >
            <label for="name" >What is your nickname? *</label>
            <input type="text" class="form-control" name="name" maxlength="60" id="name" required="required" />
          </div>
          <div class="form-group">
            <label for="email">Email *</label>
            <input type="text" class="form-control" name="email" maxlength="50" id="email" required="required" />
          </div>
          <div class="form-group">
            <p>For authentication reasons, you will not be emailed”
            </p>
          </div>
        </div>
        <button type="submit">Submit your review!</button>
      </form>
    </div>
  )
};

export default AddReviewForm;