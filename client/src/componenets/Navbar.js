import React from 'react';
import { withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index';

const Navbar = ({ history }) => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="navbar-brand" href="/insert">
                Link Preview
              </a>
            </li>
            <li className="nav-item">
              <a className="navbar-brand" href="/insert">
                Add image
              </a>
            </li>
            <li className="nav-item">
              <a className="navbar-brand" href="/preview">
                Edit
              </a>
            </li>
          </ul>
          {isAuthenticated().auth && (
            <button
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default withRouter(Navbar);
