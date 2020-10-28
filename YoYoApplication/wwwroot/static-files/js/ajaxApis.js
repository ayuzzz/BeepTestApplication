var baseDataUrl = 'https://localhost:44315/api/Shuttle/GetShuttleDetails';
var playerDataUrl = 'https://localhost:44315/api/Shuttle/GetPlayerDetails';


function makeAjaxCall(url) {
    return $.ajax({
        url: url,
        type: 'GET',
        data: {},
        success: function (data) {
            return data;
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(errorMessage);
        }
    });
}

async function getBasedata() {
    var basedata = await makeAjaxCall(baseDataUrl);
    return basedata;
}

async function getPlayerData() {
    var playerData = await makeAjaxCall(playerDataUrl);
    return playerData;
}