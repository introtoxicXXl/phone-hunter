/* --------------------------------- spinner -------------------------------- */
const display = (proparty,value) =>{
  document.getElementById(proparty).style.display = value;
}
window.addEventListener('load', function(){
  display('spinner','none');
})

/* --------------------------- load phone function -------------------------- */
const loadPhone = () =>{
  const inputField = document.getElementById('search-field');
  const inputFieldText = inputField.value.toLowerCase();
  if(inputFieldText === ''){
    swal("Please Type Phone Name");
    return;
  }else{
    display('spinner','block');
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`;
  // console.log(url)
  inputField.value = '';
  fetch(url)
  .then(res => res.json())
  .then(data => {
    if(data.status){
      displayPhone(data.data.slice(0,20));
    }else{
      display('spinner','block');
      document.getElementById('show-card').textContent ='';
      display('no-result','block');
      display('spinner','none');
      return;
    }
  })
  }
}

/* ------------------------- display phone function ------------------------- */
const displayPhone = (phones) =>{
 const showCard = document.getElementById('show-card');
 showCard.textContent ='';
 display('no-result','none')
 display('spinner','none');
 phones.forEach(phone =>{
  //  console.log(phone);
   const div = document.createElement('div');
   div.className = 'col';
   div.innerHTML =`
   <div class="card h-100 rounded-3 border-success">
        <img src="${phone.image}" class="card-img-top w-75 mx-auto p-3" alt="...">
        <div class="card-body">
          <h3 class="card-title">${phone.phone_name}</h3>
          <p class="fst-italic fs-6">Brand: ${phone.brand}</p>
          <button class="btn btn-primary">Detail</button>
        </div>
      </div>
   `;
   showCard.appendChild(div);
 })
}