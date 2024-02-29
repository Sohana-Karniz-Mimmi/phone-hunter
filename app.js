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
    console.log(phones);
    
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
    phones = phones.slice(0, 3);
    
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



            <button class="btn btn-primary show-details">Show Details</button>
            <dialog id="my_modal_3" class="modal">
            <div class="modal-box rounded-lg">
                <form method="dialog">
                <button class="text-2xl btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h2 class=" pb-4 card-title border-b border-[#ddd] ">${phone.phone_name}</h2>
                <p class="pt-4 pb-2">Release Date: Released 2020, March 19</p>
                <p class="py-2">Others: 5.0, A2DP, LE, EDR</p>
                <p class="py-2">Storage: 128GB/256GB/1TB storage, no card slot</p>
                <p class="py-2">Sensor: Face ID</p>
                <div class="pt-4 modal-action border-t border-[#ddd]">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn bg-[#6c757d] text-white">Close</button>
      </form>
    </div>
            </div>
            </dialog>



            </div>
            </div>
        </div>
        `
        phoneContainer.appendChild(div);

    });
    showDetails()
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
const showDetails = () => {
    const showDetailsBtn = document.getElementsByClassName('show-details');
    for(let detailsBtn of showDetailsBtn){
        detailsBtn.addEventListener('click', function(){
            const myModal = document.getElementById('my_modal_3');
            myModal.showModal()
        })
    }
    

};
