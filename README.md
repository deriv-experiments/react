# @deriv-experiments/react

> **WARNING:** This project is not officially supported by Deriv.com. Use it at your own risk. This is a proof of concept and currently has no tests or real world usage.

A React library for integrating with Deriv's platform.

## Introduction

@deriv-experiments/react is a library that allows developers to easily interact with the Deriv platform using React. The library provides a set of hooks that allow you to access information such as user authorization and app information, as well as a set of utility functions for interacting with the platform, such as logging in.

## Installation

To install the library, you can use npm:

```
npm install @deriv-experiments/react
```

### Environment Variable

Once you have registered your app, ensure you set the environment variable:

```bash
export DERIV_WS_URL="wss://ws.binaryws.com/websockets/v3?app_id=1089"
```

## Usage

The library provides a set of hooks that make it easy to access information from the Deriv platform:

- `useAuthorize`: Returns the authorization information for the current user.
- `useSubscribe`: Subscribes to data from the Deriv platform and returns the latest value.

Additionally, the library provides a set of utility functions for interacting with the platform:

- `Deriv.login`: Redirects to Deriv's authorization flow.

Here's an example of how you can use the library in your React application:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import Deriv, { useAuthorize, useSubscribe } from '@deriv-experiments/react'

const AppsPage = () => {
  const authorize = useAuthorize();
  const apps = useSubscribe({
    app_list: 1
  });

  return (
    <main>
      <h1>My Apps</h1>

      {authorize
        ? (
          <>
            Logged in as {' '}
            <strong>{authorize.email}</strong>
          </> 
        )
        : (
          <button onClick={Deriv.login}>Login</button>
        )
      }

      <ul>
        {apps?.app_list?.map(app => {
          return (
            <li key={app.app_id}>{app.name}</li>
          )
        })}
      </ul>
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <AppsPage />
);
```

## Conclusion

@deriv-experiments/react makes it easy to integrate your React application with the Deriv platform. With its simple API and hooks, you can access information from the platform and interact with it in just a few lines of code.
