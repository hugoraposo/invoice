
const caminho2 = 'hugoraposo.png';
const caminho = 'font/Gilroy-Light.otf';
var font = '';
var imagem = '';

function arquivoParaBase64(caminhoArquivo, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', caminhoArquivo, true);
  xhr.responseType = 'blob';

  xhr.onload = function () {
    const reader = new FileReader();
    reader.onloadend = function () {
      if (typeof callback === 'function') {
        callback(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(xhr.response);
  };

  xhr.send();
}

arquivoParaBase64(caminho, function (base64) {
  font = base64
});

arquivoParaBase64(caminho2, function (base64) {
 imagem = 'data:image/png;base64,'+base64
});


  var company_logo = {
    w: 120,
    h: 70
  };

  var cliente={
    nome:'Afritek Solution',
    contacto:'+258 84 387 7388',
    nuit:'B76C238B7E'
  };
  
  var fatura={
    total:'524.00',
    subtotal:'500.00',
    iva:'24.00',
    nr: '00002'
  };
    
  var detalhesImpresa={
    nome: 'AFRITEK SOLUTION',
    local: 'Manica - Chimoio',
    email: 'hugoraposo@gmail.com',
    website: 'wwww.hugoraposo.net',
    contacto: '+258 84 987 7288'

  }

  var fontSizes={
    HeadTitleFontSize:18,
    Head2TitleFontSize:16,
    TitleFontSize:14,
    SubTitleFontSize:12,
    NormalFontSize:10,
    SmallFontSize:8
  };
  var lineSpacing={
    NormalSpacing:12,
  };

  const dataDeHoje = new Date();
  const ano = dataDeHoje.getFullYear();
  const mes = ('0' + (dataDeHoje.getMonth() + 1)).slice(-2);  // O mês é baseado em zero, então adicionamos 1
  const dia = ('0' + dataDeHoje.getDate()).slice(-2);
  const dataFormatada = `${dia}/${mes}/${ano}`;

  function pdf(){
    
    var doc = new jsPDF('p', 'pt');
    var rightStartCol1=390;
    var rightStartCol2=480;
    var InitialstartX=40;
    var startX=40;
    var InitialstartY=50;
    var startY=0;
    var lineHeights=12;
    doc.setFont("helvetica");
    doc.setFontType('bold');
    doc.addImage(imagem, 'PNG',startX,startY+=50,company_logo.w,company_logo.h)// Ajuste as posições e dimensões conforme necessário


    var tempY=InitialstartY;
    doc.text(detalhesImpresa.nome,rightStartCol1,tempY+=lineSpacing.NormalSpacing);
  
    doc.setFillColor('black');
    doc.rect(380, 50, 5, 65, "F");
    doc.setFontType('normal');
    doc.setFontSize(10);

    doc.text(detalhesImpresa.local,rightStartCol1,tempY+=lineSpacing.NormalSpacing);
    doc.text(detalhesImpresa.website,rightStartCol1,tempY+=lineSpacing.NormalSpacing);
    doc.text(detalhesImpresa.email,rightStartCol1,tempY+=lineSpacing.NormalSpacing);
    doc.text(detalhesImpresa.contacto,rightStartCol1,tempY+=lineSpacing.NormalSpacing);

    doc.setFont("helvetica");
    doc.setFontType('bold');
    doc.text('FATACTURA PRO-FORMA', 40,tempY+=lineSpacing.NormalSpacing+30);
    doc.text('Factura nr: '+fatura.nr, 380,tempY+=lineSpacing.NormalSpacing-lineSpacing.NormalSpacing);
    doc.text('Emitido para:', 40,tempY+=lineSpacing.NormalSpacing+30);
    
    doc.setFontType('normal');
    doc.setFontSize(10);
    doc.text('Nome: '+cliente.nome, 40,tempY+=lineSpacing.NormalSpacing+5);
    doc.text('Data: '+dataFormatada, 40,tempY+=lineSpacing.NormalSpacing+5);
    doc.text('Nuit: '+cliente.nuit, 40,tempY+=lineSpacing.NormalSpacing+5);
    doc.text('Contacto '+cliente.contacto, 40,tempY+=lineSpacing.NormalSpacing+5);



      var header = function(data) {
        doc.setFontSize(12);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
      };
     doc.setFontSize(8);
     doc.setFontStyle('normal');
    var options = {
        beforePageContent: header,
        margin: {
          top: 50 
        },
        styles: {
          overflow: 'linebreak',
          fontSize: 11,
          rowHeight: 'auto',
          columnWidth: 'wrap'
        },
        columnStyles: {
          1: {columnWidth: 'auto'},
          2: {columnWidth: 'auto'},
          3: {columnWidth: 'auto'},
          4: {columnWidth: 'auto'}
        },
        startY: startY+=230
      };
    var columns = [
        {title: "Nr", dataKey: "Nr",width: 90},
        {title: "Item", dataKey: "Item",width: 40}, 
        {title: "Preco Unitario", dataKey: "Preco Unitario",width: 40}, 
        {title: "Qtd", dataKey: "Qtd",width: 40}, 
        {title: "TOTAL", dataKey: "TOTAL",width: 40}
    ];
    var rows = [
      {"Nr": 1, "Item": "Playstation 5 dajsd afuihf aifuha fkauhfa fiaufhoaf iafuhf", "Preco Unitario": "10","Qtd" : "12","TOTAL":"0"},
      {"Nr": 1, "Item": "Playstation 5 dajsd afuihf aifuha fkauhfa fiaufhoaf iafuhf", "Preco Unitario": "10","Qtd" : "12","TOTAL":"0"}
    ];
    doc.autoTable(columns, rows, options);
    //-------Invoice Footer---------------------
    var rightcol1=340;
    var rightcol2=430;
  
    startY=doc.autoTableEndPosY()+30;


    doc.setFontSize(fontSizes.TitleFontSize-2);
    doc.setFontType('bold');
    doc.text("Sub Total: ", rightcol1, startY+=lineSpacing.NormalSpacing+2);
    doc.setFontType('normal');
    doc.text('500.00 mt', rightcol2, startY);


    doc.setFontType('bold');
    doc.text("IVA (15%): ", rightcol1, startY+=lineSpacing.NormalSpacing+2);
    doc.setFontType('normal');
    doc.text('24.00 mt',rightcol2, startY);

    doc.setFontType('bold');
    doc.text("TOTAL: ", rightcol1, startY+=lineSpacing.NormalSpacing+2);
    doc.setFontType('bold');
    doc.text('524.00 mt',rightcol2, startY);

    doc.setFontType('bold');
    doc.text('Para '+cliente.nome+',',rightcol2, startY+=lineSpacing.NormalSpacing+25);
    doc.text('Assinatura',rightcol2, startY+=lineSpacing.NormalSpacing+30);
    //doc.save('InvoiceTemplate.pdf');

    // Converte o PDF em Blob
    const pdfBlob = doc.output('blob');

    // Cria uma URL para o Blob
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Crie um elemento de link temporário e clique nele para abrir o PDF
    const link = document.createElement('a');
    link.href = blobUrl;
    link.target = '_blank';
    link.click();
    ipcRenderer.send('gerar-pdf', { doc });
  }
