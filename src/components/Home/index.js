import React, { useEffect, useState } from 'react';
import PicOfTheDayAPI from '../../api/PicOfTheDayAPI';
import Card from './Card';

export default function Home() {
    const [feed, setFeed] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [page, setPage] = useState(0);
    useEffect(() => {
        const TODAY = new Date();
        const DAY = TODAY.getDay();
        let month = TODAY.getMonth() - 1;
        let year = TODAY.getFullYear();
        if (month === 0) {
            year -= 1;
            month = 12;
        }
        const start_date = `${year}-${month < 10 ? '0' : ''}${month}-${DAY < 10 ? '0' : ''}${DAY}`;
        const end_date = `${TODAY.getFullYear()}-${
            TODAY.getMonth() < 10 ? '0' : ''
        }${TODAY.getMonth()}-${DAY < 10 ? '0' : ''}${DAY}`;
        PicOfTheDayAPI.get('/planetary/apod', { params: { start_date, end_date } }).then(
            ({ data }) => {
                data = data.filter(({ media_type }) => media_type === 'image');
                const feedPages = [];
                for (let i = 0; i < data.length / 5; i++) {
                    feedPages.push(data.slice(i * 5, i * 5 + 5));
                }
                setFeed(feedPages);
                setLoaded(true);
            },
        );
    }, []);

    const incrementPage = () => {
        if (page < feed.length - 1) setPage(page + 1);
    };
    const decrementPage = () => {
        if (page >= 1) setPage(page - 1);
    };

    if (loaded) {
        return (
            <div className="home-body__con">
                <RenderPageRenderer
                    top={true}
                    incrementPage={incrementPage}
                    decrementPage={decrementPage}
                    feed={feed}
                    page={page}
                />

                <div>
                    {feed[page].map((cardData, i) => (
                        <Card key={`${page}_${i}`} {...cardData} />
                    ))}
                </div>
                <RenderPageRenderer
                    incrementPage={incrementPage}
                    decrementPage={decrementPage}
                    feed={feed}
                    page={page}
                />
            </div>
        );
    }
    return <div>Loading!</div>;
}

function RenderPageRenderer({ top, incrementPage, decrementPage, page, feed }) {
    return (
        <div className={`home-page__con ${top ? 'top' : ''}`}>
            {page !== 0 && (
                <div role="button" tabindex="0" onClick={decrementPage} className="home-page__left">
                    ←
                </div>
            )}
            <div className="home-page__main">{`Page #${page + 1}`}</div>
            {page !== feed.length - 1 && (
                <div
                    role="button"
                    tabindex="0"
                    onClick={incrementPage}
                    className="home-page__right"
                >
                    →
                </div>
            )}
        </div>
    );
}
