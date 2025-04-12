
const refs = {
    codeEditor: null,
    panel: null,
};

const state = {
    codemirror: null,
    path: "",
    set message(value) {
        const el = document.getElementById("message");
        if (el) el.textContent = value;
    },
    get message() {
        const el = document.getElementById("message");
        return el ? el.textContent : "";
    }
};

const api = {
    async saveAs(target, content) {
        const url = `./cgi-bin/hello.sh?path=${encodeURIComponent(target)}`;
        const request = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            body: content
        });
        return await request.text();
    },
    async ls() {
        const url = `./cgi-bin/ls.sh`;
        const request = await fetch(url, {
            method: 'GET'
        });
        return await request.text();
    },
    async cat(target) {
        const url = `./cgi-bin/cat.sh?path=${encodeURIComponent(target)}`;
        const request = await fetch(url, {
            method: 'GET'
        });
        return await request.text();
    }
}

async function main() {
    refs.editorContainer = document.querySelector('#editorContainer');
    refs.panel = document.querySelector("aside");
    state.codemirror = CodeMirror(refs.editorContainer, {
        lineNumbers: true,
    });
    await getListing();
}


async function handleSave() {
    const target = state.path();
    const content = instances.codemirror.getValue();
    console.log(target, content);
}
async function handleLoad(path) {
    const fileContent = await api.cat(path);
    state.message = path;
    state.codemirror.setValue(fileContent);
    state.codemirror.refresh();
}

async function getListing() {
    const response = await api.ls();


    const parsedResponse = {
        dir: [],
        files: []
    };
    let isListingFiles = false;
    for (const line of response.split("\n")) {
        if (line.startsWith("# ") || !line.trim()) {
            continue;
        }
        if (line === "---") {
            isListingFiles = true;
            continue;
        }
        const label = line.replace("../files/", "")
        if (isListingFiles) {
            parsedResponse.files.push(label);
        } else {
            parsedResponse.dir.push(label);
        }
    }

    asideHtmlContent = parsedResponse.files.map(filePath => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "FileButton";
        button.innerHTML = filePath;
        button.onclick = () => handleLoad(filePath);
        return button;
    });
    refs.panel.innerHTML = "";
    refs.panel.append(...asideHtmlContent);
    return parsedResponse;
}

document.addEventListener("DOMContentLoaded", main);

document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
    }
});