interface Registration {
    Sl: number;
    pName: string;
    eMail: string;
    dRegistrationDate: string;
    CourseName: string;
    iFees: number;
    sStatus: string; 
    vCourseName: string;
}

interface Personeel {
    SL: number;
    pName: string;
}

interface Announcement {
    SL: number;
    CourseSL: number;
}

let registrations: Registration[] = [];

$(function () {
    loadRegistrations();
    loadDropdowns();

    $("#registrationForm").on("submit", (e: JQuery.Event) => {
        e.preventDefault();
        const registration: any = {
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
            ($("#registrationForm")[0] as HTMLFormElement).reset();
        }).fail((xhr, status, error) => {
            console.log("Error: " + error + ", Status: " + status + ", Details: " + xhr.responseText);
        });
    });

    $("#search").on("input", () => {
        const query: string | null = $("#search").val() as string | null;
        console.log("Search query:", query); 
        filterTable(query ? query.toLowerCase() : "");
    });

    function filterTable(query: string): void {
        const filtered: Registration[] = registrations.filter((reg: Registration) =>
            (reg.pName?.toLowerCase() || "").includes(query) || (reg.eMail?.toLowerCase() || "").includes(query)
        );
        renderTable(filtered);
    }
});

function loadRegistrations(): void {
    $.get("/api/registrations", (data: Registration[]) => {
        registrations = data;
        renderTable(data);
    });
}

function renderTable(data: Registration[]): void {
    const tbody: JQuery<HTMLElement> = $("#registrationTable");
    tbody.empty();
    data.forEach((reg: Registration) => {
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

function filterTable(query: string): void {
    const filtered: Registration[] = registrations.filter((reg: Registration) =>
        reg.pName.toLowerCase().includes(query) || reg.eMail.toLowerCase().includes(query)
    );
    renderTable(filtered);
}

function loadDropdowns(): void {
    $.get("/api/personeel", (data: Personeel[]) => {
        const select: JQuery<HTMLElement> = $("#iPersoneelSL");
        select.empty();
        data.forEach((item: Personeel) => {
            select.append(`<option value="${item.SL}">${item.pName}</option>`);
        });
    });
    $.get("/api/announcements", (data: Announcement[]) => {
        const select: JQuery<HTMLElement> = $("#iAnnouncementSL");
        select.empty();
        data.forEach((item: Announcement) => {
            select.append(`<option value="${item.SL}">${item.CourseSL}</option>`);
        });
    });
}

function confirmPayment(id: number): void {
    $.ajax({
        url: `/api/payments/${id}`,
        type: "PUT",
        contentType: "application/json",
        success: () => loadRegistrations()
    });
}

function sortTable(column: string): void {
    $.get(`/api/registrations?sort=${column}`, (data: Registration[]) => {
        registrations = data;
        renderTable(data);
    });
}