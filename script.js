const selectTag = document.querySelectorAll("select");
const button = document.querySelector("button");
const from = document.querySelector(".input");
const to = document.querySelector(".output");
const icons = document.querySelectorAll(".icons");



// javascript operation
selectTag.forEach((tag, id) => {
  for (const lang in languages) {
    let selected;
    if (id == 0 && lang == "en-GB") {
      selected = "selected";
    }
    else if (id == 1 && lang == "hi-IN") {
      selected = "selected";
    }
    let option = ` <option value="${lang}" ${selected}>${languages[lang]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
  button.addEventListener("click", () => {
    let text = from.value;
    translateFrom = selectTag[0].value;
    translateTo = selectTag[1].value;
    // console.log(text);
    if(!text){
      alert("please type some sentences");
      return;
    }
    let upiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(upiUrl).then(res => res.json()).then(data => {
      console.log(data);
      to.value = data.responseData.translatedText;
    })
  })
})


icons.forEach((event) => {
  event.addEventListener("click", ((target) => {
    let utterance;
    if (target.id == "fromvol") {
      utterance = new SpeechSynthesisUtterance(from.value);
      utterance.lang = selectTag[0].value;
    }
    else {
      utterance = new SpeechSynthesisUtterance(to.value);
      utterance.lang = selectTag[1].value;
    }
    speechSynthesis.speak(utterance);
  }))
})


