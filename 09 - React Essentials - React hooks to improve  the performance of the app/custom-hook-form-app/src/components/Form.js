import React from 'react';

import useInput from './../hooks/useInput';

const FormBase = () => {
  const [nombre,bindNombre,clearNombre] = useInput("");
  const [email,bindEmail,clearEmail] = useInput("");

  const enviar = (e) => {
    e.preventDefault();
    alert(`El nombre es ${nombre} y el correo ${email}`);
    clearNombre();
    clearEmail();
  }

  return (
    <form onSubmit={enviar}>
    <div>
    <label>Nombre</label>
    <input {...bindNombre} type="text"/>
    </div>
    {/**}
    <div>
    <label>Email</label>
    <input value={email} onChange={e =>setEmail(e.target.value)} type="text"/>
    </div>
    */}
    <div>
    <label>Email</label>
    <input {...bindEmail} type="text"/>
    </div>
    <button>Enviar</button>
    </form>
  );

}

function Form() {
  return (
    <div className="Form">
    <FormBase/>
    </div>
  );
}

export default Form;
