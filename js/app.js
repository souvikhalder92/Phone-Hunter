const loadPhones = async(searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
   const res =await fetch(url);
   const data = await res.json();
   displayPhones(data.data,dataLimit);
    
}
const loadPhone = async(dataLimit) =>{
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
 const res =await fetch(url);
 const data = await res.json();
 displayPhones(data.data,dataLimit);
   
}

const displayPhones = (phones,dataLimit) =>{
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    //display 12phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 12)
    {
    phones = phones.slice(0,12);
    showAll.classList.remove('d-none');
    }
    else
    {
        showAll.classList.add('d-none');
    }
    //display no phone
   const noPhone = document.getElementById('no-phone');
   if(phones.length === 0)
   {
    noPhone.classList.remove('d-none');
   }
   else
   {
    noPhone.classList.add('d-none');
   }
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-2 bg-light">
        <img src="${phone.image}" class="card-img-top mx-auto  w-50" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.brand}</h5>
          <p class="card-text">${phone.phone_name}</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
         
        </div>
      </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    //stop loader
    togglespinner(false);


}

const processSearch = (dataLimit) =>{
  //start loader
  togglespinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText,dataLimit);
 

}

document.getElementById('btn').addEventListener('click',function(){
   processSearch(10);


})
//enter key

document.getElementById('search-field').addEventListener('keypress',function(e){
  if(e.key == 'Enter')
  {
    processSearch(10);
  }
})

const togglespinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading)
    {
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
    
}


///not a best way
document.getElementById('btn-show').addEventListener('click',function(){
  processSearch();

})

const loadPhoneDetails = async id =>
{
  
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
 
  const modelTitle = document.getElementById('phoneDetailsLabel');
  modelTitle.innerText = phone.name;
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.innerHTML = `
  <img src = "${phone.image}">
  <p class="mt-3">Release Date : ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found' }</p>
  <p>Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information Found'}</p>
  <p>Display Size : ${phone.mainFeatures.displaySize}</p>
  <p>Memory : ${phone.mainFeatures.memory}</p>
  <p>Sensor : ${phone.mainFeatures.sensors[0]}</p>
  <p>Others : ${phone.others ? phone.others.Bluetooth : 'No Others Information'}<p>
 
  `
}
loadPhone();