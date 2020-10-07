'use strict';
var info = ['Device name', 'Category', 'Quantity', 'Unite Price'];
var allData = [];
function Item(itemName, category, quantity) {
    this.itemName = itemName;
    this.category = category;
    this.quantity = quantity;
    this.minPrice = 350;
    this.maxPrice = 750;
    this.randomeNumber = 0;
    this.total = 0;
    allData.push(this);
}

Item.prototype.GetRandomeNumber = function () {
    this.randomeNumber = Math.ceil(getRandomInt(this.minPrice, this.maxPrice));
}

Item.prototype.getTotal = function () {
    for (var r = 0; r < allData.length; r++) {
        this.total+= this.randomeNumber;
    }
}


var formEl = document.getElementById('form');
formEl.addEventListener('submit', addDevice);
function addDevice(event) {
    event.preventDefault();
    var item = event.target.itemName.value;
    var categ = event.target.category.value;
    var quant = event.target.quantity.value;
    console.log(item, categ, quant);
    var allItem = new Item(item, categ, quant);
    allItem.GetRandomeNumber();
    allItem.renderParag();
    allItem.tableData();
    console.log(allItem);
    localStorage.setItem('data', JSON.stringify(allData));

}

var tableEl = document.getElementById('table');
function tableHeader() {
    var trEl1 = document.createElement('tr');
    tableEl.appendChild(trEl1);
    for (var i = 0; i < info.length; i++) {
        var tdEl = document.createElement('td');
        trEl1.appendChild(tdEl);
        tdEl.innerHTML = `${info[i]}`
    }

}
tableHeader();
Item.prototype.tableData = function () {
    var trEl2 = document.createElement('tr');
    tableEl.appendChild(trEl2);
    var tdEl1 = document.createElement('td');
    trEl2.appendChild(tdEl1);
    tdEl1.innerHTML = `${this.itemName}`;
    var tdEl2 = document.createElement('td');
    trEl2.appendChild(tdEl2);
    tdEl2.innerHTML = `${this.category}`;
    var tdEl3 = document.createElement('td');
    trEl2.appendChild(tdEl3);
    tdEl3.innerHTML = `${this.quantity}`;
    var tdEl4 = document.createElement('td');
    trEl2.appendChild(tdEl4);
    tdEl4.innerHTML = `${this.randomeNumber}`;

}
Item.prototype.renderParag = function() {
    var sectionEl = document.getElementById('paragraph');
    var h2El = document.createElement('h2')
    sectionEl.appendChild(h2El);
    h2El.innerHTML = `${this.total}`;

}


if (localStorage.getItem('data')) {
    var retuData = JSON.parse(localStorage.getItem('data'));
    for (var m = 0; m < retuData.length; m++) {
        new Item(retuData[m].itemName, retuData[m].category, retuData[m].quantity);
    }
}
for (var s = 0; s < allData.length; s++) {
    allData[s].GetRandomeNumber();
    allData[s].tableData();
}


//helper function.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}