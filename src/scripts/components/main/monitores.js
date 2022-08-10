function monitores () 
{
    const monitoresContainer = document.getElementById("monitores");

    window.monitores.forEach(element => 
    {
        const p = document.createElement("li");
        const card = document.createElement("a");
        card.href = element.link;
        
        const title = document.createElement("h4");
        title.innerText = element.name;
        card.append(title);

        p.append(card);
        monitoresContainer.append(p);
    });
}

export default monitores;