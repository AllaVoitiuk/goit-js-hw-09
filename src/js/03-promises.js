import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '250px',  
  useIcon: false,  
});

const refs = {
  submitBtn: document.querySelector('button'),  
  delay: document.getElementsByName('delay'),  
  step: document.getElementsByName('step'),
  amount: document.getElementsByName('amount') 
};

refs.submitBtn.addEventListener('click', onSubmit);

function onSubmit(event){

  event.preventDefault();  
    
  let promiceDelay = Number(refs.delay[0].value);  

  for(let i = 1; i <= Number(refs.amount[0].value); i++)
  {
    createPromise(i, promiceDelay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    
    promiceDelay += Number(refs.step[0].value);     
  }
}

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;
        
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});      
      } 
      else {
        reject({position, delay});      
      }
    }, delay);
  });
}
