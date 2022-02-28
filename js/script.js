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
  inputField.value = '';
  fetch(url)
  .then(res => res.json())
  .then(data => {
    if(data.status){
      displayPhone(data.data.slice(0,20));
      
      const resultFound = document.getElementById('result-found');
      display('result-found','block');
      resultFound.innerText=`${data.data.length} Result Found`;
    }else{
      display('spinner','block');
      document.getElementById('show-card').textContent = '';
      document.getElementById('show-details').textContent = '';
      display('no-result','block');
      display('spinner','none');
      display('result-found','none');
      return;
    }
  })
  }
}

/* ------------------------- display phone function ------------------------- */
const displayPhone = (phones) =>{
 const showCard = document.getElementById('show-card');
 showCard.textContent ='';
 document.getElementById('show-details').textContent = '';
 display('no-result','none')
 display('spinner','none');
 phones.forEach(phone =>{
   const div = document.createElement('div');
   div.className = 'col';
   div.innerHTML =`
   <div class="card h-100 rounded-3 border-success">
        <img src="${phone.image}" class="card-img-top w-75 mx-auto p-3" alt="...">
        <div class="card-body">
          <h3 class="card-title">${phone.phone_name}</h3>
          <p class="fst-italic fs-6">Brand: ${phone.brand}</p>
          <button onclick="loadDetails('${phone.slug}')" class="btn btn-primary">Detail</button>
        </div>
      </div>
   `;
   showCard.appendChild(div);
 })
}
/* -------------------------- load details function ------------------------- */
const loadDetails = (details) =>{
  const url = `https://openapi.programming-hero.com/api/phone/${details}`;
  fetch(url)
  .then(res => res.json())
  .then(data => showDetails(data.data))
}

/* -------------------------- show details function ------------------------- */
const showDetails = (data) =>{
  console.log(data.others)
  const showDetails = document.getElementById('show-details');
  showDetails.innerHTML = ` 
  <div class="col d-flex justify-content-center">
          <img src="${data.image}" class="h-75" alt="">
        </div>
        <div class="col">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>${data.name}</td>
              </tr>
              <tr>
                <th scope="row">Brand</th>
                <td>${data.brand}</td>
              </tr>
              <tr>
                <th scope="row">Release Date</th>
                <td id="release-date"></td>
              </tr>
              <tr>
                <th scope="row" colspan="2" class="text-center fs-4">Main Features</th>
              </tr>
              <tr>
                <th scope="row">Stroage</th>
                <td>${data.mainFeatures.storage}</td>
              </tr>
              <tr>
                <th scope="row">Display size</th>
                <td>${data.mainFeatures.displaySize}</td>
              </tr>
              <tr>
                <th scope="row">Chip set</th>
                <td>${data.mainFeatures.chipSet}</td>
              </tr>
              <tr>
                <th scope="row">Memory</th>
                <td>${data.mainFeatures.memory}</td>
              </tr>
              <tr>
                <th scope="row">Sensor</th>
                <td>${data.mainFeatures.sensors}</td>
              </tr>
              <tr>
                <th scope="row" colspan="2" class="text-center fs-4">Others</th>
              </tr>
              <tr>
                <th scope="row">WLAN</th>
                <td>${data.others.WLAN}</td>
              </tr>
              <tr>
                <th scope="row">Bluetooth</th>
                <td>${data.others.Bluetooth}</td>
              </tr>
              <tr>
                <th scope="row">Radio</th>
                <td>${data.others.Radio}</td>
              </tr>
              <tr>
                <th scope="row">GPS</th>
                <td>${data.others.GPS}</td>
              </tr>
              <tr>
                <th scope="row">NFC</th>
                <td>${data.others.NFC}</td>
              </tr>
              <tr>
                <th scope="row">USB</th>
                <td>${data.others.USB}</td>
              </tr>
            </tbody>
          </table>
        </div>
  `;
  const releaseDate = document.getElementById('release-date');
  const wlan = document.getElementById('wlan');
  if(data.releaseDate){
    releaseDate.className = 'text-success';
    releaseDate.innerText = data.releaseDate;
  }else{
    releaseDate.className = 'text-danger'
    releaseDate.innerText = 'Coming soon';
  };
}