const loadPhones = async (searchText, isShowAll) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // const url = `https://openapi.programming-hero.com/api/phones?search=iphone`
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data
    displayPhones(phones, isShowAll);
}

// display all phones
const displayPhones = (phones, isShowAll) => {
    
    const phoneContainer = document.getElementById('phone-container'); 
    phoneContainer.innerText = '';
    // console.log(phones);
    
    // Show only 10 phones
    const phoneLength = phones.length;
    const showMoreBtn = document.getElementById('show-more-btn');
    showMoreBtn.classList.add('hidden');
    if((phoneLength > 10 && (!isShowAll))){
        showMoreBtn.classList.remove('hidden');

    }
    else{
        showMoreBtn.classList.add('hidden');
    }

    if(!isShowAll){
    phones = phones.slice(0, 12);
    
    }
    
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList = `card bg-[#ddd] p-4 shadow-xl`;
        div.innerHTML = `
        <img class="rounded-[35px] p-4" src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <div class="card-actions mt-6">



            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary show-details">Show Details</button>



            </div>
            </div>
        </div>
        `
        phoneContainer.appendChild(div);

    });
    loading(false)
    
}

// handle search button click
const handleSearch = (isShowAll) =>{
    loading(true)
   const inputField = document.getElementById('input-field').value;
   loadPhones(inputField, isShowAll)
}


const handleShowAll = () =>{
    handleSearch(true)
}



// loading
 const loading = (isLoading) =>{
    const loadingBtn = document.getElementById('loading')
     if(isLoading){
        loadingBtn.classList.remove('hidden')
     }
     else{
        loadingBtn.classList.add('hidden')
     }
 }

//  Show Details
const showDetails = async (id) => {
            const url = `https://openapi.programming-hero.com/api/phone/${id}`
            const res = await fetch(url);
            const data = await res.json();
            displayPhoneDetails(data.data);
            const myModal = document.getElementById('my_modal_3');
            myModal.showModal()
};

const displayPhoneDetails = (phone) => {
console.log(phone);
    const myModal = document.getElementById('my_modal_3');
    const div = document.createElement('div');
    div.classList = `modal-box rounded-lg`
    div.innerHTML = `<form method="dialog">
    <button class="text-2xl btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h2 id="phone-title" class=" pb-4 card-title border-b border-[#ddd] ">${phone.name}</h2>
    <p class="pt-4 pb-2">Brand: ${phone.brand}</p>
    <p class="py-2">Release Date: ${phone.releaseDate}</p>
    <p class="py-2">Storage: ${phone.mainFeatures.storage}</p>
    <p class="py-2">Display Size: ${phone.mainFeatures.displaySize}</p>
    <p class="py-2">Slug: ${phone.slug}</p>
    <p class="py-2">Others: 5.0, A2DP, LE, EDR</p>
    <p class="py-2">Sensor: ${phone.mainFeatures.sensors[0]}</p>
    <div class="pt-4 modal-action border-t border-[#ddd]">
<form method="dialog">
<!-- if there is a button in form, it will close the modal -->
<button class="btn bg-[#6c757d] text-white">Close</button>
</form>
    </div>`

    myModal.appendChild(div);
}

loadPhones('apple')
const showMore = document.getElementById('show-more-btn');
showMore.classList.add('hidden');