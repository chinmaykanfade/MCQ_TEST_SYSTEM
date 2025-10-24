let questions = [
    {q:"OOP stands for?", a:"Only Object Program", b:"Object Oriented Programming", c:"Open Office Program", d:"None", correct:"B"},
    {q:"Which is not OOP?", a:"Java", b:"Python", c:"C", d:"C++", correct:"C"},
    {q:"Class is a?", a:"Blueprint", b:"Variable", c:"Library", d:"None", correct:"A"},
    {q:"Object is?", a:"Instance of class", b:"Variable", c:"Memory", d:"None", correct:"A"},
    {q:"Which supports OOP?", a:"HTML", b:"Python", c:"SQL", d:"CSS", correct:"B"},
];

let index = 0;
let score = 0;

function saveUser(){
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    localStorage.setItem("name", name);
    localStorage.setItem("roll", roll);
    window.location.href = "subject.html";
}

function startTest(subject){
    localStorage.setItem("subject", subject);
    window.location.href = "test.html";
}

window.onload = function(){
    if(document.getElementById("subjectTitle")){
        document.getElementById("subjectTitle").innerText = localStorage.getItem("subject")+" Test";
        loadQuestion();
    }
    if(document.getElementById("userDetails")){
        showResult();
    }
};

function loadQuestion(){
    // reset any previously checked radio
    document.querySelectorAll('.opt-input').forEach(inp => inp.checked = false);

    let q = questions[index];
    document.getElementById("qText").innerText = q.q;
    document.getElementById("aText").innerText = q.a;
    document.getElementById("bText").innerText = q.b;
    document.getElementById("cText").innerText = q.c;
    document.getElementById("dText").innerText = q.d;

    // ensure radio visual states are updated (some browsers repaint delay)
    // small timeout not necessary but harmless
    setTimeout(()=>{}, 10);
}

function nextQuestion(){
    let options = document.querySelectorAll(".opt-input");
    let ans = "";
    options.forEach(o => { if(o.checked) ans = o.value; });

    if(ans === questions[index].correct) score++;

    index++;
    if(index < questions.length) loadQuestion();
    else{
        localStorage.setItem("score", score);
        window.location.href = "result.html";
    }
}



function showResult(){
    let name = localStorage.getItem("name");
    let roll = localStorage.getItem("roll");
    let score = localStorage.getItem("score");
    
    document.getElementById("userDetails").innerText = `${name} | Roll: ${roll}`;
    document.getElementById("scoreText").innerText = `Score: ${score} / 5`;
    document.getElementById("status").innerText = score >= 3 ? "PASS ✅" : "FAIL ❌";
}

function goHome(){
    window.location.href = "index.html";
}
