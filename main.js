// your code here, it may be worth it to ensure this file only runs AFTER the dom has loaded.let totalCal=0
document.addEventListener('DOMContentLoaded', e=>{
getCalorie()
document.addEventListener('click', e=>{
    e.preventDefault()
    if(e.target.textContent==='Add Calorie Intake'){
        postCalory(e.target.closest('FORM'))
    }else if(e.target.className==='edit-button uk-icon'){
        console.log('now editing')
    }
    else console.log(e.target)
    
})
})

const getCalorie=()=>{
fetch("http://localhost:3000/api/v1/calorie_entries")
.then(res=>res.json())
.then(calories=>{
    calories.forEach(calory => {
        
        totalCal +=parseInt(calory.calorie)
        renderCalorie(calory, totalCal)
    });
})

}

 const renderCalorie=(calory, totalCal)=>{
     calUl=document.getElementById('calories-list')
     calUl.innerHTML +=`<li class="calories-list-item" id='${calory.id}'>
     <div class="uk-grid">
       <div class="uk-width-1-6">
         <strong>${calory.calorie}</strong>
         <span>kcal</span>
       </div>
       <div class="uk-width-4-5">
         <em class="uk-text-meta">${calory.note}</em>
       </div>
     </div>
     <div class="list-item-menu">
       <a class="edit-button" id='edit-button' uk-toggle="target: #edit-form-container" uk-icon="icon: pencil"></a>
       <a class="delete-button" uk-icon="icon: trash"></a>
     </div>
   </li>`
   let calProgress=document.querySelector('progress')
  
  calProgress.value=totalCal
 }

 const postCalory=form=>{
    calObj={
        calorie: form.calorie.value,
        note: form.note.value
    }
    fetch("http://localhost:3000/api/v1/calorie_entries", {
        method: "POST",
        headers: {
            "content-type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify(calObj)
    }).then(res=>res.json())
    .then(postedCal=>{
        totalCal+= parseInt(postedCal.calorie)
        renderCalorie(postedCal,totalCal )
    })

 }
