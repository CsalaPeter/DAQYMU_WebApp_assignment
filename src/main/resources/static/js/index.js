$(function() {

    $('#addDvdForm').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: `/api/save`,
            data: JSON.stringify({
                fname: $("#addDvdName").val(),
                genre: $("#genreDropdown").val(),
                director: $("#addDirector").val(),
                agerating: $("#ageDropdown").val(),
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
                genre: $("#genreModDropdown").val(),
                director: $("#modDirector").val(),
                agerating: $("#ageModDropdown").val(),
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

    let gdropdown = $('#genreDropdown');
    let adropdown = $('#ageDropdown');
    let genreArr = ["Action", "Sci-fi"];
    let ageArr = ["PG", "M", "R18+"];
    let goption = '';
    let aoption = '';


    gdropdown.empty();
    adropdown.empty();
    gdropdown.append('<option disabled>Choose a Gener</option>');
    gdropdown.prop('selectedIndex', 0);
    adropdown.append('<option disabled>Choose age Rating</option>');
    adropdown.prop('selectedIndex', 0);

    for (let i = 0; i < genreArr.length; i++) {
        goption += '<option value="' + genreArr[i] + '">' + genreArr[i] + '</option>';
    }
    gdropdown.append(goption);


    for (let i = 0; i < ageArr.length; i++) {
        aoption += '<option value="' + ageArr[i] + '">' + ageArr[i] + '</option>';
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
    $('#modDvdForm #genreModDropdown').val(dvd.genre)
    $('#modDvdForm #modDirector').val(dvd.director)
    $('#modDvdForm #ageModDropdown').val(dvd.agerating)
    $('#modDvdForm #modPlaytime').val(dvd.playtime)

    let genreModDropdown = $('#genreModDropdown');
    let ageModDropdown = $('#ageModDropdown');
    let generModArr = ["Action", "Sci-fi"];
    let ageModArr = ["PG", "M", "R18+"];
    let genreOption = '';
    let ageOption = '';


    genreModDropdown.empty();
    ageModDropdown.empty();
    genreModDropdown.append('<option value="o" disabled>Choose a Gener</option>');
    ageModDropdown.append('<option value="o" disabled>Choose age Rating</option>');

    for (let i = 0; i < generModArr.length; i++) {
        genreOption += '<option value="' + generModArr[i] + '">' + generModArr[i] + '</option>';
    }
    genreModDropdown.append(genreOption);

    genreModDropdown.val("o");
    for (let i = 0; i < generModArr.length; i++) {
        if (generModArr[i] === dvd.genre) {
            genreModDropdown.val(generModArr[i])
        }
    }

    for (let i = 0; i < ageModArr.length; i++) {
        ageOption += '<option value="' + ageModArr[i] + '">' + ageModArr[i] + '</option>';
    }
    ageModDropdown.append(ageOption);

    ageModDropdown.val("o");
    for (let i = 0; i < ageModArr.length; i++) {
        if (ageModArr[i] === dvd.agerating) {
            ageModDropdown.val(ageModArr[i])
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