function revisao ()
{
    function createOption (title, value, selected=false)
    {
        const op = document.createElement("option");
        op.innerText = title;
        op.value = value;
        if(selected) op.selected = true;
        return op;
    }

    const trilhaSelector = document.getElementById("trail");
    for(const ok in window.trilhas) 
    {
        const trilha = window.trilhas[ok];

        trilhaSelector.append(createOption(trilha.title, trilha.name));
    };
}

export default revisao;