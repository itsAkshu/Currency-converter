const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for(let select of dropdowns){ //creating the dropdown menu using the countryList
    for(let currCode in countryList){
        let newOptions = document.createElement("option"); //Creating a new dropdown,i.e. option
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        select.append(newOptions);
        if(select.name==="from" && currCode==="USD"){
            newOptions.selected = "selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOptions.selected = "selected";
        }
    }
    select.addEventListener("change",(evt)=>{ //On changing the dropdown options, we have to change the flag as well
        updateFlag(evt.target);
    })
}
const updateExchangeRate = async() =>{  //Getting the exhange rates for various currencies using the api
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value; 
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmt = amtVal*rate;
    msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmt}${toCurr.value}`;
}
const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newScr = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newScr;
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load",()=>{ //As soon as the page is loaded, we get a exchange rate
    updateExchangeRate();
})
