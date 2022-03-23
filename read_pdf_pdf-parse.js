class LoadValue{
    constructor(id_load, load_date, validity_date, loaded_value, used_value, balance_value){
        this.id_load = id_load;
        this.load_date = load_date;
        this.validity_date = validity_date;
        this.loaded_value = loaded_value;
        this.used_value = used_value;
        this.balance_value = balance_value;
    }
}

class Card {
    constructor(){
        this.card_id = null;
        this.loads = [];
    }
}

class Company{
    constructor(){
        this.company_id = null;
        this.company_name = null;
        this.cards = [];
    }
}

var str_local_file = "/home/dagoberto/Documentos/CENTRAL_VT/pdf_reader_vt/53867.pdf";
var company = new Company();

read_pdf_balance_value(str_local_file);

function read_pdf_balance_value (str_local_file){
    console.log(str_local_file);
    const fs = require('fs');
    const pdf = require('pdf-parse');
    const { isNumberObject } = require('util/types');

    let dataBuffer = fs.readFileSync(str_local_file);
    
    pdf(dataBuffer).then(function(data) {
        
        if (data.text.indexOf('Saldo  Atual  de  Cartões  por  Titular') != -1){
            var remove_head_1 = /\n\nVersao \d.\d.\d.\d     Página: \d{1,5}/g;
            var remove_head_2 = /\nSaldo  Atual  de  Cartões  por  Titular\nData:  \d\d\/\d\d\/\d\d\d\d  -  \d\d:\d\d:\d\dCITBE\nANALÍTICO\n/g;
            var remove_head_3 = /\(Cargas  com  fim  de  validade  >=  \d\d\/\d\d\/\d\d\d\d\)|\(Cargas  com  fim  de  validade  >=  \)\n/g;
            data.text = data.text.replace(remove_head_1, '');
            data.text = data.text.replace(remove_head_2, '');
            data.text = data.text.replace(remove_head_3, '');
            company.company_id = data.text.slice(10, 20);
            company.company_name = data.text.slice(21, data.text.indexOf('Tipo  de  Utilização'));
            data.text = data.text.slice(data.text.indexOf('Cartão:'), data.text.length-1);
            var i = 0;
                
            while (!isNaN(data.text.slice(7, 21))){
                company.cards.push(new Card);
                company.cards[i].card_id = data.text.slice(7, 21);
                data.text = data.text.slice(data.text.indexOf('UtilizadoSaldoInício  Validade') + 31, 
                                                data.text.length - 1);
                
                while(!isNaN(data.text.slice(0, 5))){
                    var values = build_charge_value(data.text.slice(0, data.text.indexOf('\n')));
                    company.cards[i].loads.push(new LoadValue(values.id_load, values.load_date, values.validity_date, 
                        values.loaded_value, values.used_value, values.balance_value));
                    data.text = data.text.slice(data.text.indexOf('\n')+1, data.text.length-1);
                }
                if (data.text.indexOf('Cartão:') != -1){
                    data.text = data.text.slice(data.text.indexOf('Cartão:'), data.text.length-1);
                    i++;
                }
                else{
                    break;
                }
            }
            dt = JSON.stringify(company);
            fs.writeFileSync(`${company.company_id}.json`, dt);
            console.log('arquivo gerado com sucesso!')
            return true;
        }
        else{
            return false;
        }
        
    });
}

function build_charge_value(slice_str){
    
    id_load = parseInt(slice_str.slice(0, 5));
    load_date = slice_str.slice(5, 15);
    validity_date = slice_str.slice(35, 45);
    slice_str = slice_str.slice(45, slice_str.length);
    loaded_value = parseFloat(slice_str.slice(0, slice_str.indexOf(',') + 3).replace(',', '.'));
    slice_str = slice_str.slice(slice_str.indexOf(',') + 3, slice_str.length);
    used_value = parseFloat(slice_str.slice(0, slice_str.indexOf(',') + 3).replace(',', '.'));
    slice_str = slice_str.slice(slice_str.indexOf(',') + 3, slice_str.length);
    balance_value = parseFloat(slice_str.slice(0, slice_str.length).replace(',', '.'));
        
    return {id_load, load_date, validity_date, loaded_value, used_value, balance_value};
}