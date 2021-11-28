
const PUT_URL =  "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json" ;


class Pooler{

   //will keep promised of network requests

    requests =[]
    consuming = false 
   
  constructor(r){

    //nothing yet

  }

addRequest(value){

 

  requets.push(value) ;
   if(consuming == false)
   consume()


}

  consume(){
     consuming = true 
    //base case
    if(requests.length ==0 ){
      consuming = false 
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
     })
    

  }
}

export default Pooler