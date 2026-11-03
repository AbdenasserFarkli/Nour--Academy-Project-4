import { groupes, eleves } from "./data.js";
const test = JSON.parse(localStorage.getItem("dataeleves"))
if (test == null||test.length==0) {
    localStorage.setItem("dataeleves",JSON.stringify(eleves))
}


const parents = document.getElementById("liste-eleves")

function creerLigne(eleve) {
    const li = document.createElement("li");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const name = document.createElement("span");
    const absense = document.createElement("span");
    const note = document.createElement("span");
    const buttonabsenss = document.createElement("button");
    const buttonAjoti = document.createElement("button");
    const inputnote = document.createElement("input");
li.id=eleve.id
    li.classList.add(
        
        "eleve",
        "flex",
        "flex-col",
        "gap-3",
        "rounded-2xl",
        "bg-white",
        "p-4",
        "shadow-sm",
        "ring-1",
        "ring-line",
        "sm:flex-row",
        "sm:items-center",
        "sm:justify-between"
    );

    div1.classList.add("flex", "flex-wrap", "items-center", "gap-3");

    div2.classList.add("flex", "flex-wrap", "items-center", "gap-2");

    name.classList.add("font-semibold", "text-ink");

    absense.classList.add(
        "rounded-full",
        "bg-alert-soft",
        "px-3",
        "py-1",
        "text-xs",
        "text-alert"
    );

    note.classList.add(
        "rounded-full",
        "bg-brand-soft",
        "px-3",
        "py-1",
        "text-xs",
        "font-medium",
        "text-brand"
    );

   buttonabsenss.className = " bg-red-500 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition-colors";
buttonabsenss.classList.add("abssens")
buttonAjoti.className = "bg-blue-600 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors";

    inputnote.classList.add(
        "h-10",
        "w-20",
        "rounded-xl",
        "border",
        "border-line",
        "px-2",
        "outline-none"
    );

    parents.appendChild(li);
    li.append(div1, div2);
    div1.append(name, absense, note);
    div2.append(buttonabsenss, inputnote, buttonAjoti);

    name.textContent = eleve.nom + " " + eleve.prenom;
    absense.textContent = eleve.absences + " absences";

    if (eleve.notes.length > 0) {
        note.textContent =Math.floor(
            eleve.notes.reduce((total, notee) => total + notee, 0)
            / eleve.notes.length )+ "/20";
    } else {
        note.textContent = "—";
    }

    buttonabsenss.textContent = "Absence";
    buttonAjoti.textContent = "Ajouter note";

    inputnote.type = "number";
    inputnote.placeholder = "Note";
    inputnote.min = "0";
    inputnote.max = "20";

    return li;
}
function showeleves() {
    const datashow=JSON.parse(localStorage.getItem("dataeleves"))
    datashow.forEach(creerLigne);
}

function countereleve() {
    const  counter = document.getElementById("compteur")


            const data = JSON.parse(localStorage.getItem("dataeleves"))

        
    
    counter.textContent=data.length + " élèves "
    
}
const  serchedata=document.getElementById("recherche")
   serchedata.addEventListener("input",()=>{
    secrche() 

    })
function secrche() {
       const data = JSON.parse(localStorage.getItem("dataeleves"))
       const rusultserch= data.filter((serch)=>{
       return (serch.nom.toLowerCase().includes(serchedata.value.toLowerCase()) || serch.prenom.toLowerCase().includes(serchedata.value.toLowerCase()))
       })
parents.innerHTML = "";

    rusultserch.forEach(creerLigne);

    
}
const filterGroub= document.getElementById("filtre-groupe")
filterGroub.addEventListener("change",(e)=>{
        const  counter = document.getElementById("compteur")

    e.preventDefault()
    const result = FilterByGroup();

const eleve=document.getElementById("liste-eleves")
        const p = document.createElement("p")

    if (result.length==0 ) {
        
        p.textContent=   "Aucun résultat"
        p.classList.add("flex", "items-center", "justify-center", "text-center", "font-bold", "text-[25px]")

        eleve.appendChild(p)
        counter.textContent=result.length+" élèves"


    }else{
            FilterByGroup()
                    counter.textContent=result.length+" élèves"



    }


})
function FilterByGroup() {
  const data = JSON.parse(localStorage.getItem("dataeleves"))
  
  const filterGroups = data.filter((filtergb)=>{
    
    return filtergb.groupeId == filterGroub.value ||filterGroub.value==""


  })

  parents.innerHTML = "";

  filterGroups.forEach(creerLigne);
return filterGroups
    
}
function countAbssence() {
const counter = document.getElementById("bilan-absences")
  const data = JSON.parse(localStorage.getItem("dataeleves"))
const counterr = data.reduce((total,loopdata)=>{
    return total+ loopdata.absences
},0)
    counter.innerText=counterr
}
function countallert() {
    const allert= document.getElementById("bilan-alertes")
      const data = JSON.parse(localStorage.getItem("dataeleves"))
      let counter =0
      for (let i = 0; i < data.length; i++) {
        if (data[i].absences>=3) {
            counter++
            
        }else
            continue
        
      }
allert.textContent=counter
    
}
const tri=document.getElementById("tri")
tri.addEventListener("change",()=>{
    if (tri.value=="nom") {
            TrialParNom()

    }
    if (tri.value=="moyenne") {
console.log("flse");
 }
})
function TrialParNom() {
      const data = JSON.parse(localStorage.getItem("dataeleves"))
data.sort((a, b) => a.nom.localeCompare(b.nom));
parents.innerHTML = "";

    data.forEach(creerLigne);
    
}
const listParent = document.getElementById("liste-parents")

function addelevinlestparent(eleve) {
const li = document.createElement("li")
const div = document.createElement("div")
const span = document.createElement("span")
const p = document.createElement("p")

li.classList.add("flex", "items-center", "justify-between", "p-4", "mb-3", "rounded-xl", "border", "bg-white")

div.classList.add("flex", "flex-col", "gap-1")

p.textContent = eleve.nom +" "+ eleve.prenom
p.classList.add("font-semibold", "text-gray-800")

span.textContent = eleve.telephoneParent
span.classList.add("text-sm", "text-gray-500")

if (eleve.absences >= 3) {
    li.classList.add("border-red-300", "bg-red-50")
} else {
    li.classList.add("border-gray-200")
}

listParent.appendChild(li)
li.appendChild(div)
div.append(span, p)

return li
}
function alertparents() {
 const data = JSON.parse(localStorage.getItem("dataeleves"))
 const filtteri = data.filter((loop)=>{
    return loop.absences>=3

 })
 listParent.innerHTML=""
filtteri.map(addelevinlestparent)

    
}
parents.addEventListener("click",(e)=>{
    e.preventDefault()
    const targetbutton = e.target
    const buttonabssens=targetbutton.closest(".abssens")
    if (buttonabssens!=null) {
        const targetcart = buttonabssens.closest(".eleve")
       const idCart= targetcart.id
       Ajoterabssens(idCart)
        
        
    }
    
    

})
 function Ajoterabssens(id) {
  const data = JSON.parse(localStorage.getItem("dataeleves"))
  const findbyid=data.find((target)=>{
    return target.id==id
  })
findbyid.absences=findbyid.absences+1;
localStorage.setItem("dataeleves", JSON.stringify(data));
parents.innerHTML=""
    data.forEach(creerLigne);

countereleve()
countAbssence()
countallert()
alertparents() 
 }

showeleves()
countereleve()
countAbssence()
countallert()
alertparents() 