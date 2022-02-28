/* --------------------------------- spinner -------------------------------- */
const spinner = (spinnerId) =>{
  document.getElementById('spinner').style.display = spinnerId;
}
window.addEventListener('load', function(){
  spinner('none')
})

/* --------------------------- load phone function -------------------------- */
const loadPhone = () =>{
  const inputField = document.getElementById('search-field');
  const inputFieldText = inputField.value.toLowerCase();
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`;
  inputField.value = '';
  fetch(url)
  .then(res => res.json())
  .then(data => displayPhone(data))
}

/* ------------------------- display phone function ------------------------- */
const displayPhone = (phones) =>{
console.log(phones)
}