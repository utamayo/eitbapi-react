import { getRadioProgram, getRadioProgramSeasons } from '../api';
import { useAsync } from '../hooks';
import { useParams } from 'react-router';
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ClipLoader from 'react-spinners/ClipLoader';
import { FormattedMessage } from 'react-intl';

import Figure from 'react-bootstrap/Figure';
const RadioProgram = () => {
  const { id, program_id } = useParams();

  const { triggerFunction, data, loading, loaded } = useAsync();
  const {
    triggerFunction: triggerFunctionSeasons,
    data: dataSeasons,
    loading: loadingSeasons,
    loaded: loadedSeasons,
  } = useAsync();

  const language = 'en';

  useEffect(() => {
    triggerFunction(getRadioProgram, id, program_id);
  }, [getRadioProgram, id, program_id]);

  useEffect(() => {
    triggerFunctionSeasons(getRadioProgramSeasons, id, program_id);
  }, [getRadioProgramSeasons, id, program_id]);

  return (
    <Container>
      {loaded ? (
        <>
          <h1>{data.title}</h1>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src={data.image}
            />
          </Figure>
          <p>{data.description}</p>
        </>
      ) : (
        <ClipLoader />
      )}

      {loadedSeasons ? (
        <>
          <h2>
            <FormattedMessage
              id="radioprogram.Seasons"
              defaultMessage="Seasons"
            />
          </h2>
          {loadedSeasons && (
            <ul>
              {dataSeasons.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      href={`/${language}/radios/${id}/${program_id}/${item.id}`}
                    >
                      {item.title} ({item.presenter})
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      ) : (
        <ClipLoader />
      )}
    </Container>
  );
};

export default RadioProgram;