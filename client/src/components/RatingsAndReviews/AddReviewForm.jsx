
import React from 'react';
const AddReviewForm = ({ productId }) => {
  if (productId === undefined) { return <div>Error loading component</div> }
  /*


        <div class="formbuilder-radio-group form-group field-radio-group-1729005502669">
          <label for="radio-group-1729005502669" class="formbuilder-radio-group-label"><span id="docs-internal-guid-3408c21a-7fff-7b7e-cdfc-39f768367e6e"><span style="font-size: 11pt; font-family: Arial, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; vertical-align: baseline; white-space-collapse: preserve;">Comfort</span></span><span class="formbuilder-required">*</span></label>
          <div class="radio-group">
            <div class="formbuilder-radio">
              <input name="radio-group-1729005502669" access="false" id="radio-group-1729005502669-0" required="required" aria-required="true" value="1" type="radio">
                <label for="radio-group-1729005502669-0">Uncomfortable</label>
            </div>
            <div class="formbuilder-radio">
              <input name="radio-group-1729005502669" access="false" id="radio-group-1729005502669-1" required="required" aria-required="true" value="2" type="radio">
                <label for="radio-group-1729005502669-1">Slightly uncomfortable</label>
            </div>
            <div class="formbuilder-radio">
              <input name="radio-group-1729005502669" access="false" id="radio-group-1729005502669-2" required="required" aria-required="true" value="3" type="radio">
                <label for="radio-group-1729005502669-2">Ok</label>
            </div>
            <div class="formbuilder-radio">
              <input name="radio-group-1729005502669" access="false" id="radio-group-1729005502669-3" required="required" aria-required="true" value="4" type="radio">
                <label for="radio-group-1729005502669-3">Comfortable</label>
            </div>
            <div class="formbuilder-radio">
              <input name="radio-group-1729005502669" access="false" id="radio-group-1729005502669-4" required="required" aria-required="true" value="5" type="radio">
                <label for="radio-group-1729005502669-4">Perfect</label>
            </div>
          </div>
        </div>
        <div class="formbuilder-radio-group form-group field-radio-group-1729005594509">
          <label for="radio-group-1729005594509" class="formbuilder-radio-group-label"><span id="docs-internal-guid-e888f08d-7fff-b861-b022-486f6edcd60c"><span style="font-size: 11pt; font-family: Arial, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; vertical-align: baseline; white-space-collapse: preserve;">Quality</span></span><span class="formbuilder-required">*</span></label>
          <div class="radio-group">
            <div class="formbuilder-radio">
              <input name="radio-group-1729005594509" access="false" id="radio-group-1729005594509-0" required="required" aria-required="true" value="1" type="radio">
                <label for="radio-group-1729005594509-0">Poor</label>
            </div>
            <div class="formbuilder-radio">
              <input name="radio-group-1729005594509" access="false" id="radio-group-1729005594509-1" required="required" aria-required="true" value="2" type="radio">
                <label for="radio-group-1729005594509-1">Below average</label>
            </div>
            <div class="formbuilder-radio">
              <input name="radio-group-1729005594509" access="false" id="radio-group-1729005594509-2" required="required" aria-required="true" value="3" type="radio">
                <label for="radio-group-1729005594509-2">What I expected</label>
            </div>
            <div class="formbuilder-radio">
              <input name="radio-group-1729005594509" access="false" id="radio-group-1729005594509-3" required="required" aria-required="true" value="4" type="radio">
                <label for="radio-group-1729005594509-3">Pretty great</label>
            </div>
            <div class="formbuilder-radio">
              <input name="radio-group-1729005594509" access="false" id="radio-group-1729005594509-4" required="required" aria-required="true" value="5" type="radio">
                <label for="radio-group-1729005594509-4">Perfect</label>
            </div>
          </div>
        </div>
        <div class="formbuilder-radio-group form-group field-Length">
          <label for="Length" class="formbuilder-radio-group-label"><span id="docs-internal-guid-c8557775-7fff-a311-e479-7c275f49ae7e"><span style="font-size: 11pt; font-family: Arial, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; vertical-align: baseline; white-space-collapse: preserve;">Length</span></span><span class="formbuilder-required">*</span></label>
          <div class="radio-group">
            <div class="formbuilder-radio">
              <input name="Length" access="false" id="Length-0" required="required" aria-required="true" value="1" type="radio">
                <label for="Length-0">Runs Short</label>
            </div>
            <div class="formbuilder-radio">
              <input name="Length" access="false" id="Length-1" required="required" aria-required="true" value="2" type="radio">
                <label for="Length-1">Runs slightly short</label>
            </div>
            <div class="formbuilder-radio">
              <input name="Length" access="false" id="Length-2" required="required" aria-required="true" value="3" type="radio">
                <label for="Length-2">Perfect</label>
            </div>
            <div class="formbuilder-radio">
              <input name="Length" access="false" id="Length-3" required="required" aria-required="true" value="4" type="radio">
                <label for="Length-3">Runs slightly long</label>
            </div>
            <div class="formbuilder-radio">
              <input name="Length" access="false" id="Length-4" required="required" aria-required="true" value="5" type="radio">
                <label for="Length-4">Runs long</label>
            </div>
          </div>
        </div>
        <div class="formbuilder-radio-group form-group field-radio-group-1729005859644">
          <label for="radio-group-1729005859644" class="formbuilder-radio-group-label"><span id="docs-internal-guid-2630857e-7fff-b36a-5bdb-d0c3cba46d16"><span style="font-size: 11pt; font-family: Arial, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; vertical-align: baseline; white-space-collapse: preserve;">Fit</span></span><span class="formbuilder-required">*</span></label>
          <div class="radio-group">
            <div class="formbuilder-radio">
              <input name="radio-group-1729005859644" access="false" id="radio-group-1729005859644-0" required="required" aria-required="true" value="1" type="radio">
                <label for="radio-group-1729005859644-0">Runs tight</label>
            </div>
            <div class="formbuilder-radio">
              <input name="radio-group-1729005859644" access="false" id="radio-group-1729005859644-1" required="required" aria-required="true" value="2" type="radio">
                <label for="radio-group-1729005859644-1">Runs slightly tight</label>
            </div>
            <div class="formbuilder-radio">
              <input name="radio-group-1729005859644" access="false" id="radio-group-1729005859644-2" required="required" aria-required="true" value="3" type="radio">
                <label for="radio-group-1729005859644-2">Perfect</label>
            </div>
            <div class="formbuilder-radio">
              <input name="radio-group-1729005859644" access="false" id="radio-group-1729005859644-3" required="required" aria-required="true" value="4" type="radio">
                <label for="radio-group-1729005859644-3">Runs slightly long</label>
            </div>
            <div class="formbuilder-radio">
              <input name="radio-group-1729005859644" access="false" id="radio-group-1729005859644-4" required="required" aria-required="true" value="5" type="radio">
                <label for="radio-group-1729005859644-4">Runs long</label>
            </div>
          </div>
        </div>
        <div class="formbuilder-text form-group field--Review-summary">
          <label for="-Review-summary" class="formbuilder-text-label"><span id="docs-internal-guid-4bbd8ec0-7fff-47f0-7fd8-ac7c41c8c9c0"><span style="font-size: 10pt; font-family: Arial, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; vertical-align: baseline; white-space-collapse: preserve;">&nbsp;Review summary</span></span><span class="formbuilder-required">*</span></label>
          <input type="text" placeholder="Example: Best purchase ever!" class="form-control" name="-Review-summary" access="false" maxlength="60" id="-Review-summary" required="required" aria-required="true">
        </div>
        <div class="formbuilder-textarea form-group field-Review-body">
          <label for="Review-body" class="formbuilder-textarea-label"><span id="docs-internal-guid-e3e4afd0-7fff-3999-671e-1b9c178cee48"><span style="font-size: 10pt; font-family: Arial, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; vertical-align: baseline; white-space-collapse: preserve;">Your Review </span></span><span class="formbuilder-required">*</span></label>
          <textarea type="textarea" placeholder="Why did you like the product or not?" name="Review-body" access="false" maxlength="1000" id="Review-body" required="required" aria-required="true"></textarea>
        </div>
        <div class="formbuilder-text form-group field-text-1729006263065">
          <label for="text-1729006263065" class="formbuilder-text-label">Text Field</label>
          <input type="text" class="form-control" name="text-1729006263065" access="false" value="Upload photos [WIP]" id="text-1729006263065">
        </div>
        <div class="formbuilder-file form-group field-file-1729006445657">
          <label for="file-1729006445657" class="formbuilder-file-label">File Upload</label>
          <input type="file" class="form-control" name="file-1729006445657" access="false" multiple="false" id="file-1729006445657">
        </div>
        <div class="formbuilder-text form-group field-nickname">
          <label for="nickname" class="formbuilder-text-label"><span id="docs-internal-guid-69679432-7fff-56f9-198f-44eba635a55b"><span style="font-size: 10pt; font-family: Arial, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; vertical-align: baseline; white-space-collapse: preserve;">What is your nickname </span></span><span class="formbuilder-required">*</span></label>
          <input type="text" class="form-control" name="nickname" access="false" maxlength="60" id="nickname" required="required" aria-required="true">
        </div>
        <div class="formbuilder-text form-group field-email">
          <label for="email" class="formbuilder-text-label">Email<span class="formbuilder-required">*</span></label>
          <input type="text" class="form-control" name="email" access="false" maxlength="50" id="email" required="required" aria-required="true">
        </div>
        <div class="">
          <p access="false" id="control-9602978"><span id="docs-internal-guid-2ed5e1a7-7fff-ecd8-4548-387b4b94537e"><span style="font-size: 11pt; font-family: Arial, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; vertical-align: baseline; white-space-collapse: preserve;">For authentication reasons, you will not be emailed”</span></span>
          </p>
        </div>
        <div class="formbuilder-text form-group field-text-1729006382241">
          <label for="text-1729006382241" class="formbuilder-text-label">Text Field</label>
          <input type="text" class="form-control" name="text-1729006382241" access="false" id="text-1729006382241">
        </div>
      </div>*/
  return (
    <div>
      <div class="Add-Review-Form">
        <p>Write Your Review</p>
        <div class="">
          <p>
            <span>About the {productId}</span>
          </p>
        </div>
        <div>
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
      </div>
      <div >
        <label for="Size">Size*</label>
        <div class="radio-group">
          <div class="formbuilder-radio">
            <input name="Size" id="Size-0" required="required" value="1" type="radio" />
            <label for="Size-0">A size too small1</label>
          </div>
          <div class="formbuilder-radio">
            <input name="Size" id="Size-1" required="required" value="2" type="radio" checked="checked" />
            <label for="Size-1">½ a size too small</label>
          </div>
          <div class="formbuilder-radio">
            <input name="Size" id="Size-2" required="required" value="3" type="radio" />
            <label for="Size-2">Perfect</label>
          </div>
          <div class="formbuilder-radio">
            <input name="Size" id="Size-3" required="required" value="4" type="radio" />
            <label for="Size-3">½ a size too big</label>
          </div>
          <div class="formbuilder-radio">
            <input name="Size" id="Size-4" required="required" value="5" type="radio" />
            <label for="Size-4">A size too wide</label>
          </div>
        </div>
        <label for="width" class="formbuilder-radio-group-label">Width*</label>
        <div class="formbuilder-radio">
          <input name="width" id="width-0" required="required" value="1" type="radio" />
          <label for="width-0">Too narrow</label>
        </div>
        <div class="formbuilder-radio">
          <input name="width" id="width-1" required="required" value="2" type="radio" />
          <label for="width-1">Slightly narrow</label>
        </div>
        <div class="formbuilder-radio">
          <input name="width" id="width-2" required="required" value="3" type="radio" />
          <label for="width-2">Perfect</label>
        </div>
        <div class="formbuilder-radio">
          <input name="width" id="width-3" required="required" value="4" type="radio" />
          <label for="width-3">Slightly wide</label>
        </div>
        <div class="formbuilder-radio">
          <input name="width" id="width-4" required="required" value="5" type="radio" />
          <label for="width-4">Too wide</label>
        </div>
      </div>
    </div>
  )
};

export default AddReviewForm;