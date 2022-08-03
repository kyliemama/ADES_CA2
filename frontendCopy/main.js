window.addEventListener("DOMContentLoaded", function () {
    document.getElementById('create-message').onsubmit = function (event) {
        event.preventDefault()
        var username = document.getElementById('username').value
        var message = document.getElementById('message').value
        fetch("http://localhost:3000/api/" + username + "/message", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                message: message
            })
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data)
            alert("success")
        })
    },

        document.getElementById('get-message').onsubmit = function (event) {
            event.preventDefault()
            var username = document.getElementById('username2').value
            fetch("http://localhost:3000/api/" + username + "/message", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                return response.json()
            }).then(function (data) {
                console.log(data)
                document.getElementById("display-array").textContent = JSON.stringify(data)
                alert("success")
            })
        },

        document.getElementById('delete-message').onsubmit = function (event) {
            event.preventDefault()
            var username = document.getElementById('username3').value
            var id = document.getElementById('messageid').value
            fetch("http://localhost:3000/api/" + username + "/message/" + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                return response.json()
            }).then(function (data) {
                console.log(data)
                alert("success")
            })
        },

        document.getElementById('update-message').onsubmit = function (event) {
            event.preventDefault()
            var username = document.getElementById('username4').value
            var id = document.getElementById('messageid2').value
            var message = document.getElementById('message2').value
            fetch("http://localhost:3000/api/" + username + "/message/" + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    message: message
                })
            }).then(function (response) {
                return response.json()
            }).then(function (data) {
                console.log(data)
                alert("success")
            })
        }
})