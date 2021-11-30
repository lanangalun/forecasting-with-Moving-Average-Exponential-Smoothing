function compare(data,n,n2){
  
  
  var Lakhir =  nilaiL(data) 
  var finalMA = MA(data,Lakhir,n)  
  var finalMA2 = MA2(data,Lakhir,n2)
  var finalSES = SES(data,Lakhir)
  var finalSES2 = SES2(data,Lakhir)
  
	

  var rows = "";
  rows +=
    "<tr><td>" +
    "Moving Average n = " + n +
   "</td><td>" +
    finalMA[0] +
    "</td><td>" +
    finalMA[1] +
    "</td><td>" +
    "" +
    "</td><td>" +
    Lakhir +
    "</td></tr>";
  $(rows).appendTo("#list tbody");

  var rows = "";
  rows +=
    "<tr><td>" +
    "Moving Average n = " + n2 +
   "</td><td>" +
    finalMA2[0] +
    "</td><td>" +
    finalMA2[1] +
    "</td><td>" +
    "" +
    "</td><td>" +
    Lakhir +
    "</td></tr>";
  $(rows).appendTo("#list tbody");

  var rows = "";
  rows +=
    "<tr><td>" +
    "Exponential Smoothing A" +
   "</td><td>" +
    finalSES[0] +
    "</td><td>" +
    finalSES[1] +
    "</td><td>" +
    finalSES[2] +
    "</td><td>"+
    Lakhir +
    "</td></tr>";
  $(rows).appendTo("#list tbody");

  var rows = "";
  rows +=
    "<tr><td>" +
    "Exponential Smoothing B" +
   "</td><td>" +
    finalSES2[0] +
    "</td><td>" +
    finalSES2[1] +
    "</td><td>" +
    finalSES2[2] +
    "</td><td>"+
    Lakhir +
    "</td></tr>";
  $(rows).appendTo("#list tbody");

 if(finalMA[0]<finalSES[0]&&finalMA[0]<finalSES2[0]&&finalMA[0]<finalMA2[0]){
  var rows = "";
  rows +=
    "<tr><td>" +
    "" +
    "</td><td>" +
    "Metode Terbaik Adalah" +
    "</td><td>" +
    "Moving Average dengan n = " + n +
    "</td></tr>";
  $(rows).appendTo("#list tbody");
  }
  else if(finalMA2[0]<finalSES[0]&&finalMA2[0]<finalSES2[0]&&finalMA2[0]<finalMA[0]){
    var rows = "";
  rows +=
    "<tr><td>" +
    "" +
    "</td><td>" +
    "Metode Terbaik Adalah" +
    "</td><td>" +
    "Moving Average dengan n = " + n2 +
    "</td></tr>";
  $(rows).appendTo("#list tbody");
  }
  else if(finalSES[0]<finalMA[0]&&finalSES[0]<finalSES2[0]&&finalSES[0]<finalMA2[0]){
    var rows = "";
  rows +=
    "<tr><td>" +
    "" +
    "</td><td>" +
    "Metode Terbaik Adalah" +
    "</td><td>" +
    "Exponential Smoothing A" +
    "</td></tr>";
  $(rows).appendTo("#list tbody");
  
  }
  else {
    var rows = "";
  rows +=
    "<tr><td>" +
    "" +
    "</td><td>" +
    "Metode Terbaik Adalah" +
    "</td><td>" +
    "Exponential Smoothing B" +
    "</td></tr>";
  $(rows).appendTo("#list tbody");
  
  }

  
}

function MA(data,L,n){

 
  var dataStasioner = stasioner(data,L);
  console.log(dataStasioner)

  var testing = testingMA(data,dataStasioner,n);
  
  var nilaiPrediksi = testing[testing.length-1]
  testing.pop()

  var nilaiMSE = mseMA(dataStasioner,testing)

  nilaiMSE.pop()

  var jumlahNilai = jumlahMSE(nilaiMSE)
  

  var hasilakhir = [0]
  hasilakhir[0] = jumlahNilai
  hasilakhir[1] = Math.ceil(nilaiPrediksi)+data[data.length-L][0]
  
 

  

  return hasilakhir
}

function MA2(data,L,n2){

 
  var dataStasioner = stasioner(data,L);
  

  var testing = testingMA(data,dataStasioner,n2);

  var nilaiPrediksi = testing[testing.length-1]
  testing.pop()

  var nilaiMSE = mseMA(dataStasioner,testing)
  
  nilaiMSE.pop()

  var jumlahNilai = jumlahMSE(nilaiMSE)
 

  var hasilakhir = [0]
  hasilakhir[0] = jumlahNilai
  hasilakhir[1] = Math.ceil(nilaiPrediksi)+data[data.length-L][0]
  
 

  
  

  return hasilakhir
}

function SES(data,L){

 
  var dataStasioner2 = stasioner(data,L);
  

var jumlahTraining = [0]
for (var i = 1 ; i<100 ; i++){

  var training = trainingSES(data,i/100,dataStasioner2,L);

  var nilaiTraining = mseTraining(dataStasioner2,training)

  jumlahTraining[i-1] = jumlahMSE(nilaiTraining)
  
  }

  var nilaiAlpha = Math.min.apply(null,jumlahTraining)
  var bestAlpha = (jumlahTraining.indexOf(nilaiAlpha)+1)/100
  
  var testing2 = testingSES(data,bestAlpha,dataStasioner2);
  

  var nilaiPrediksi2 = testing2[testing2.length-1]
  testing2.pop()

  var nilaiMSE2 = mseMA(dataStasioner2,testing2)
 
  nilaiMSE2.pop()

  var jumlahNilai2 = jumlahMSE(nilaiMSE2)
 

  var hasilakhir2 = [0]
  hasilakhir2[0] = jumlahNilai2
  hasilakhir2[1] = Math.ceil(nilaiPrediksi2)+data[data.length-L][0]
  hasilakhir2[2] = bestAlpha
  hasilakhir2[3] = nilaiAlpha

 

 
  

  return hasilakhir2
}

function SES2(data,L){

  
  var dataStasioner2 = stasioner(data,L);


var jumlahTraining = [0]
for (var i = 1 ; i<100 ; i++){

  var training = trainingSES2(data,i/100,dataStasioner2,L);

  var nilaiTraining = mseTraining(dataStasioner2,training)

  jumlahTraining[i-1] = jumlahMSE(nilaiTraining)
  
  }

  var nilaiAlpha = Math.min.apply(null,jumlahTraining)
  var bestAlpha = (jumlahTraining.indexOf(nilaiAlpha)+1)/100
  
  var testing2 = testingSES2(data,bestAlpha,dataStasioner2,L);
 

  var nilaiPrediksi2 = testing2[testing2.length-1]
  testing2.pop()

  var nilaiMSE2 = mseMA(dataStasioner2,testing2)
  
  nilaiMSE2.pop()

  var jumlahNilai2 = jumlahMSE(nilaiMSE2)
  

  var hasilakhir2 = [0]
  hasilakhir2[0] = jumlahNilai2
  hasilakhir2[1] = Math.ceil(nilaiPrediksi2)+data[data.length-L][0]
  hasilakhir2[2] = bestAlpha
  hasilakhir2[3] = nilaiAlpha
  

  
  

  return hasilakhir2
}

function copyD(d) {
  var copyData = new Array();
  for (var i = 0; i < d.length; i++) {
    copyData[i] = [];
    for (var j = 0; j < d[0].length; j++) {
      copyData[i][j] = d[i][j];
    }
  }
  return copyData;
}

function stasioner(data,L){
  var dataStasioner = [0]
      for (var i = 0; i < data.length-L; i++) {
    dataStasioner[i] = data[i+L]-data[i]
    
  }
  return dataStasioner
}

function testingMA(data,dataStasioner,n){
  
  var jumlahtesting = Math.round(data.length*2/10)
  
  var dsTesting = dataStasioner
  
  var hasilMA = [0]
  var count = 0
  dsTesting[dataStasioner.length-(jumlahtesting+1)] = dataStasioner[0];
 
  for (var i = dataStasioner.length-(jumlahtesting-(n-2)); i < dataStasioner.length; i++) {
    
    for(var j = 0; j<n ; j++){
      hasilMA[count] = hasilMA[count] + dsTesting[i-j]
    }
     
    hasilMA[count] = hasilMA[count]/n
    count = count+1
    hasilMA[count] = 0
  }
   hasilMA.pop()

  
  return hasilMA
}

function mseMA(dataStasioner,testing){
  var hasilMA = [0]
  hasilMA[testing.length] = 0
 
 for(var i = 0; i<testing.length ; i++){
      hasilMA[i] = dataStasioner[(dataStasioner.length-testing.length)+i] - testing[i]
      hasilMA[i] = hasilMA[i]*hasilMA[i]
      hasilMA[testing.length] = hasilMA[testing.length] + hasilMA[i]
    }

    hasilMA[testing.length] = hasilMA[testing.length]/testing.length
    return hasilMA
}

function testingSES(data,alpha,dataStasioner){
  var jumlahtesting = Math.round(data.length*2/10)
  
  var dsTesting = dataStasioner
  
  var hasilSES = [0]
  var count = 0
  dsTesting[dataStasioner.length-(jumlahtesting+1)] = dataStasioner[0];
 
 for (var i = dataStasioner.length-(jumlahtesting+1); i < dataStasioner.length; i++) {
    if(i==dataStasioner.length-(jumlahtesting+1)){
      hasilSES[count] = (dsTesting[i]*alpha)+((1-alpha)*dsTesting[i])
      count = count + 1
    }
    else {
      hasilSES[count] = (dsTesting[i]*alpha)+((1-alpha)*hasilSES[count-1])
      count = count + 1
    }
  }

  return hasilSES
}

function testingSES2(data,alpha,dataStasioner,L){
  var jumlahtesting = Math.round(data.length*2/10)
  
  var dsTesting = dataStasioner
  
  var hasilSES = [0]
  var count = 0
  var nilaiAwal = 0
  dsTesting[dataStasioner.length-(jumlahtesting+1)] = dataStasioner[0];
 

 for (var i = 0 ; i < L; i++) {
    nilaiAwal = nilaiAwal + dataStasioner[i]
   

 }
 nilaiAwal = nilaiAwal/L

 for (var i = dataStasioner.length-(jumlahtesting+1); i < dataStasioner.length; i++) {
    if(i==dataStasioner.length-(jumlahtesting+1)){
      hasilSES[count] = (dsTesting[i]*alpha)+((1-alpha)*nilaiAwal)
      count = count + 1
    }
    else {
      hasilSES[count] = (dsTesting[i]*alpha)+((1-alpha)*hasilSES[count-1])
      count = count + 1
    }
  }

  return hasilSES
}

function jumlahMSE(nilaiMSE){
  var jumlahMSE = 0
  for(var i = 0; i< nilaiMSE.length ; i++){
      jumlahMSE = jumlahMSE + nilaiMSE[i]
    }
    jumlahMSE = jumlahMSE/nilaiMSE.length
    return jumlahMSE
}


function trainingSES(data,alpha,dataStasioner){
  var jumlahtesting = Math.round(data.length*2/10)
  
  var dsTesting = dataStasioner
  
  var hasilSES = [0]
  var count = 0
  
 
 for (var i = 1 ; i < dataStasioner.length-(jumlahtesting); i++) {
    if(i==1){
      hasilSES[count] = (dsTesting[i-1]*alpha)+((1-alpha)*dsTesting[i-1])
      count = count + 1
      
    }
    else {
      hasilSES[count] = (dsTesting[i-1]*alpha)+((1-alpha)*hasilSES[count-1])
      count = count + 1
    }
  }

  return hasilSES
}

function trainingSES2(data,alpha,dataStasioner,L){
  var jumlahtesting = Math.round(data.length*2/10)
  
  var dsTesting = dataStasioner
  
  var hasilSES = [0]
  var count = 0
  var nilaiAwal = 0

 for (var i = 0 ; i < L; i++) {
    nilaiAwal = nilaiAwal + dataStasioner[i]
 }
 nilaiAwal = nilaiAwal/L

 for (var i = 1 ; i < dataStasioner.length-(jumlahtesting); i++) {
    if(i==1){
      hasilSES[count] = (dsTesting[i-1]*alpha)+((1-alpha)*nilaiAwal)
      count = count + 1
      
    }
    else {
      hasilSES[count] = (dsTesting[i-1]*alpha)+((1-alpha)*hasilSES[count-1])
      count = count + 1
    }
  }

  return hasilSES
}

function mseTraining(dataStasioner,testing){
  var hasilMA = [0]
  hasilMA[testing.length] = 0

 for(var i = 0; i<testing.length ; i++){
      hasilMA[i] = dataStasioner[i+1] - testing[i]
      hasilMA[i] = hasilMA[i]*hasilMA[i]
      hasilMA[testing.length] = hasilMA[testing.length] + hasilMA[i]
    }

    hasilMA[testing.length] = hasilMA[testing.length]/testing.length
    return hasilMA
}

function nilaiL(data){

	function sortNumber(a, b) {
  		return a - b;
	}

  var dataolah = data.slice()
  dataolah = dataolah.sort(sortNumber)
  lsementara = dataolah[0][0]
  var counterl = 0
  var jarakl = [0]
  var hasill = 2
  var arrayl = [0]
  var arrayl2 = [0]
  for(var i = 0; i<data.length ; i++){
      if(data[i]==lsementara){
      	jarakl[counterl]=i
      	counterl = counterl + 1
      }
    }

      counterl = 0
     
     


    if(jarakl[2]!=null){
    	for(var i = 0; i<jarakl.length-1 ; i++){
      jarakl[i] = jarakl[i+1]-jarakl[i]
    }
    
    jarakl.pop()
    jarakl = jarakl.sort(sortNumber)
    

    for(var i = 0; i<jarakl.length-1 ; i++){
      if(jarakl[i]==jarakl[i+1]){
      	arrayl[counterl] = arrayl[counterl]+ jarakl[i]
      }
      else{
      	arrayl[counterl] = arrayl[counterl]+ jarakl[i]
      	arrayl2[counterl] = jarakl[i]
      	counterl = counterl+1
      	arrayl[counterl] = 0
      }
    }

    arrayl.pop()
    hasill = 0
    hasilltemp = 0
    for(var i = 0; i<arrayl.length ; i++){
      arrayl[i]= arrayl[i]/arrayl2[i]
    }
    for(var i = 0; i<arrayl.length ; i++){
      if(arrayl[i]>=hasilltemp){
      	hasill = arrayl2[i]
      	hasilltemp =arrayl[i]
      	
     	 }   
       } 
       }
       else if(jarakl[2]==null&&jarakl[1]!=0){
       	hasill = jarakl[1]-jarakl[0]

       }
  

  return hasill
}