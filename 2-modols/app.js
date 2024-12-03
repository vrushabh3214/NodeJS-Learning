const cals = require("./cals")
const area = require("./area")

var data = process.argv
// console.log(data);

switch (data[4]) {
    case "1":
        console.log(cals.sum(parseInt(data[2]), parseInt(data[3])));
        break;
    case "2":
        console.log(cals.sub(data[2], data[3]));
        break;
    case "3":
        console.log(area.Triangle(data[2], data[3]));
        break;
    case "4":
        console.log(area.Rectangle(data[2], data[3]));
        break;

    default:
        console.log("Not foude");
        break;
}


