$(function() {

    $('#addDvdForm').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'https://localhost:8080/api/insert',
            data: JSON.stringify({
                fname: $("#addDvdName").val(),
                genre: $("#gdropdown").val(),
                director: $("#addDirector").val(),
                agerating: $("#adropdown").val(),
                playtime: $("#addPlaytime").val(),


            }),
            contentType: "application/json",
            dataType: "jsonp",
            success: function () {
                listDvds()
            },
            error: function () {
                alert("Something went wrong!");
            }
        })
    });

});

function toHome() {
    $("#description").fadeIn(900);
}

function listDvds() {
    $("#description").fadeOut(700)
    $("#addDvdForm").fadeOut(700)
    $("#listDvds").fadeIn(700)


$.getJSON('https://localhost:8080/api/list', function (data){
    let table = $('<table id="listTableDvds"></table>');
    table.append('<tr><th class="listth">Film name</th><th class="listth">Genre</th><th class="listth">Director</th><th class="listth">Age rating</th><th class="listth">Playtime</th></tr>');
    $.each(data, function (key, value){
        let row = $('<tr></tr>')
        let nameCell = $('<td class="listtd">' +value.fname+ '</td>');
        let generCell = $('<td class="listtd">' +value.genre+ '</td>');
        let directorCell = $('<td class="listtd">' +value.director+ '</td>');
        let ageCell = $('<td class="listtd">' +value.agerating+ '</td>');
        let playtimeCell = $('<td class="listtd">' +value.playtime+ '</td>');

        row.append(nameCell);
        row.append(generCell);
        row.append(directorCell);
        row.append(ageCell);
        row.append(playtimeCell);
        table.append(row)
    });
    $('#listDvds').html(table);
    });

}

function addDvd() {
    $("#description").fadeOut(700)
    $("#addDvd").fadeIn(700)
    $("#listDvds").fadeOut(700)

    let gdropdown = $('#gdropdown');
    let adropdown = $('#adropdown');
    let generarr = ["Action", "Sci-fi"];
    let agearr = ["PG", "M", "R18+"];
    let goption = '';
    let aoption = '';


    gdropdown.empty();
    adropdown.empty();
    gdropdown.append('<option disabled>Choose a Gener</option>');
    gdropdown.prop('selectedIndex', 0);
    adropdown.append('<option disabled>Choose age Rating</option>');
    adropdown.prop('selectedIndex', 0);

    for (let i=0; i<generarr.length; i++){
        goption += '<option value="'+ generarr[i] + '">' +generarr[i]+ '</option>';
    }
    $('#gdropdown').append(goption);

    for (let i=0; i<agearr.length; i++){
        aoption  += '<option value="'+ agearr[i] + '">' +agearr[i]+ '</option>';
    }
    $('#adropdown').append(aoption );
}