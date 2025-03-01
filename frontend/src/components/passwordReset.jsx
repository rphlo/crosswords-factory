import React from 'react'
import useGlobalState from '../utils/useGlobalState'

const PasswordReset = () => {
    const globalState = useGlobalState()
    const { username } = globalState.user
    const [email, setEmail] = React.useState()
    const [sent, setSent] = React.useState()
    const [errors, setErrors] = React.useState({})
  
    React.useEffect(()=>{
        if (username) {
          window.location = '/'
        }
    }, [username])
  
    const onSubmit = async (e) => {
      e.preventDefault()
      const res = await fetch(import.meta.env.VITE_API_URL+'/auth/password/reset/', {
        method: 'POST',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
      })
      if(res.status === 400) {
        const data = await res.json()
        setErrors(data)
      } else if (res.status === 200) {
        setSent(true)
      }
    }
    return (
      <div className="container main-container">
        { !sent && <><h1><i className="fas fa-question"></i> Mot de passe oublié</h1><hr/><form onSubmit={onSubmit}>
            {errors.non_field_errors && errors.non_field_errors.map(e=>
                <div className="alert alert-danger" role="alert">
                    {e}
                </div>
            )}
            <div className="form-group mb-3">
                <label htmlFor="email"><i className="fas fa-at"></i> Adresse éléctronique</label>
                <input onChange={(e)=>{setEmail(e.target.value)}} type="email" className={"form-control" + (errors.email ? ' is-invalid' : '')} id="email" name="email" placeholder="Adresse éléctronique"/>
                {errors.email && (<div className="invalid-feedback">
                    {errors.email}
                </div>)}
            </div>
            <button type="submit" className="btn btn-primary"><i className="fas fa-paper-plane"></i> Envoyer</button>
        </form></>}
        {sent && (
            <div className="alert alert-success" role="alert">
            Succés! Dans le cas où l'on aurait trouvé votre adresse email dans notre base de données un message électronique vous est envoyé!
            </div>)
        }
      </div>
    )
  }
  
  export default PasswordReset