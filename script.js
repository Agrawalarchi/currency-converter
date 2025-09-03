let dropDowns = document.querySelectorAll(".drop-down select");
let btn = document.querySelector("#button1");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg-para");
const swapBtn = document.querySelector("#swap-btn");
const amountInput = document.querySelector(".amount input");


const BASE_URL="https://kartz-currency-converter-api.vercel.app/currency"

const countryList = {
  AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", AOA: "AO", ARS: "AR", AUD: "AU", AZN: "AZ",
  BAM: "BA", BBD: "BB", BDT: "BD", XOF: "BE", BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN", BOB: "BO",
  BRL: "BR", BSD: "BS", NOK: "BV", BWP: "BW", BZD: "BZ", CAD: "CA", CDF: "CD", XAF: "CF", CHF: "CH",
  CLP: "CL", CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU", CZK: "CZ", DJF: "DJ", DKK: "DK", DOP: "DO",
  DZD: "DZ", EGP: "EG", ETB: "ET", EUR: "FR", FJD: "FJ", FKP: "FK", GBP: "GB", GEL: "GE", GGP: "GG",
  GHS: "GH", GIP: "GI", GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK", HTG: "HT", HUF: "HU",
  IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM", JOD: "JO", JPY: "JP",
  KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KPW: "KP", KRW: "KR", KWD: "KW", KYD: "KY", KZT: "KZ",
  LAK: "LA", LBP: "LB", LKR: "LK", LRD: "LR", LSL: "LS", LYD: "LY", MAD: "MA", MDL: "MD", MGA: "MG",
  MKD: "MK", MMK: "MM", MNT: "MN", MOP: "MO", MUR: "MU", MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY",
  MZN: "MZ", NAD: "NA", XPF: "NC", NGN: "NG", NPR: "NP", NZD: "NZ", OMR: "OM", PAB: "PA", PEN: "PE",
  PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA", RON: "RO", RSD: "RS", RUB: "RU",
  RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC", SDG: "SD", SEK: "SE", SGD: "SG", SLL: "SL", SOS: "SO",
  SRD: "SR", SYP: "SY", SZL: "SZ", TJS: "TJ", TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR", TTD: "TT",
  TZS: "TZ", UGX: "UG", USD: "US", UYU: "UY", UZS: "UZ", VND: "VN", VUV: "VU", YER: "YE", ZAR: "ZA"
};




for(let select of dropDowns) {
  for(let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>{
     updateFlag(evt.target);
   });
};



const updateFlag= (element)=>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}





const updateExchangeRate = async () => {
  let amtVal = amountInput.value.trim();
 if (isNaN(amtVal) || amtVal === "" || Number(amtVal) < 1) {
    amtVal = 1;
    amountInput.value = "1";
  }


  const URL = `${BASE_URL}/rates?c1=${fromCurr.value}&c2=${toCurr.value}&q=${amtVal}`;

  try{
    console.log(URL);
  let response = await fetch(URL);
  let data= await response.json();
    if (!data.rate) {
      throw new Error("Invalid response from API");
    }

  let finalAmount = data.rate.toFixed(4);
  console.log(finalAmount);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

catch(err){
 msg.innerText = "Something went wrong. Please try again later.";
 console.error("Exchange rate fetch error:", err);
}
};


const swapCurrencies = () => {
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;

  updateFlag(fromCurr);
  updateFlag(toCurr);
  updateExchangeRate();
};


btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

swapBtn.addEventListener("click", () => {
  swapCurrencies();
});

window.addEventListener("load", () => {
  updateExchangeRate();
}); 
