let basket =  JSON.parse(localStorage.getItem('basket'))

                //TABLE FUNCTIONS START
function decrease(event,id)
{
    let current = basket.find(x => +x.id === +id)
   current.count--
   let span = event.target.nextElementSibling
   span.innerHTML = current.count
   localStorage.setItem('basket',JSON.stringify(basket))
   ShowAlert()
  
}

function increase(event,id)
{
    let current = basket.find(x => +x.id === +id)
    current.count++
    let span = event.target.previousElementSibling
    span.innerHTML = current.count
    localStorage.setItem('basket',JSON.stringify(basket))
    ShowAlert()
} 

function del(element,prodcutId)
{
    let basket = JSON.parse(localStorage.getItem('basket'))
   

    let ProductIndex = basket.findIndex((p) => p.id == prodcutId);
    basket.splice(ProductIndex, 1);
   
    localStorage.setItem('basket',JSON.stringify(basket))
    element.parentElement.parentElement.remove()
    ShowCount()
}

                //TABLE FUNCTIONS END

function ShowAlert()
{
    let basket = JSON.parse(localStorage.getItem('basket')) 

  

    if(basket.length === 0)
    {
     document.querySelector('#empty').classList.remove('d-none')
    }     
    else{
     document.querySelector('#empty').classList.add('d-none')
     let list = '';

     basket.forEach(x  => {
        let price = x.price.split('US $')
         list+= `
         <tr>
         <td style = "width:20px"><i style = "color:black; font-size:30px;" class="fa-solid fa-trash-can" onclick = "del(event.target,${x.id})"></i></td>
         <td class="th"><img style = "width:60px;" src="${x.img}" alt=""></td>
         <td class="th-name">${x.name}</td>
         <td class="th-price">${price}</td>
         <td class="d-flex justify-content-center align-items-center td-count ms-5 mt-2">
         <i style = "cursor:pointer" id="minus" class="fa-solid fa-minus me-3" onclick = "decrease(event,${x.id})">
         </i> <span id="currentCount">${x.count}</span>
         <i style = "cursor:pointer" id="plus" class="fa-solid fa-plus ms-3" onclick = "increase(event,${x.id})">
         <td class="td-sub-total">${x.price * x.count}</td>
     </tr>
         `
     });

     let sum = 0;
     let count = 0;
 
     for (let item of basket) {
    
         sum += item.count * item.price
         count += item.count
     }
 
     document.querySelector('#tbody').innerHTML = list
   
    }

 
    
}

ShowAlert();