let button = document.querySelector("#btn");
let loader = document.querySelector("#loader");
let textArea = document.querySelector("#text");

////////////////////// PROTOTYPE OF STUDENT ///////////////////////////////////////////

/*function Student(name, address, phone, course) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.course = course;

    Student.prototype.getInfo = function () {
        return "\n" +
            "Name: " + this.name + "\n" +
            "Address: " + this.address + "\n" +
            "Phone: " + this.phone + "\n" +
            "Course: " + this.course + "\n"
    }
}
*/

///////////////////////////////////////////////////////////////////////////////////////////

button.addEventListener("click", function () {
    getData();
    
    async function getData() {
        try {
            loader.style.display = "inline-block";
            //let response = await fetch("https://v-dresevic.github.io/Advanced-JavaScript-Programming/data/students.txt");
            let response = await fetch("/data.json");

            if (response.status !== 200) {
                throw new Error("Error while reading file.");
            }
            let text = await response.text();
            let textinfo = text.split("\r\n");
            splitLine(textinfo);

        }
        catch (error) {
            textArea.innerHTML = "Fetch problem:" + error.message;
        }
        finally {
            loader.style.display = "none";
        }
    }

    function splitLine(info) {
        while (info.length > 0) {
            let x = info.splice(0, 4);
            let students = new Student(x[0], x[1], x[2], x[3],);
            textArea.innerHTML += students.getInfo();
        }
    }

});