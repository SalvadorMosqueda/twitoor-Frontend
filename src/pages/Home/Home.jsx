import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import BasicLayout from "../../layout/BasicLayout";
import ListTweets from "../../components/ListTweets";
import { getTweetsFollowersApi } from '../../api/tweet';
import { GetLikes } from '../../api/likes';

import "./Home.scss";

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  const [tweets, setTweets] = useState(null);
  const [likes, setLikes] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState(false)

  useEffect(() => {
    getTweetsFollowersApi(page).then((response) => {
      if (!tweets && response) {
        setTweets(formatModel(response));
      } else {
        if (!response) {
          setLoadingTweets(0);
        } else {
          setTweets([...tweets, ...formatModel(response)]);
          setLoadingTweets(false);
          console.log(tweets)
        }
      }
    }).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const moreData = () => {
    setLoadingTweets(true);
    setPage(page + 1);
  }


  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className='home__title'>
        <h2>Inicio</h2>
      </div>
      {tweets && <ListTweets tweets={tweets} />}
      <Button onClick={moreData} className="load-more">
        {!loadingTweets ? (
          loadingTweets !== 0 ? "Obtener mas Tweets" : "No hay mas Tweets"
        ) : (
          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
        )}
      </Button>
    </BasicLayout>
  );
}

function formatModel(tweets) {
  const tweetsTemp = [];
  tweets.forEach(tweet => {
    tweetsTemp.push({
      _id: tweet.Tweet._id,
      userId: tweet.userRelationId,
      mensaje: tweet.Tweet.mensaje,
      fecha: tweet.Tweet.fecha,
    });
  });
  console.log(tweetsTemp);
  return tweetsTemp;
}
