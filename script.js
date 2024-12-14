const rows = [];

// Set current date
function setCurrentDate() {
    const dateInput = document.getElementById('date');
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    dateInput.value = formattedDate;
}

// Clear form
function clearForm() {
    const form = document.querySelector('form');
    form.reset();
    setCurrentDate();
}

// Add Row
document.getElementById('addRowBtn').addEventListener('click', function () {
    const form = document.querySelector('form');
    const formData = new FormData(form);

    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    rows.push(formObject);
    alert('Row added successfully! You can now add more rows or export.');
    form.reset();
    setCurrentDate();
});

// Export to Excel
document.getElementById('exportBtn').addEventListener('click', function () {
    if (rows.length === 0) {
        alert('No data to export. Add some rows first.');
        return;
    }

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Form Data');

    XLSX.writeFile(workbook, 'FormData.xlsx');
});

// Initialize date on page load
document.addEventListener('DOMContentLoaded', setCurrentDate);
