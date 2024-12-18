const inputs = document.querySelectorAll('input');

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  let errors = [];

inputs.forEach((input) => {
    if (input.value.trim() === '') {
      errors.push(`Please enter ${input.placeholder}`);
    }
    
    if (input.placeholder === 'Enter Name') {
      if (input.value.length < 3 || input.value.length > 30) {
        errors.push('Name must be between 3 and 30 characters');
      }
    }
  });

if (errors.length > 0) 
    {
    alert(errors.join('\n'));
   } 
else 
{
    document.getElementById('form').submit();
}
});