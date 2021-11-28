
const PUT_URL =  "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json" ;


class Pooler{

   //will keep promised of network requests

    requests =[]
    consuming = false 

    resolver ;
    rejecter ;
   
  constructor(r){

    //nothing yet
    alert("consturcter")

  }

addRequest(value){

 
console.log("hello ji")

  requests.unshift(value) ;
   if(consuming == false)
   consume()

   let _promise = new Promise((resolve,reject)=>{
     resolver = resolve ;
     rejector = reject ;
   })

return _promise ;
}

  consume(){
     consuming = true 
    //base case
    if(requests.length ==0 ){
      consuming = false 
      resolver() ;

      return ;
    }
     let value = requests.back() ;
     requests.pop() ;

     let p = axios.put(PUT_URL,{ Divyanshu_Raj :value}) ;

     p.then(()=>{
       //recurise call for next
        sendRequest() ;

     }).catch(()=>{
       //recurive move on for next 
       sendRequest() ;
       rejector() ;
     })
    

  }
}

export default Pooler