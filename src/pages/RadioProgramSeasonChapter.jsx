/* eslint-disable jsx-a11y/media-has-caption */
import { getRadioProgramSeasonChapter } from '../api';
import { useAsync } from '../hooks';
import { useParams } from 'react-router';
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ClipLoader from 'react-spinners/ClipLoader';

import Figure from 'react-bootstrap/Figure';
const RadioProgram = () => {
  const { id, program_id, season_id, chapter_id } = useParams();

  const { triggerFunction, data, loading, loaded } = useAsync();

  const language = 'en';

  useEffect(() => {
    triggerFunction(
      getRadioProgramSeasonChapter,
      id,
      program_id,
      season_id,
      chapter_id,
    );
  }, [getRadioProgramSeasonChapter, id, program_id, season_id, chapter_id]);

  return (
    <Container>
      {loaded ? (
        <>
          <h1>{data.title}</h1>
          <p>{data.presenter}</p>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src={data.image}
            />
          </Figure>
          <p>{data.description}</p>
          <p>
            <audio controls src={data.audio} />
          </p>
          <p>
            <a href={data.audio} download>
              Download
            </a>
          </p>
        </>
      ) : (
        <ClipLoader />
      )}
    </Container>
  );
};

export default RadioProgram;