$(document).ready(function () {
    let stevec;
    let kategorije=[];
    let spodnja_tabela=[];
    if(localStorage.getItem("stevec")!= null){
        stevec = JSON.parse(localStorage.getItem("stevec"));
    }else{
        stevec =0;
        localStorage.setItem('stevec', JSON.stringify(stevec));
    }

    if(localStorage.getItem("kategorije") != null){
        kategorije = JSON.parse(localStorage.getItem('kategorije'));

    }else{
       kategorije = ['Vaje', 'Treningi', 'Projekti'];
    }

    if(localStorage.getItem("spodnja_tabela") != null){
        spodnja_tabela =  localStorage.getItem("spodnja_tabela");
        spodnja_tabela = JSON.parse(spodnja_tabela);
        for (let i = 0; i < spodnja_tabela.length; i++){
        $("#bottom_table").append('<tr><td >'+spodnja_tabela[i][0]+'</td><td>'+spodnja_tabela[i][1]+'</td><td>'+spodnja_tabela[i][2]+'</td><td>'+spodnja_tabela[i][3]+'</td></tr>');
        }
    }

     for (let i = 0; i < kategorije.length; i++) {
        $("#Kategorija").append('<li "list-group-item">' + kategorije[i] + '</li>');
    }


    $("#dodaj_kategorije").click(function (){
        let value= $("#vnos_kategori").val();
        kategorije.push(value);
        $("#Kategorija").append('<li >' + value + '</li>');
        localStorage.setItem('kategorije', JSON.stringify(kategorije));


    } )
    
    $("#Kategorija").on('click', 'li', function () {
        $(this).removeClass("list-group-item");
        $("li").removeClass("list-group-item active");
        $(this).addClass("list-group-item active");
    });
    
    $("#izbrisi_kategorije").click(function (){
        let ime = $("li[class='list-group-item active']").text();
        let index=0;
        for (let i = 0; i < kategorije.length; i++) {
            if(ime == kategorije[i]) {
                kategorije.splice(i, 1)
            }
        }
        localStorage.setItem('kategorije', JSON.stringify(kategorije));
        $("li[class='list-group-item active']").remove();
    })

    $("#button_bottom_table").click(function (){
        stevec += 1;
        localStorage.setItem('stevec', JSON.stringify(stevec));
        let input = $("#vnos_spodnja_tabela").val();
        let value = $("li[class='list-group-item active']").text();
        let date_input =  new Date();
        date_input=  date_input.toISOString()
        $("#bottom_table").append('<tr><td>'+stevec+'</td><td>'+input+'</td><td>'+value+'</td><td>'+date_input+'</td></tr>');
        spodnja_tabela.push( [stevec,input,value,date_input]);
        localStorage.setItem('spodnja_tabela', JSON.stringify(spodnja_tabela));


    })

    $("#bottom_table").on("click","tr", function (){
        $(this).addClass("table-danger");
    })

    $("#remove_bottom_value").click(function (){
        //alert(st);
        let sem_st = true;
        let izpis = "";
        const listItems = document.querySelectorAll("#bottom_table tr[class='table-danger']");
        listItems.forEach(item => {
            izpis = item.textContent;
        let iskanje_num ="";
        for (let i = 0; i < 2; i++) {
            if(isNaN(izpis[i]) == false && sem_st == true) {
                iskanje_num += izpis[i];
            }else{
                sem_st = false;
            }
        }

        sem_st = true;
        for(let m =0; m < spodnja_tabela.length; m++){
            if (spodnja_tabela[m][0]==iskanje_num){
                spodnja_tabela.splice(m, 1)
            }
        }
    });
        $("#bottom_table tr[class='table-danger']").remove();
        localStorage.setItem('spodnja_tabela', JSON.stringify(spodnja_tabela));

    })
});
