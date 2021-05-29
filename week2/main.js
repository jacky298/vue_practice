
const url = 'https://vue3-course-api.hexschool.io';
const apiPath = 'jacky298';

const app ={
    data:{
        
        productList:[],
    },
    getData(){
        axios.get(`${url}/api/${apiPath}/admin/products
        `).then((res)=>{
            if(res.data.success){
                this.data.productList = res.data.products;
                this.render();
            }else{
                alert(獲取資料失敗);
            }
        }).catch(err=>console.log(err)
        )
        console.log('success');
    },
    delProducts(e){ 
        const id = e.target.dataset.id;
        axios.delete(`${url}/api/${apiPath}/admin/product/${id}`)
        .then(res=>{
                    console.log(res);
                    if(res.data.success){
                        this.getData();
                    }
                
            }).catch(err=>console.log(err))
    },
    render(){
        let str = "";
        this.data.productList.forEach(item=>{
            str += `<tr>
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
              <button type="button" class = "btn btn-sm btn-outline-danger move deleteBtn" data-id="${item.id}" data-action="remove">刪除</button>
              </td>
            </tr>`;
        });
        const productListDom = document.getElementById('productList');
        productListDom.innerHTML = str;
        const productNum = document.getElementById('productCount');
        productNum.textContent =  this.data.productList.length;
        const deleteBtn = document.querySelectorAll('.deleteBtn');
        deleteBtn.forEach(
            btn=>{btn.addEventListener('click',this.delProducts)}
        )


    },
    init(){
        //取出cookie
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)jackyToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); 
        axios.defaults.headers.common['Authorization'] = token;
        this.getData();
        
    },
}

app.init();
