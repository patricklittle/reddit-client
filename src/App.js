import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Single from './components/Single'

const style = {
  Container: {
    maxWidth: '800px',
    margin: 'auto'
  }
}

export default function RedditClient() {
  return (
    <Router>
      <div style={style.Container}>
        <Link to="/">
          <h1>reddit...kinda</h1>
        </Link>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/">
            <Route path="/:id" children={<Single />} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
