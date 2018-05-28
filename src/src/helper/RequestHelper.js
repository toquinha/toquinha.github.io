function performAuthenticatedRequest(url, methodStr) {
    return fetch(url, {
        method: methodStr,
        headers: new Headers( {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            })
    });
}

function submitAuthenticatedForm(url, state) {
    return fetch(url, {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        })
}

export { performAuthenticatedRequest , submitAuthenticatedForm};