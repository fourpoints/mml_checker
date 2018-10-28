"use strict";

const setStylesOnElement = (styles, element) => {
  Object.assign(element.style, styles);
}

// Create dummy element
const mmlDummy = document.createElement("div");

// Styling
const mmlDummyStyles = {
  "position"    : "absolute",
  "top"         : "0",
  "left"        : "0",
  "width"       : "auto",
  "height"      : "auto",
  "visibility"  : "hidden",
  "font-family" : "serif",
  "lineheight"  : "normal",
}
setStylesOnElement(mmlDummyStyles, mmlDummy);
mmlDummy.innerHTML = "<math><mfrac><mi>xy</mi><mi>zw</mi></mfrac></math>";

// Add to document body
document.body.appendChild(mmlDummy);
const has_mml = (mmlDummy.offsetHeight > mmlDummy.offsetWidth);
document.body.removeChild(mmlDummy);

// Check if user wants mathjax
const confirm_load = () => {
  // Create screen-covering element
  const confirmationFill = document.createElement("div");
  const confirmationFillStyles = {
    "position"         : "fixed",
    "display"          : "flex",
    "align-items"      : "center",
    "justify-content"  : "center",
    "width"            : "100%",
    "height"           : "100%",
    "background-color" : "rgba(0, 0, 0, 0.2)",
  }
  setStylesOnElement(confirmationFillStyles, confirmationFill);

  // create content element
  const confirmationContent = document.createElement("div");
  const confirmationContentStyles = {
    "display"          : "flex",
    "align-items"      : "center",
    "justify-content"  : "center",
    "flex-direction"   : "column",
    "width"            : "70%",
    "max-width"        : "600px",
    "padding"          : "1rem",
    "background-color" : "#eaeaea",
    "color"            : "#000",
    "border-radius"    : "4px",
    "box-shadow"       : "0 0 10px #888",
  }
  setStylesOnElement(confirmationContentStyles, confirmationContent);

  // create confirmation info
  const confirmationTextWrapper = document.createElement("div");
  const confirmationTextWrapperStyles = {
    "width"      : "100%",
    "text-align" : "center",
  }
  setStylesOnElement(confirmationTextWrapperStyles, confirmationTextWrapper);

  // creat confirmation text title
  const confirmationTextTitle = document.createElement("strong");
  confirmationTextTitle.innerHTML = "Your brower does not support Math Markup Language";

  // creat confirmation text info
  const confirmationTextInfo = document.createElement("p");
  confirmationTextInfo.innerHTML = `To best view math on the web, ensure you are running <a href="https://www.mozilla.org/en-US/firefox/">Firefox</a> or <a href="https://support.apple.com/kb/DL1569?viewlocale=en_US&amp;locale=en_US">Safari</a> browser with the <a href="http://www.gust.org.pl/projects/e-foundry/lm-math/download/index_html">Latin Modern Math</a> font. These are the only browsers that <a href="https://caniuse.com/#feat=mathml">support</a> presentation MathML, the web standard for displaying maths. Chrome or Edge do not support MathML.`;

  // create confirm/cancel wrapper
  const confirmationButtonsWrapper = document.createElement("div");

  // create confirm button
  const confirmationButton = document.createElement("input");
  confirmationButton.type = "button";
  confirmationButton.name = "confirmation";
  confirmationButton.value = "Load MathJax";
  confirmationButton.onclick = (e) => {
    document.body.removeChild(confirmationFill)
    load_mathjax()

    const remember = confirmationCheckbox.checked;
    if (remember) {
      localStorage.setItem("load_mathjax", "true");
    }
  }

  // create cancel button
  const confirmationCancel = document.createElement("input");
  confirmationCancel.type = "button";
  confirmationCancel.name = "cancellation";
  confirmationCancel.value = "Cancel";
  confirmationCancel.onclick = (e) => {
    document.body.removeChild(confirmationFill)
  }

  // create remember button
  const confirmationRemember = document.createElement("label");
  const confirmationRememberStyles =
  {
    "align-self" : "flex-end",
  }
  setStylesOnElement(confirmationRememberStyles, confirmationRemember);


  const confirmationCheckbox = document.createElement("input");
  confirmationCheckbox.type = "checkbox";
  confirmationCheckbox.name = "remember";
  const confirmationLabelText = document.createElement("span");
  const confirmationLabelTextStyles = {
    "vertical-align" : "middle",
    "font-size"      : "0.8rem",
  }
  setStylesOnElement(confirmationLabelTextStyles, confirmationLabelText);

  confirmationLabelText.innerHTML = "Remember using MathJax";

  confirmationTextWrapper.appendChild(confirmationTextTitle);
  confirmationTextWrapper.appendChild(confirmationTextInfo);

  confirmationButtonsWrapper.appendChild(confirmationCancel);
  confirmationButtonsWrapper.appendChild(confirmationButton);

  confirmationRemember.appendChild(confirmationCheckbox);
  confirmationRemember.appendChild(confirmationLabelText);

  confirmationContent.appendChild(confirmationTextWrapper);
  confirmationContent.appendChild(confirmationButtonsWrapper);
  confirmationContent.appendChild(confirmationRemember);

  confirmationFill.appendChild(confirmationContent);
  document.body.appendChild(confirmationFill);

}

const load_mathjax = () => {

  // add "MJX-tex-caligraphic" to all <mi/mo mathvariant="cal"> elements
  const calligraphics = document.getElementsByClassName("calligraphic");

  for (let i = 0; i < calligraphics.length; i++) {
    // caligraphic is not a typo!
    calligraphics.item(i).classList.add("MJX-tex-caligraphic");

    // NOTE no distinction between roman and bold font
  }

  // jax script element
  const jax_script = document.createElement("script");

  // url
  jax_script.src = "https:/cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"

  // Get first script element for insertion
  const ref = document.querySelector("script");

  // Put script after first script
  ref.after(jax_script);
}

const load = localStorage.getItem("load_mathjax");

if (load) { load_mathjax() }
else if (!has_mml) { confirm_load() }
