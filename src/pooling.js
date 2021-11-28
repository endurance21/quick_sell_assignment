
import axios  from "axios";
const PUT_URL =  "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json" ;

// my implementation of Pooling method 
// it consumes requests sequencely

class Pooler{

   //will keep promised of network requests

    requests ;
    consuming ;

    resolver ;
    rejecter ;
   
  constructor(r){
 this.requests = [] ;
 this.consuming = false ;
 this.resolver = null ;
 this.rejecter = null ;

    //nothing yet
    

  }

addRequest(value){

 


  this.requests.unshift(value) ;
  console.log(this.requests)
   if(this.consuming == false)
   this.consume()
let tmp =  this ;
   let _promise =  new Promise((resolve,reject)=>{
    tmp.resolver = resolve ;
     tmp.rejector = reject ;
   })

return _promise ;
}

  consume(){
    let  tmp = this ;
     this.consuming = true 
    //base case
    if(this.requests.length ==0 ){
      this.consuming = false 
      tmp.resolver() ;
       console.log("resolced")
      return ;
    }
     let value = this.requests.pop() ;

     let p = axios.put(PUT_URL,{ Divyanshu_Raj :value}) ;

     p.then(()=>{
       //recurise call for next
        tmp.consume() ;

     }).catch(()=>{
       //recurive move on for next 
       tmp.consume() ;
       tmp.rejector() ;
     })
    

  }
}

export default Pooler