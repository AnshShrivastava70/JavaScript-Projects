// Time
const time = () => {
    let a = new Date();
    let h = a.getHours() % 12 || 12;
    let m = a.getMinutes();
    let s = a.getSeconds();
    return {
        'hours': h,
        'minutes': m,
        'seconds': s
    }
}
setInterval(() => {
    let t = time();
    document.getElementById("time").innerHTML = (t.hours < 10 ? "0" + t.hours : t.hours) + " : " + (t.minutes < 10 ? "0" + t.minutes : t.minutes) + " : " + (t.seconds < 10 ? "0" + t.seconds : t.seconds)
}, 1000)

// AM/PM
let AP = () => {
    let a = new Date();
    if (a.getHours() < 12) {
        return "A.M.";
    } else if (a.getHours() < 24) {
        return "P.M.";
    }
}
setInterval(() => {
    let ap = AP();
    document.getElementById("ap").innerHTML = ap;
}, 1000)

// DAY
const Day = () => {
    let a = new Date;
    let day = [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`];
    return day[a.getDay() - 1];
}
let day = Day();
document.getElementById("day").innerHTML = day;


// Month
const Month = () => {
    let a = new Date;
    let month = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
    return month[a.getMonth()];
}
let month = Month();
document.getElementById("month").innerHTML = month;

// Date
const date = () => {
    let a = new Date;
    let date = a.getDate();
    return date;
}
let d = date();
document.getElementById("date").innerHTML = d;


//Year
const Year = () => {
    let a = new Date;
    let year = a.getFullYear();
    return year;
}

let y = Year();
document.getElementById("mainout").innerHTML = y;



// Theme

let btn = document.createElement("button");
btn.innerHTML = "Theme";
btn.setAttribute("id", "theme");
btn.setAttribute("class", "btn-purple");
document.getElementById("head").appendChild(btn);

btn.onclick = () => {
    console.log("bg-cyan " + document.querySelector("#body").classList.toggle("theme-1"));
    console.log("border-cyan " + document.querySelector("#main").classList.toggle("border-cyan"));
    console.log("bg-purple " + document.querySelector("#body").classList.toggle("theme-2"));
    console.log("border-purple " + document.querySelector("#main").classList.toggle("border-puple"));
    console.log("cyan-btn" + document.querySelector("#theme").classList.toggle("btn-cyan"));
    console.log("purple-btn" + document.querySelector("#theme").classList.toggle("btn-purple"));
}
