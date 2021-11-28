
import axios  from "axios";
const PUT_URL =  "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json" ;

// my implementation of Pooling method 
// it consumes requests sequencely

class Pooler{

  // will que every update request
    requests ;
    consuming ;

    // methods to handle ovrall promise 
    resolver ;
    rejecter ;
   
  constructor(r){
    this.requests = [] ;
    this.consuming = false ;
    this.resolver = null ;
    this.rejecter = null ;

    
    

  }

  // thoough the name of this method should be produce() 
  // renaming can be thought as next tasks
addRequest(value){

 

  // add a new request to the end of the queue

  this.requests.unshift(value) ;

 //check if system is already consuming , if not then restart the consumer to consume the request as 
 // new request has come
   if(this.consuming == false)
   this.consume()



    let tmp =  this ;
    // follwoing is the promise that will resolved when finally every requests in queue has been resolved

   let _promise =  new Promise((resolve,reject)=>{
    tmp.resolver = resolve ;
     tmp.rejector = reject ;
   })

return _promise ;
}

  consume(){
      let  tmp = this ;
     this.consuming = true 


    //base case when every requests has been processed
    if(this.requests.length ==0 ){

      this.consuming = false 
      tmp.resolver() ;

      return ;
    }
     let value = this.requests.pop() ;

     let p = axios.put(PUT_URL,{ Divyanshu_Raj :value}) ;

     p.then(()=>{
       //recurise call for next request 
        tmp.consume() ;

     }).catch(()=>{
       //recurive move on , for next 
       tmp.consume() ;
       tmp.rejector() ;
     })
    

  }
}

export default Pooler