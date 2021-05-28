//take DOM
const userName = document.getElementById('username')
const password = document.getElementById('password');
const form = document.getElementById('form');
//set up url 
const url = 'https://vue3-course-api.hexschool.io/admin/signin';

function login(event){
    event.preventDefault();
    if(userName.value==''||password.value==''){
        alert(請輸入帳號密碼);
    }else{
        const userInfo = {
            username: userName.value,
            password: password.value,
        };

        axios.post(url,userInfo)
            .then((res)=>{
                if(res.data.success){
                    const { token, expired } = res.data;
                    // 寫入 cookie token 
                    // expires 設置有效時間
                    document.cookie = `jackyToken=${token};expires=${new Date(expired)}; path=/`;
                    window.location = 'products.html';
                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }
}

//監聽事件
form.addEventListener('click',login);