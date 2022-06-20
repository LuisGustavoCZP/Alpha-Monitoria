function duvidas ()
{
    const duvidasContent = document.getElementById("duvidas");
    const sendDuvida = document.getElementById("form-duvida");
    sendDuvida.addEventListener("submitsucess", () => {loadDuvidas ();});

    function createOption (title, value, selected=false)
    {
        const op = document.createElement("option");
        op.innerText = title;
        op.value = value;
        if(selected) op.selected = true;
        return op;
    }

    const categoriaSelector = document.getElementById("categoria");
    categoriaSelector.append(createOption("Todos", "all", true));

    const trilhaSelector = document.getElementById("trilha");
    for(const ok in window.trilhas) 
    {
        const trilha = window.trilhas[ok];

        trilhaSelector.append(createOption(trilha.title, trilha.name));
        categoriaSelector.append(createOption(trilha.title, trilha.name));
    };

    async function loadDuvidas () 
    {
        window.duvidas = await fetch(`${window.backend.api}/doubts`)
        .then(resp => resp.json())
        .then(resp => 
        {
            /* resp.forEach((element, index) => {
                element.id = index;
            }); */
            resp.sort((a,b) => b.votes - a.votes);
            console.log("Duvidas atualizada", resp);
            
            return resp;
        })
        .catch(err => console.log(err));
        
        function filterDuvidas ()
        {
            duvidasContent.innerHTML = "";
            window.duvidas.forEach((duvida) => 
            {
                if(categoriaSelector.value == "all" || categoriaSelector.value == duvida.trail)
                {
                    const li = document.createElement("li");

                    const liHeader = document.createElement("span");
                    liHeader.classList.add("li-header");
                    const h4 = document.createElement("h4");
                    const trilha = window.trilhas[duvida.trail];
                    h4.innerText = trilha.title;
                    liHeader.append(h4);

                    const span = document.createElement("span");
                    span.classList.add("li-content");
                    const op = document.createElement("p");
                    op.innerText = duvida.content;
                    span.append(op);
                    if(!duvida['answer_url'])
                    {
                        if(duvida.votes > 0)
                        {
                            const likes = document.createElement("p");
                            likes.innerText = `+${duvida.votes}`;
                            liHeader.append(likes);
                        }

                        const like = document.createElement("button");
                        like.innerText = "👍";
                        like.onclick = () => {
                            //const formData = new FormData();
                            //formData.append("voting","true");
                            fetch(`${window.backend.api}/doubts/vote/${duvida.id}`,
                            { method: 'POST', body: {} })
                            .then(resp => resp.text())
                            .then(resp => 
                            {
                                console.log(resp);
                                loadDuvidas ();
                            });
                            
                        };
                        span.append(like);
                    } else {
                        const answered = document.createElement("p");
                        answered.innerText = "✅";
                        liHeader.append(answered);
                        
                        li.classList.add("answered");
                        li.onclick = ()=>
                        {
                            window.open(duvida.answer_url);
                        };
                    }

                    li.append(liHeader);
                    li.append(span);
                    duvidasContent.append(li);
                }
            });
        }
        
        categoriaSelector.onchange = filterDuvidas;
        filterDuvidas ();
    }

    loadDuvidas ();
}

export default duvidas;