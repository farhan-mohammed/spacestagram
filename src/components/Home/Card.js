import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';

export default function Card(props) {
    return (
        <article className="card-con">
            <div className="card-image">
                <RenderCardMedia {...props} />
            </div>
            <div className="card-body">
                <RenderCardBody {...props} />
            </div>
        </article>
    );
}

function RenderCardMedia(props) {
    const { title, media_type, url, author } = props;
    if (media_type === 'image') {
        return <img src={url} alt={`${title} by ${author}`} />;
    }
    return (
        <video width="400" height="400" controls>
            <source src="movie.mp4" />
            Your browser does not support the video tag.
        </video>
    );
}

function RenderCardBody(props) {
    const { title, date, copyright, explanation } = props;
    return (
        <Fragment>
            {title && <h2 className="card-body__h2">{title}</h2>}
            {date && <p className="card-body__date">{date}</p>}
            <RenderLikeButton date={date} />
            {explanation && <p className="card-body__exp">{explanation}</p>}
            {copyright && <p className="card-body__c">&#xa9; {copyright}</p>}
        </Fragment>
    );
}

function RenderLikeButton({ date }) {
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        setLiked(Boolean(localStorage.getItem(date)));
        // eslint-disable-next-line
    }, []);

    function setCondition() {
        const cur = liked;
        localStorage.setItem(date, Boolean(!cur));
        setLiked(!cur);
    }

    return (
        <div className="card-liked__con">
            <input
                onChange={setCondition}
                type="checkbox"
                id={`${date}_like`}
                className="card-liked__checkbox"
                checked={liked}
            />
            <label onClick={setCondition} for={`${date}_like`}>
                I like this post
            </label>
        </div>
    );
}
