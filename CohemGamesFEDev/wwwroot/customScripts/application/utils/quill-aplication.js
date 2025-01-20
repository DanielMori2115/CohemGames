let users = [];
const urlListUsers = document.getElementById("data").getAttribute("data-listUsersComments");
async function loadUsers() {
    let items = [];
    try {
        const res = await fetch(urlListUsers, {
            method: "post",
            headers: headers,
            body: JSON.stringify()
        });
        const response = await res.json();

        if (response && response.StatusCode === 200 && response.Body) {
            let dataUser = document.getElementById("data").getAttribute("data-user");
            dataUser = JSON.parse(dataUser);
            items = response.Body;

            items = items.filter(x => x.Id != dataUser.Id);

            return items.map(person => ({ id: person.Id, value: (person.Names + " " + person.Lastnames)}));
        } else {
            return items;
        }
    } catch (err) {
        return items;
    }
}

const ElementNewID = setInterval(IsRenderNewComent, 500);
const ElementEditorID = setInterval(IsRenderEditComent, 500);

let quillNewComent = null;
let quillEditComent = null;

async function IsRenderNewComent() {
    if (document.getElementById("newComent")) {
        clearInterval(ElementNewID);
        users = await loadUsers();
        await CreateQuillNew();
    }
}
async function IsRenderEditComent() {
    if (document.getElementById("editComent")) {
        clearInterval(ElementEditorID);
        await CreateQuillEdit();
    }
}
async function CreateQuillNew() {
    quillNewComent = new Quill("#newComent", {
        placeholder: "Empieza tipeando como minimo 1 caracteres y @ para mencionar",
        modules: {
            mention: {
                allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                mentionDenotationChars: ["@"],
                positioningStrategy: "fixed",
                minChars: 1,
                source: function (searchTerm, renderList, mentionChar) {
                    let values;

                    if (mentionChar === "@") {
                        values = users;
                    }

                    if (searchTerm.length === 0) {
                        renderList(values, searchTerm);
                    } else {
                        const matches = [];
                        for (i = 0; i < values.length; i++)
                            if (
                                ~values[i].value
                                    .toLowerCase()
                                    .indexOf(searchTerm.toLowerCase())
                            )
                                matches.push(values[i]);
                        renderList(matches, searchTerm);
                    }
                }
            }
        }
    });
}
async function CreateQuillEdit() {
    quillEditComent = new Quill("#editComent", {
        placeholder: "Empieza tipeando como minimo 1 caracteres y @ para mencionar",
        modules: {
            mention: {
                allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                mentionDenotationChars: ["@"],
                positioningStrategy: "fixed",
                minChars: 1,
                source: function (searchTerm, renderList, mentionChar) {
                    let values;

                    if (mentionChar === "@") {
                        values = users;
                    }

                    if (searchTerm.length === 0) {
                        renderList(values, searchTerm);
                    } else {
                        const matches = [];
                        for (i = 0; i < values.length; i++)
                            if (
                                ~values[i].value
                                    .toLowerCase()
                                    .indexOf(searchTerm.toLowerCase())
                            )
                                matches.push(values[i]);
                        renderList(matches, searchTerm);
                    }
                }
            }
        }
    });
}