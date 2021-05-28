const app ={
    data:{
        url:'https://vue3-course-api.hexschool.io/',
        apiPath:'jacky298',
        productList:[],
    },
    getData(){
        axios.get(`${this.data.url}api/${this.data.apiPath}/products
        `).then((res)=>{
            if(res.data.success){
                this.data.productList = res.data.products;
                this.render();
            }else{
                alert(獲取資料失敗);
            }
        })
        this.render(this.data.productList);
    },
    delProducts(){

    },
    render(){
        const str = '';
        this.data.productList.forEach(item=>{
            str+=`<tr>
            <td>${item.title}</td>
            <td width="120">
                ${item.origin_price}
              </td>
              <td width="120">
                ${item.price}
              </td>
              <td width="150">
                <div class="form-check form-switch">
                    <input class="form-check-input" type= "checkbox" id="${item.id}">
                    <label class="form-check-label" for="${item.id}"

                </div>
              </td>
              <td width="120">
              <button type="button" class = "btn btn-sm btn-danger" data-id="${item.id}" data-action="delete">刪除</button>
              </td>
            </tr>`;
        });
        const productListDom = document.getElementById('productList');
        productListDom.innerHTML = str;
        const productNum = document.getElementById('productCount');
        productNum.innerHTML =  this.data.productList.length;
    },
    init(){
        //取出cookie
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)jackyToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); 
        axios.defaults.headers.common['Authorization'] = token;
        this.getData();
        
    },
}

app.init();
