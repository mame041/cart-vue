new Vue({
	el: '#app',
	data: {
		productList: [],
		totalMoney: 0,
		checkAllFlag:false,
		delFlag:true,
		curProduct:{}
	},
	filters: {
		formatMoney: value => {
			return value.toFixed(2);
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.cartView();
		});
	},
	methods: {
		cartView () {
			var _this = this;
			this.$http.get('data/cartData.json').then(res => {
				_this.productList = res.body.result.list;
			}, res => {
				console.log(res);
			});
		},
		changeQuantity (product, way) {
			way > 0 ? product.productQuantity++ : product.productQuantity--;
			product.productQuantity = (product.productQuantity <= 1 ? 1 : product.productQuantity);
			this.calPrice();
		},
		selectAll (flag) {
			this.checkAllFlag=flag;
			var _this = this;
			this.productList.forEach((value,index)=>{
					if(typeof value.checked == 'undefined'){
		//				this.$set(item,'checked',true);
		                Vue.set(value,'checked',_this.checkAllFlag);
					}else{
						value.checked = _this.checkAllFlag;
					}
				});
				this.calPrice();
		},
		selectProduct (productList,item) {
			var _this=this;
			if(typeof item.checked == 'undefined'){
                Vue.set(item,'checked',true);
			}else{
				item.checked = !item.checked;
			};
			this.calPrice();
			try{
				productList.forEach((value,index)=>{
				if(!value.checked){
					_this.checkAllFlag=false;
					foreach.break=new Error("StopIteration");
				}else{
					_this.checkAllFlag=true;
				}
			});
			}catch(e){
				
			}
		},
		calPrice () {
			this.totalMoney=0;
			var _this=this;
			this.productList.forEach((item,index)=> {
				if(item.checked){
					_this.totalMoney+=item.productPrice*item.productQuantity;
				}
			});
		},
		delItem (item) {
//			console.log(this.delFlag);
			 this.delFlag=false;
			 this.curProduct=item;
		},
		delConfirm (bool) {
			if (bool === true){
				var index = this.productList.indexOf(this.curProduct);
				this.productList.splice(index,1);
				this.delFlag=true;
			}else{
//				console.log(this.delFlag);
				this.delFlag=true;
			}
		}
	}
});
Vue.filter('money', (value,type) =>{
	return value.toFixed(2) + type;
});

