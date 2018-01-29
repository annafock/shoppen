//Lägg till fält med totalsumma vid första klicket
$(document).one('click', '.buy-button', function(){
$('.kundvagn tfoot').append(
`	<tr>
        <td colspan="2">Totalsumma</td>
        <td colspan="3">en summa</td>
        </tr>
        `
	);
});

$(document).on('click', '.buy-button', function(){
//var price = $(this).data().price;

// convert this a html object (the button)
// to a jquery object
var me = $(this);

// ask jquery for all data connected to me
var data = me.data();

// get the price from the data object
var price = data.price;

// the name of the product
var name = me.parents('.vara').find('h3').text();

var sum = 
//Ta bort default-info i kundvagnen
$('.kundvagn-tom').remove();



//Flytta infon till in i t-body 
var foundVara  = $('.kundvagn tr:contains("'+name+'")');

if(foundVara.length===0){
	// no vara found in the cart, create one
	$('.kundvagn tbody').append(`
		<tr>
			<td>${name}</td>
			<td><input type="number" name="amount" min="0" value="1"></td>
			<td><span class="price">${price}</span> kr</td>
			<td><span class="varusumma" value="0">${sum}</span> kr</td>
			<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td>
		</tr>
		`);
}
else {
	// vara exists already in the cart so just change amount
	//val är samma som value i html
	//val() är en getter
	//val (med något i parentesen) är en setter
	var inputEl = foundVara.find('input[name="amount"]');
	var amount = inputEl.val() / 1;
    amount++;
    inputEl.val(amount);

}

amount++;
});


//Removes item when x is clicked
$(document).on('click', '.glyphicon-remove', function(){
	var vara = $(this).parents('tr');
	$(vara).remove();

});

// Event handler for amount fields - ser till att amount ökar vid
//klick, skrivna siffror eller med piltangenterna
$(document).on('change click keyup','input[name="amount"]',function(){
	var inputEl = $(this);
	var amount = inputEl.val();
	console.log("Amount",amount)

//Hittar priset som varan på samma rad har
var foundPrice = $('.kundvagn tr:contains(".price")');

	//gör så att amount x price = summa
	var sum = foundPrice*$(amount);

	console.log("Summa", sum)

});


