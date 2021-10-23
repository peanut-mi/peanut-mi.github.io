function divide(){
	document.write('<table border=1px>')
	for(var i=0; i<10; i++){
		document.write('<tr>');
		for(var j=1; j<=10; j++){
			var number = i*10+j;
			document.write('<td');
			if(isPrime(number)){
				document.write(' class="scolor"');
			}
			else{
				document.write(' class="bscolor"');
			}
			document.write('>'+number+'</td>')
		}
		document.write('</tr>');
	}
	document.write('</table>');
}