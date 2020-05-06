
export const apiGet  = (url) => () => fetch(url).then(v=>v.json());

export const apiPut =(url,id,obj) =>()=>
fetch(`${url}/${id}`,{
    method:'PUT',
    body:JSON.stringify(obj),
    headers:new Headers({'Content-Type':'application/json'})
}).then(v=>v.json())//;  El siguiente codigo es para validar desde el server NODE
// .then(r=>{
//     if(r.error){
//         return Promise.reject(r.validation);
//     }
//     return r;
// })