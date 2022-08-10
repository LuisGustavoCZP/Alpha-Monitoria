function home () 
{
    const todayStaff = document.getElementById("today-staff");
    const now = new Date();

    if(monitores.length > 0)
    {
        const tstaff = monitores[now.getDay()];
        console.log("Hoje", tstaff);
        if(tstaff && tstaff.name)
        {
            todayStaff.innerText = tstaff.name;
            todayStaff.href = tstaff.link;
        }
        else 
        {
            todayStaff.innerText = "ninguem";
            todayStaff.href = undefined;
        }
    }

    const newsContainer = document.getElementById("news-container");
    fetch(`${window.api}?sheet=Novidades`)
    .then(resp => resp.json())
    .then(resp => 
    {
        console.log("Novidades atualizada", resp);
        newsContainer.innerHTML = "";
        resp.forEach(element => 
        {
            const li = document.createElement("li");
            const he = document.createElement("h4");
            he.innerText = element.title;
            const p = document.createElement("p");
            p.innerText = element.info;
            li.append(he);
            li.append(p);
            newsContainer.append(li);
        });
    })
    .catch(err => console.log(err));
}

export default home;