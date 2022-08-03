function updateProfile (name, ichat, github, id) {
    return fetch(`http://localhost:3000/sessions`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name, ichat, github, id
        }),
    })
    .then((response) => {
            return response.json();
    })
    .then((json) => {
        if (json.error) throw new Error(json.error); 
        alert('Logged in successfully!');
        const token = json.token;
        localStorage.setItem('token', token);
        window.location = './profile/';
    })
    .catch((error) => {
        console.error(error);
        alert(error.message);
    });
    }

document.addEventListener('DOMContentLoaded', () => {    
    const updateForm = document.getElementById('update-form');        
    const nameUpdate = updateForm.querySelector('#name-update');
    const iChatUpdate = updateForm.querySelector('#ichat-update');
    const gitHubUpdate = updateForm.querySelector('#github-update');
    const idUpdate = updateForm.querySelector('#id-update');

    updateForm.onsubmit = () => {
        const name = nameUpdate.value;
        const ichat = iChatUpdate.value;
        const github = gitHubUpdate.value;
        const id = idUpdate.value;

        setIsDisabledForm(updateForm, true);
        updateProfile(name, ichat, github, id).finally(() => setIsDisabledForm(updateForm, false)); 
        return false;
    }; 
});