import React from "react"

export default function (props) {
  return (
    <div className="Auth-form-container mt-5">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Logowanie</h3>
          <div className="form-group mt-3">
            <label>Adres e-mail</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Wprowadź adres e-mail"
            />
          </div>
          <div className="form-group mt-3">
            <label>Hasło</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Wprowadź hasło"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Zaloguj się
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}