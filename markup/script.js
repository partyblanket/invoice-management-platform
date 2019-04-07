
const pdf = document.getElementById('pdf')

document.addEventListener('click', (e) => {
  if(details[e.target.id]) {
    console.log(true);
    
  }
  
})

function getPDF () {
  const docx = document.getElementById('pdf').innerHTML
  const obj = {doc: 'this is text'}
  console.log(obj)
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(obj);
  // fetch('/upload', {
  //     method: 'POST',
  //     headers : new Headers(),
  //     body:JSON.stringify({doc})
  // }).then((res) => res.json())
  // .then((data) =>  console.log(data))
  // .catch((err)=>console.log(err))

}

function onChange () {
  
}


const details = {
  date: '20 April 2019'
}

function update () {

}

function updateText (item) {
  document.getElementById(item).innerHTML = details[item]
}

updateText('date')