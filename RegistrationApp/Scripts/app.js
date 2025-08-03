let registrations = [];
$(function () {
    loadRegistrations();
    loadDropdowns();
    $("#registrationForm").on("submit", (e) => {
        e.preventDefault();
        const registration = {
            iPersoneelSL: $("#iPersoneelSL").val(),
            iAnnouncementSL: $("#iAnnouncementSL").val(),
            vCourseName: $("#vCourseName").val(),
            iFees: $("#iFees").val(),
            sPaymentMethod: $("#sPaymentMethod").val(),
            vPaymentType: $("#vPaymentType").val(),
            vTrxID: $("#vTrxID").val(),
            sStatus: "Pending",
            dRegistrationDate: new Date().toISOString()
        };
        $.post("/api/registrations", registration, () => {
            loadRegistrations();
            $("#registrationForm")[0].reset();
        }).fail((xhr, status, error) => {
            console.log("Error: " + error + ", Status: " + status + ", Details: " + xhr.responseText);
        });
    });
    $("#search").on("input", () => {
        const query = $("#search").val();
        console.log("Search query:", query);
        filterTable(query ? query.toLowerCase() : "");
    });
    function filterTable(query) {
        const filtered = registrations.filter((reg) => { var _a, _b; return (((_a = reg.pName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "").includes(query) || (((_b = reg.eMail) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "").includes(query); });
        renderTable(filtered);
    }
});
function loadRegistrations() {
    $.get("/api/registrations", (data) => {
        registrations = data;
        renderTable(data);
    });
}
function renderTable(data) {
    const tbody = $("#registrationTable");
    tbody.empty();
    data.forEach((reg) => {
        tbody.append(`
            <tr>
                <td>${reg.Sl}</td>
                <td>${reg.pName}</td>
                <td>${reg.eMail}</td>
                <td>${reg.dRegistrationDate}</td>
                <td>${reg.vCourseName || reg.CourseName || 'N/A'}</td>
                <td>${reg.iFees}</td>
                <td>${reg.sStatus}</td>
                <td><button class="btn btn-success" onclick="confirmPayment(${reg.Sl})">Confirm Payment</button></td>
            </tr>
        `);
    });
}
function filterTable(query) {
    const filtered = registrations.filter((reg) => reg.pName.toLowerCase().includes(query) || reg.eMail.toLowerCase().includes(query));
    renderTable(filtered);
}
function loadDropdowns() {
    $.get("/api/personeel", (data) => {
        const select = $("#iPersoneelSL");
        select.empty();
        data.forEach((item) => {
            select.append(`<option value="${item.SL}">${item.pName}</option>`);
        });
    });
    $.get("/api/announcements", (data) => {
        const select = $("#iAnnouncementSL");
        select.empty();
        data.forEach((item) => {
            select.append(`<option value="${item.SL}">${item.CourseSL}</option>`);
        });
    });
}
function confirmPayment(id) {
    $.ajax({
        url: `/api/payments/${id}`,
        type: "PUT",
        contentType: "application/json",
        success: () => loadRegistrations()
    });
}
function sortTable(column) {
    $.get(`/api/registrations?sort=${column}`, (data) => {
        registrations = data;
        renderTable(data);
    });
}
//# sourceMappingURL=app.js.map