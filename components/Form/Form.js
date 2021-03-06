import React from 'react';
import Button from '../Button/Button';
import { useState } from 'react'
import { Router, useRouter } from 'next/router';
import Link from 'next/link';

const Form = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [province, setProvince] = useState('')
  const [phone, setPhone] = useState('')
  const [lgpd, setLgpd] = useState(false)
  const [fillCheckbox, setFillCheckbox] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!lgpd) {
      setFillCheckbox(true)
    }

    let data = {
      name,
      email,
      phone,
      province
    }

    if (name && email && phone && province && lgpd) {
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        if (res.status === 200) {
          setSubmitted(true)
          setName('')
          setEmail('')
          window.location.assign('/')
        }
      })
    } else {

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group c-gray-2">
        <label>
          <i className="fas fa-user c-primary mr-3"></i>Nombre y apellidos
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          name="name"
          type="text"
          className="form-control"
          placeholder="Nombre y apellidos"
        />
      </div>
      <div className="form-group c-gray-2">
        <label>
          <i className="fas fa-envelope c-primary mr-3"></i>Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          className="form-control"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group c-gray-2">
        <label>
          <i className="fas fa-phone c-primary mr-3"></i>Telefono
        </label>
        <input
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
          type="number"
          className="form-control"
          placeholder="N?? de tel??fono"
        />
      </div>
      <div className="form-group c-gray-2">
        <label>
          <i className="fas fa-map c-primary mr-3"></i>Provincia
        </label>
        <input
          onChange={(e) => setProvince(e.target.value)}
          name="province"
          type="text"
          className="form-control"
          placeholder="Provincia"
        />
      </div>
      <div className="form-group c-gray-2">

        <input
          onChange={(e) => {
            setLgpd(e.target.checked)
            setFillCheckbox(false)
          }}
          type="checkbox"
          placeholder="Provincia"
        />
        <span className="ml-1 small" style={{ lineHeight: "0.5rem"}}>
          <Link href="/lgpd"><a className="text-primary">He le??do y acepto los t??rminos y condiciones</a></Link> de nuestra Pol??tica de privacidad
          para el tratamiento y cesi??n de sus datos personales a terceros acorde con la LOPD
          y la Agencia Espa??ola de Protecci??n de Datos. Tratamos la informaci??n que nos facilita
          con el fin de ofrecerle la propuesta a trav??s de email o de una llamada telef??nica
        </span>
        {fillCheckbox && <p className="feedback text-danger mt-2">*Debes aceptar nuestra pol??tica de privacidad </p>}
      </div>
      <div className="mt-4">
        <Button
          isSubmit
          type="primary"
          content="Enviar solicitud"
        ></Button>
      </div>
    </form>
  );
};

export default Form;