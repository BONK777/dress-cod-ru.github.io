var d = document,
    itemBox = d.querySelectorAll('.item'), 
    cartCont = d.getElementById('cart_content'); 
function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}

function getCartData(){
  return JSON.parse(localStorage.getItem('cart'));
}

function setCartData(o){
  localStorage.setItem('cart', JSON.stringify(o));
  return false;
}
function addToCart(e){
  this.disabled = true; 
  var cartData = getCartData() || {}, 
      parentBox = this.parentNode, 
      itemId = this.getAttribute('data-id'),
      itemPrice = parentBox.querySelector('.brand').innerHTML,
      itemTitle = parentBox.querySelector('.price').innerHTML, 
      itemPrice = parentBox.querySelector('.cat').innerHTML,
      itemPrice = parentBox.querySelector('.name').innerHTML;
  if(cartData.hasOwnProperty(itemId)){ 
    cartData[itemId][2] += 1;
  } else { 
    cartData[itemId] = [itemTitle, itemPrice, 1];
  }
  if(!setCartData(cartData)){ 
    this.disabled = false; 
  }
 return false;
}

for(var i = 0; i < itemBox.length; i++){
  addEvent(itemBox[i].querySelector('.buy'), 'click', addToCart);
}

function openCart(e){
  var cartData = getCartData(), 
      totalItems = '';
  
  if(cartData !== null){
    totalItems = '<table class="shopping_list"><tr><th>цена</th><th>название товара</th><th>Кол-во</th></tr>';
    for(var items in cartData){
      totalItems += '<tr>';
      for(var i = 0; i < cartData[items].length; i++){
        totalItems += '<td>' + cartData[items][i] + '</td>';
      }
      totalItems += '</tr>';
    }
    totalItems += '</table>';
    cartCont.innerHTML = totalItems;
  } else {
    cartCont.innerHTML = 'В корзине пусто!';
  }
  return false;
}
addEvent(d.getElementById('checkout'), 'click', openCart);
addEvent(d.getElementById('clear_cart'), 'click', function(e){
  localStorage.removeItem('cart');
  cartCont.innerHTML = 'ваша корзина очишена.';
});