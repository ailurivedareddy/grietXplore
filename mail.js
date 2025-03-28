const firebaseConfig = {
    apiKey: "AIzaSyBhsTqTHPiZTVJlOPdgK7EkewFYYaA09Pw",
    authDomain: "grietxplore.firebaseapp.com",
    databaseURL: "https://grietxplore-default-rtdb.firebaseio.com",
    projectId: "grietxplore",
    storageBucket: "grietxplore.firebasestorage.app",
    messagingSenderId: "558966914296",
    appId: "1:558966914296:web:2eef0edaa211c96f318f0d"
  };firebase.initializeApp(firebaseConfig);
  var GrietXploreDB= firebase.database().ref('GrietXplore')
  document.getElementById('lostForm').addEventListener('submit',submitform);

  function submitform(e){

    e.preventDefault();const name = document.getElementById('name').value;
    const itemLost = document.getElementById('itemLost').value;
    const itemDescriptionLost = document.getElementById('itemDescriptionLost').value;
    const lostLocation = document.getElementById('lostLocation').value;
    const contactLost = document.getElementById('contactLost').value;
    const contactLostInput = document.getElementById('contactLostInput').value;
    console.log(name,itemLost,itemDescriptionLost,contactLostInput);
    saveMessages(name,itemLost,itemDescriptionLost,lostLocation,contactLost,contactLostInput);
  
  
  }
  const saveMessages = (name,itemLost,itemDescriptionLost,lostLocation,contactLost,contactLostInput) => {
    var newgriet = GrietXploreDB.push();
    newgriet.set({
        name:name,
        itemLost:itemLost,
        itemDescriptionLost: itemDescriptionLost,
        lostLocation:lostLocation,
        contactLost:contactLost,
        contactLostInput:contactLostInput,

    })
  }