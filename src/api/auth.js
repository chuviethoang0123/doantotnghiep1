import axios from 'axios';
export default {

    //Lấy user
    authUser: () => {
        const url = `${process.env.webthucphamapi}api/auth/user`;
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }
        return new Promise((resolve, reject) => {
            axios.get(url, config, {
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                if (response.data.status === true) {
                    resolve(response.data.data);
                } else {
                    reject(response);
                }
            }).catch((error) => {
                console.log('Authorization !!');
                reject(error);
            })
        });
    },
}