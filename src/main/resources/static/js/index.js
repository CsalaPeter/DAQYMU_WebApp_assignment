$(function() {

    $('#addDvdForm').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: `/api/save`,
            data: JSON.stringify({
                fname: $("#addDvdName").val(),
                genre: $("#gdropdown").val(),
                director: $("#addDirector").val(),
                agerating: $("#adropdown").val(),
                playtime: $("#addPlaytime").val(),

            }),
            contentType: "application/json",
            success: function () {
                listDvds()
            },
            error: function () {
                alert("Something went wrong!");
            }
        })
    });

    $('#modDvdForm').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: `/api/save`,
            data: JSON.stringify({
                id: $("#dvdId").val(),
                fname: $("#modDvdName").val(),
                genre: $("#gmoddropdown").val(),
                director: $("#modDirector").val(),
                agerating: $("#amoddropdown").val(),
                playtime: $("#modPlaytime").val(),

            }),
            contentType: "application/json",
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
    $("#description").fadeIn(900)
    $("#addDvd").fadeOut(700)
    $("#modDvd").fadeOut(700)
    $("#listDvds").fadeOut(700)
}

function listDvds() {
    $("#description").fadeOut(700)
    $("#addDvd").fadeOut(700)
    $("#modDvd").fadeOut(700)
    $("#listDvds").fadeIn(700)


$.getJSON('/api/list', function (data) {
    let table = $('<table id="listTableDvds"></table>');
    table.append('<tr><th class="listth">Modify</th><th class="listth">Delete</th><th class="listth">ID</th><th class="listth">Film name</th><th class="listth">Genre</th><th class="listth">Director</th><th class="listth">Age rating</th><th class="listth">Playtime</th></tr>');
    $.each(data, function (key, value) {
        let row = $('<tr></tr>')
        let modButton = $("<td class='listtd'><button onclick='modifyDvd(" + JSON.stringify(value) + ")'>Modify</button></td>");
        let delButton = $('<td class="listtd"><button onclick="deleteDvd(\'' + value.id + '\')">Delete</button></td>');
        let idCell = $('<td class="listtd">' + value.id + '</td>');
        let nameCell = $('<td class="listtd">' + value.fname + '</td>');
        let generCell = $('<td class="listtd">' + value.genre + '</td>');
        let directorCell = $('<td class="listtd">' + value.director + '</td>');
        let ageCell = $('<td class="listtd">' + value.agerating + '</td>');
        let playtimeCell = $('<td class="listtd">' + value.playtime + '</td>');

        row.append(modButton);
        row.append(delButton);
        row.append(idCell);
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
    $("#modDvd").fadeOut(700)

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

    for (let i = 0; i < generarr.length; i++) {
        goption += '<option value="' + generarr[i] + '">' + generarr[i] + '</option>';
    }
    gdropdown.append(goption);


    for (let i = 0; i < agearr.length; i++) {
        aoption += '<option value="' + agearr[i] + '">' + agearr[i] + '</option>';
    }
    adropdown.append(aoption);
}

function modDvd() {
    $("#description").fadeOut(700)
    $("#addDvd").fadeOut(700)
    $("#listDvds").fadeOut(700)
    $("#modDvd").fadeIn(700)

}

function modifyDvd(dvd) {
    modDvd()
    $('#modDvdForm #dvdId').val(dvd.id)
    $('#modDvdForm #modDvdName').val(dvd.fname)
    $('#modDvdForm #gmoddropdown').val(dvd.genre)
    $('#modDvdForm #modDirector').val(dvd.director)
    $('#modDvdForm #amoddropdown').val(dvd.agerating)
    $('#modDvdForm #modPlaytime').val(dvd.playtime)

    let gmoddropdown = $('#gmoddropdown');
    let amoddropdown = $('#amoddropdown');
    let mgenerarr = ["Action", "Sci-fi"];
    let magearr = ["PG", "M", "R18+"];
    let goption = '';
    let aoption = '';


    gmoddropdown.empty();
    amoddropdown.empty();
    gmoddropdown.append('<option value="o" disabled>Choose a Gener</option>');
    amoddropdown.append('<option value="o" disabled>Choose age Rating</option>');

    for (let i = 0; i < mgenerarr.length; i++) {
        goption += '<option value="' + mgenerarr[i] + '">' + mgenerarr[i] + '</option>';
    }
    gmoddropdown.append(goption);

    gmoddropdown.val("o");
    for (let i = 0; i < mgenerarr.length; i++) {
        if (mgenerarr[i] === dvd.genre) {
            gmoddropdown.val(mgenerarr[i])
            console.log(gmoddropdown.val())
        }
    }

    for (let i = 0; i < magearr.length; i++) {
        aoption += '<option value="' + magearr[i] + '">' + magearr[i] + '</option>';
    }
    amoddropdown.append(aoption);

    amoddropdown.val("o");
    for (let i = 0; i < magearr.length; i++) {
        if (magearr[i] === dvd.agerating) {
            amoddropdown.val(magearr[i])
            console.log(amoddropdown.val())
        }
    }
}

function deleteDvd(id) {
    $.ajax({
        url: '/api/delete/' + id,
        type: 'delete',
        contentType: "application/json",
        success: function () {
            listDvds();
        },
        error: function () {
            alert("Something went wrong!")
        }

    });
}