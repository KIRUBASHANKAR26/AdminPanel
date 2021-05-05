var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

var newData = [];
var xhttp = new XMLHttpRequest();
xhttp.open("GET","http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",true);
xhttp.onreadystatechange = function() {
    if(this.readyState === 4){
        var adminData = JSON.parse(this.responseText);
        for(var i=0; i<adminData.length;i++){
 
            renderAdminData(adminData[i].id, adminData[i].firstName, adminData[i].lastName,
                adminData[i].email, adminData[i].phone )
            newData.push(adminData[i]);
        }
         
        searchIndex(newData); 
        rightSection(newData);  
    }
}
xhttp.send();


function renderAdminData(id, fName, lName, email, phone) {

    var tableBody = document.getElementById("table-body");

    var tableRow = document.createElement("tr");
    tableRow.setAttribute("class", "data-row");
    tableRow.setAttribute("id", id);
    
    //id

    var tabledataId = document.createElement("td");
    tabledataId.setAttribute("class", "column1");
    var tabledataIdNode = document.createTextNode(id);
    tabledataId.appendChild(tabledataIdNode);

    //finstName

    var tabledataFn = document.createElement("td");
    tabledataFn.setAttribute("class", "column2");
    var tabledataFnNode = document.createTextNode(fName);
    tabledataFn.appendChild(tabledataFnNode);

    //lastName

    var tabledataLn = document.createElement("td");
    tabledataLn.setAttribute("class", "column3");
    var tabledataLnNode = document.createTextNode(lName);
    tabledataLn.appendChild(tabledataLnNode);

    //email

    var tabledataEmail = document.createElement("td");
    tabledataEmail.setAttribute("class", "column4");
    var tabledataEmailNode = document.createTextNode(email);
    tabledataEmail.appendChild(tabledataEmailNode);

    //phone

    var tabledataPhone = document.createElement("td");
    tabledataId.setAttribute("class", "column5");
    var tabledataPhoneNode = document.createTextNode(phone);
    tabledataPhone.appendChild(tabledataPhoneNode);

    tableRow.appendChild(tabledataId);
    tableRow.appendChild(tabledataFn);
    tableRow.appendChild(tabledataLn)
    tableRow.appendChild(tabledataEmail);
    tableRow.appendChild(tabledataPhone);
    tableBody.appendChild(tableRow);
    return tableBody;
}

//////

function rightSection(adminData) {
    const dataRows = document.querySelectorAll(".data-row")
    const userName = document.getElementById("user-name");
    const description = document.getElementById("description");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const state = document.getElementById("state");
    const zipCode = document.getElementById("zip-code");
    
    
    dataRows.forEach((dataRow,idx) => {
        if (idx === 0) {
            dataRow.classList.add("active");
            console.log(adminData[idx]);
            userName.innerHTML = `<h3>USERNAME</h3>: ${adminData[idx].firstName} ${adminData[idx].lastName}`;
            description.innerHTML = adminData[idx].description;
            address.innerHTML = `<h4>ADDRESS</h4>: ${adminData[idx].address.streetAddress}`;
            city.innerHTML = `<h4>CITY</h4>: ${adminData[idx].address.city}`;
            state.innerHTML = `<h4>STATE</h4>: ${adminData[idx].address.state}`;
            zipCode.innerHTML = `<h4>ZIPCODE</h4>: ${adminData[idx].address.zip}`;
        }
        dataRow.addEventListener("click", () => {
            console.log(dataRow.id);
            removeActiveClasses();
            dataRow.classList.add("active");
            const searchBox = document.getElementById("search-box");
            searchBox.value = "";
            for (let i = 0; i < adminData.length; i++) {

                if(parseInt(dataRow.id) === adminData[i].id){
                    // console.log( parseInt(dataRow.id));
                    const fullName = `<h3>USERNAME</h3>: ${adminData[i].firstName} ${adminData[i].lastName}`
                    const addressValue = `<h4>ADDRESS</h4>: ${adminData[i].address.streetAddress}`
                    const cityValue = `<h4>CITY</h4>: ${adminData[i].address.city}`;
                    const stateValue = `<h4>STATE</h4>: ${adminData[i].address.state}`;
                    const zipValue = `<h4>ZIPCODE</h4>: ${adminData[i].address.zip}`;
                                    
                    // console.log(adminData[i].description);
                    // console.log(adminData[i].address.streetAddress);
                    // console.log(adminData[i].address.city);
                    // console.log(adminData[i].address.state);
                    // console.log(adminData[i].address.zip);
                    
                    userName.innerHTML = fullName;
                    description.innerHTML = adminData[i].description;
                    address.innerHTML = addressValue;
                    city.innerHTML = cityValue;
                    state.innerHTML = stateValue;
                    zipCode.innerHTML = zipValue;


                }
            }


        })
    });  
}
function removeActiveClasses() {
    const dataRows = document.querySelectorAll(".data-row")

    dataRows.forEach(dataRow => {
        dataRow.classList.remove("active");
    })
}

function searchIndex(adminData){
    const searchBox = document.getElementById("search-box");

    searchBox.addEventListener("keyup", () => {
        var value = searchBox.value;
        console.log("value :", value);
        var data = searchTable(value,adminData);
        removeExistingAdminData();
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            
            renderAdminData(data[i].id, data[i].firstName, data[i].lastName, data[i].email, data[i].phone) 
            rightSection(data);
        }
    })
}
function searchTable(value,adminData) {
    var filter = [];
    for (var i = 0; i < adminData.length; i++) {
        value = value.toLowerCase();
        var fName = adminData[i].firstName.toLowerCase();
        var lName = adminData[i].lastName.toLowerCase();
        
        if(fName.includes(value)){
            filter.push(adminData[i]);
        }
        else if(lName.includes(value)){
            filter.push(adminData[i]);
        }
    }
    return filter; 
}
function removeExistingAdminData(){
    const dataRows = document.querySelectorAll(".data-row")

    dataRows.forEach(dataRow => {
        dataRow.parentNode.removeChild(dataRow);
    })
}