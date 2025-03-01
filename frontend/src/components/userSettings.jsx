import React from 'react'
import useGlobalState from '../utils/useGlobalState'

const UserSettings = () => {
    const globalState = useGlobalState()
    const { username: _username, api_token } = globalState.user

    const [changed, setChanged] = React.useState()
    const [username, setUsername] = React.useState()
    const [firstName, setFirstName] = React.useState()
    const [lastName, setLastName] = React.useState()
    const [errors, setErrors] = React.useState({})

    React.useEffect(() => {
        (async () => {
            const res = await fetch(import.meta.env.VITE_API_URL + '/auth/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + api_token,
                }
            })
            const data = await res.json()
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setUsername(data.username)
        })()
    }, [api_token])
  
    const onSubmit = async (e) => {
      setChanged(false)
      setErrors({})

      e.preventDefault()
      const postData = {first_name: firstName, last_name: lastName}
      if (_username !== username) {
          postData.username = username
      }
      const res = await fetch(import.meta.env.VITE_API_URL+'/auth/user/', {
        method: 'PATCH',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + api_token,
        },
        body: JSON.stringify(postData)
      })
      if(res.status === 400) {
        const data = await res.json()
        setErrors(data)
      } else if (res.status === 200) {
        setChanged(true)
        globalState.setUser({username, api_token})
      }
    }
    return (
      <div>
        { <>
            {changed && (
                <div className="alert alert-success" role="alert">
                Succés! Changement enregistré
                </div>)
            }
            {errors.non_field_errors && errors.non_field_errors.map(e=>
                <div className="alert alert-danger" role="alert">
                    {e}
                </div>
            )}
            <form onSubmit={onSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="username"><i className="fas fa-user"></i> Nom d'utilisateur</label>
                <input onChange={(e)=>{setUsername(e.target.value)}} defaultValue={username} type="text" className={"form-control" + (errors.username ? ' is-invalid' : '')} id="username" name="username" placeholder="Nom d'utilisateur" required/>
                {errors.username && (<div className="invalid-feedback">
                    {errors.username}
                </div>)}
            </div>
            <div className="form-group mb-3">
                <label htmlFor="firstName"><i className="fas fa-user"></i> Prénom</label>
                <input onChange={(e)=>{setFirstName(e.target.value)}} defaultValue={firstName} type="text" className={"form-control" + (errors.first_name ? ' is-invalid' : '')} id="firstName" name="firstName" placeholder="Prénom" required/>
                {errors.first_name && (<div className="invalid-feedback">
                    {errors.first_name}
                </div>)}
            </div>
            <div className="form-group mb-3">
                <label htmlFor="lastName"><i className="fas fa-user"></i> Nom de famille</label>
                <input onChange={(e)=>{setLastName(e.target.value)}} defaultValue={lastName} type="text" className={"form-control" + (errors.last_name ? ' is-invalid' : '')} id="lastName" name="lastName" placeholder="Nom de famille" required/>
                {errors.last_name && (<div className="invalid-feedback">
                    {errors.last_name}
                </div>)}
            </div>
            <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Sauvegarder</button>
        </form></>}
      </div>

    )
  }
  
  export default UserSettings