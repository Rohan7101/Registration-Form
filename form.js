document.getElementById("stu_form").addEventListener("submit", function(event) {

    event.preventDefault();

    const student = {
        name: document.getElementById("i1").value.trim(),
        roll: document.getElementById("i2").value.trim(),
        email: document.getElementById("i3").value.trim(),
        course: document.getElementById("i4").value.trim(),
        phno: document.getElementById("i5").value.trim(),
        phy: Number(document.getElementById("m1").value),
        chem: Number(document.getElementById("m2").value),
        math: Number(document.getElementById("m3").value)
    };

    if (
        student.name === "" || student.roll === "" ||
        student.email === "" || student.course === "" ||
        student.phno === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    if (
        student.phy < 0 || student.phy > 100 ||
        student.chem < 0 || student.chem > 100 ||
        student.math < 0 || student.math > 100
    ) {
        alert("Marks must be between 0 and 100.");
        return;
    }

    student.total = student.phy + student.chem + student.math;
    student.per = (student.total / 300) * 100;

    student.result =
        student.phy >= 35 && student.chem >= 35 && student.math >= 35
            ? "PASS"
            : "FAIL";

    let students = JSON.parse(localStorage.getItem("students")) || [];

    if (students.some(item => String(item.roll) === student.roll)) {
        alert("Roll number already exists.");
        return;
    }

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("output").textContent =
        "Name: " + student.name +
        "\nRoll No: " + student.roll +
        "\nCourse: " + student.course +
        "\nEmail: " + student.email +
        "\nPhone: " + student.phno +
        "\nPhysics: " + student.phy +
        "\nChemistry: " + student.chem +
        "\nMathematics: " + student.math +
        "\nTotal: " + student.total + "/300" +
        "\nPercentage: " + student.per.toFixed(2) + "%" +
        "\nResult: " + student.result;

    alert("Student data saved successfully!");

    document.getElementById("stu_form").reset();
});


document.getElementById("viewAllBtn").addEventListener("click", function() {

    const students = JSON.parse(localStorage.getItem("students")) || [];
    const output = document.getElementById("allResults");

    output.textContent = "";

    if (students.length === 0) {
        output.textContent = "No student records found.";
        return;
    }
    
    students.forEach(student => {

        const record = document.createElement("pre");

        record.textContent =
            "Name: " + student.name +
            "\nRoll No: " + student.roll +
            "\nEmail: " + student.email +
            "\nCourse: " + student.course +
            "\nPhone: " + student.phno +
            "\nPhysics: " + student.phy +
            "\nChemistry: " + student.chem +
            "\nMathematics: " + student.math +
            "\nTotal: " + student.total + "/300" +
            "\nPercentage: " + Number(student.per).toFixed(2) + "%" +
            "\nResult: " + student.result;

        output.appendChild(record);
    });

});