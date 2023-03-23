function show_apt(){
    document.getElementById("apt").style.display="block";
    document.getElementById("badwebsite").style.display="none";
    document.getElementById("badware").style.display="none";
    document.getElementById("jvnkmail").style.display="none";
    document.getElementById("normal").style.display="none";
};
function show_badwebsite()
{
    document.getElementById("apt").style.display="none";
    document.getElementById("badwebsite").style.display="block";
    document.getElementById("badware").style.display="none";
    document.getElementById("jvnkmail").style.display="none";
    document.getElementById("normal").style.display="none";
}
function show_badware()
{
    document.getElementById("apt").style.display="none";
    document.getElementById("badwebsite").style.display="none";
    document.getElementById("badware").style.display="block";
    document.getElementById("jvnkmail").style.display="none";
    document.getElementById("normal").style.display="none";
}
function show_jvnkmail()
{
    document.getElementById("apt").style.display="none";
    document.getElementById("badwebsite").style.display="none";
    document.getElementById("badware").style.display="none";
    document.getElementById("jvnkmail").style.display="block";
    document.getElementById("normal").style.display="none";
}
function show_normal()
{
    document.getElementById("apt").style.display="none";
    document.getElementById("badwebsite").style.display="none";
    document.getElementById("badware").style.display="none";
    document.getElementById("jvnkmail").style.display="none";
    document.getElementById("normal").style.display="block";
}
