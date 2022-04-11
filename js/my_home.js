let AddressBookApp;
var localstoragedata = localStorage.getItem('AddressBookApp');
window.addEventListener('DOMContentLoaded', (event) => {
   
    getDataFromLocalStorage();
    
})

function processEmployeePayrollDataResponse() {
    document.querySelector('.emp-count').textContent = AddressBookApp.length;
    createInnerHtml();
    localStorage.removeItem("edit-emp");
}

const getDataFromLocalStorage = () => {
    console.log('getDataFromLocalStorage');
    AddressBookApp = localstoragedata ? JSON.parse(localstoragedata) : [];
    processEmployeePayrollDataResponse();
}



function handleSelectChange(event) {
    var filter = event.target.value;
    table = document.getElementById("display");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
    
}
function handleStateChange(event) {
    var filter = event.target.value;
    table = document.getElementById("display");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
    
}
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("display");
    switching = true;
    dir = "asc"; 
    while (switching) {
      switching = false;
      rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;      
        } 
        else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";switching = true;
                
            }
        }
    }
}
const createInnerHtml = () => {
    const headerHtml = "<tr><th>Name</th><th>Phone Number</th>" +
        "<th >City</th><th>State</th><th>Address</th><th>Zipcode</th><th>Actions</th></tr>";
    let databinding = `${headerHtml}`;
    for (var empPayrollData of AddressBookApp) {
        databinding = `${databinding}
        <tr>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._phone}</td>
            <td>${empPayrollData._city}</td>
            <td>${empPayrollData._state}</td>
            <td>${empPayrollData._address}</td>
            <td>${empPayrollData._zipcode}</td>
            <td>
                <img id ="${empPayrollData.id}" src="../assets/icons/delete-black-18dp.svg" alt="Delete" onClick=remove(this)>
                <img id ="${empPayrollData.id}" src="../assets/icons/create-black-18dp.svg" alt="Edit" onClick=update(this)>
            </td>
        </tr>`
            ;
    }
    document.querySelector('#display').innerHTML = databinding;
}


const remove = (data) => {

    let employeeData = AddressBookApp.find(empData => empData.id == data.id);
    if (!employeeData) {
        return;
    }
    const index = AddressBookApp.map(empData => empData.id).indexOf(employeeData.id);
    if (site_properties.use_local_storage.match("true")) {
        AddressBookApp.splice(index, 1);
        localStorage.setItem('AddressBookApp', JSON.stringify(AddressBookApp));
        document.querySelector('.emp-count').textContent = AddressBookApp.length;
        createInnerHtml();
    } else {
        const deleteUrl = site_properties.server_url + employeeData.id.toString();
        makeServiceCall("DELETE", deleteUrl, true)
            .then(response => {
                console.log(response)
                document.querySelector(".emp-count").textContent = AddressBookApp.length;
                createInnerHtml();
            })
            .catch(error => {
                alert("Error while deleting " + error)
            })
    }

}
const update = (data) => {

    let employeeData = AddressBookApp.find(empData => empData.id == data.id);
    if (!employeeData) {
        return;
    }
    else{
        localStorage.setItem('edit-emp', JSON.stringify(employeeData));
        window.location.replace(site_properties.add_employee_page);
    }
}