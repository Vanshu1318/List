

        //load existence element present in local storage
         document.addEventListener('DOMContentLoaded', function() {
            loadElementsFromLocalStorage();
        });

        //load all variables..........................................................
        var product=document.getElementById("product");
        var price=document.getElementById("price");
        var desc=document.getElementById("desc");
        var btn=document.getElementById("btn");
        var list=document.getElementById("container");
        let arr=[];
        function generateUniqueId(){
            return '_' + Math.random().toString(36).substr(2, 9);
        }
        function createObject(id,a,b,c,s){
            const obj={
                id:id,
                product:a,
                price:b,
                desc:c,
                status:s
            };
            return obj;
        }


        ///loat already existing elements...........................................................
        function loadElementsFromLocalStorage() {
            // Retrieve existing products from localStorage
            let existingProducts = localStorage.getItem('products');

            // Parse the existing products (if any) or initialize an empty array
            existingProducts = existingProducts ? JSON.parse(existingProducts) : [];
            existingProducts.forEach(obj => {
                display(obj);
            });
        }


        //action submit button...............................................................................
        btn.addEventListener("click",()=>{
            const i = generateUniqueId();
            console.log(i);
            let status="pending";
            if(product.value==""&&price.value==""&&desc.value==""){
                alert("fill the fields");
            }
            else{
            const obj=createObject(i,product.value,price.value,desc.value,status);
            
            arr=localStorage.getItem("products");
            //console.log(arr);
            if(arr){
             arr=JSON.parse(arr);
             //console.log("hi");
             //console.log(arr);
            }
            else{
               arr=[];
               //console.log("ho");
               //console.log(arr);
            }
           arr.push(obj);
          // console.log(arr);
           localStorage.setItem("products",JSON.stringify(arr));
           display(obj,i);
        }
        });


        //display lists............
        function display(obj,i){
           let div=document.createElement("div");
          // div.style.marginDown='10px';
           list.append(div);
           let prodiv=document.createElement("div");
           prodiv.innerText=obj.product;
           let pricediv=document.createElement("div");
           pricediv.innerText=obj.price;
           let descdiv=document.createElement("div");
           descdiv.innerText=obj.desc;
           let del=document.createElement("button");
           del.innerText="delete";
           let updt=document.createElement("button");
           updt.innerText="update";
           let chk=document.createElement("input");
           chk.type="checkbox";
           let blankdiv=document.createElement("div");
           
           prodiv.setAttribute("class","dives");
           pricediv.setAttribute("class","dives");
           descdiv.setAttribute("class","dives");
           del.setAttribute("class","dives");
           updt.setAttribute("class","dives");
           //div.style.float=left;
          // blankdiv.style.float="bult";
          prodiv.style.display="inline-block";
          pricediv.style.display="inline-block";
          descdiv.style.display="inline-block";
          del.style.display="inline-block";
          updt.style.display="inline-block";
          //del.style.alignItems="right";
           div.append(chk,prodiv,pricediv,descdiv,del,updt,blankdiv);
           product.value="";
           price.value="";
           desc.value="";

           ////checkbox.....................................................................
           chk.addEventListener( "change", () => {
            if ( chk.checked ) {
                div.style.textDecoration = "line-through";
                console.log("hi");
                obj.status="completed";
                updateProductInLocalStorage(obj.id, obj);
            }
            else{
                div.style.textDecoration = "none";
                obj.status="pending";
                updateProductInLocalStorage(obj.id,obj);
            }
         });


          //delete btn......................................
          del.addEventListener("click",()=>{
            //remove from local Storage
            //find the current object in array
            const index=arr.findIndex(items=>items.id===i);
            arr.splice(index,1);
            localStorage.setItem("products",JSON.stringify(arr));
            //remove from div
            div.remove(index);
          })


           //update...........................................................
            updt.addEventListener("click",()=>{
              // Allow the user to modify the product details
              ///through prompt...........
            // const updatedProduct = prompt("Update product details(comma seperated):", `${obj.product},${obj.price},${obj.desc}`);

             // Check if the user clicked "Cancel" or provided valid input
            //   if (updatedProduct !== null) {
            //      // Split the updatedProduct string into an array of values
            //      const [updatedProductName, updatedProductPrice, updatedProductDesc] = updatedProduct.split(',');

            //       // Update the product details in the object
            //      obj.product = updatedProductName;
            //      obj.price = updatedProductPrice;
            //      obj.desc = updatedProductDesc;
            //////for url query string


            //      // Update the displayed information
            //      prodiv.innerText = updatedProductName;
            //      pricediv.innerText = updatedProductPrice;
            //      descdiv.innerText = updatedProductDesc;

            //       // Update the product details in localStorage
            //      updateProductInLocalStorage(obj.id, obj);

            //      alert("Product details updated!");
            //     }
            let updateddiv=document.createElement("div");
            div.append(updateddiv);
                let updatedproduct=document.createElement("input");
                updatedproduct.setAttribute("type","text");
                updatedproduct.setAttribute("placeholder","Product");
                let updatedprice=document.createElement("input");
                updatedprice.setAttribute("type","text");
                updatedprice.setAttribute("placeholder","Price");
                let updateddesc=document.createElement("input");
                updateddesc.setAttribute("type","text");
                updateddesc.setAttribute("placeholder","Description");
                let btn=document.createElement("button");
                btn.innerText="click me";
                updateddiv.append(updatedproduct,updatedprice,updateddesc,btn);
                ///update the product details in the object
                btn.addEventListener("click",()=>{
                    
                    if(updatedproduct.value!==""&&updatedprice.value!==""&&updateddesc.value!==""){
                    
                    obj.product=updatedproduct.value;
                    obj.price=updatedprice.value;
                    obj.desc=updateddesc.value;
    
                    ////updated the displayed information
                    prodiv.innerText=updatedproduct.value;
                    pricediv.innerText=updatedprice.value;
                    descdiv.innerText=updateddesc.value;
                    /// update the product details in local storage
                    updateProductInLocalStorage(obj.id,obj);
                    alert("product details updated!");
                    
                    }
                    else{
                        alert("No Updation Occurs");
                    }
                    updateddiv.remove(updatedproduct,updatedprice,updateddesc,btn);

                    
                })
               


            
            });
            function updateProductInLocalStorage(productId, updatedProduct) {
              // Retrieve existing products from localStorage
              let existingProducts = localStorage.getItem('products');
             
             // Parse the existing products (if any) or initialize an empty array
             existingProducts = existingProducts ? JSON.parse(existingProducts) : [];

             // Find the index of the product with the specified ID
             const index = existingProducts.findIndex(product => product.id === productId);

             // Update the product details in the array
                if (index !== -1) {
                 existingProducts[index] = updatedProduct;
                }

             // Save the updated array back to localStorage
              localStorage.setItem('products', JSON.stringify(existingProducts));
            }
        }
    