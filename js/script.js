/* --------------------------------- spinner -------------------------------- */
const spinner = (spinnerId) =>{
  document.getElementById('spinner').style.display = spinnerId;
}

window.addEventListener('load', function(){
  spinner('none')
})

const loadPhone = () =>{
  const inputField = document.getElementById('search-field');
  const inputFieldText = inputField.value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`;
  inputField.value = '';
  fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
}