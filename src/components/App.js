import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';

export default function App() {
    return (
        <div className="container">
            <header>
                <h1>Spacestagram</h1>
                <p>Powered by NASA's Picture of the Day API</p>
            </header>
            <main>
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </main>
            <footer>
                Built by <a href="https://github.com/farhan-mohammed">farhan-mohammed</a> for
                Shopify
            </footer>
        </div>
    );
}
